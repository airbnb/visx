import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from '@octokit/rest';
import getGitHubClient from './getGitHubClient';
import getPullRequestNumber from './getPullRequestNumber';

const RELEASE_LABELS = ['enhancements', 'bug', 'breaking'];

/** Helper to fetch PR labels. */
async function getPrLabels(client: Octokit, prNumber: number) {
  const { owner, repo } = github.context.repo;

  core.info(`Fetching PR labels for ${owner} ${repo} PR #${prNumber}.`);

  const { data } = await client.pulls.get({
    pull_number: prNumber,
    owner,
    repo,
  });

  if (!data || data.labels.length === 0) {
    throw new Error(`No Pull Requests found for ${prNumber} (${owner}/${repo}).`);
  }
  return data.labels.map(label => label.name);
}

const needsReleaseLabelMessage = `👋 Hi,
  This is a reminder for maintainers to assign a proper release label to this Pull Request.
  The bot will dismiss the review as soon as a valid release label has been assigned.
Thanks.`;

export default async function assertReleaseLabel() {
  const client = getGitHubClient();
  const prNumber = getPullRequestNumber();
  const { owner, repo } = github.context.repo;

  // find any reviews already left by the bot
  const reviews = await client.pulls.listReviews({
    owner,
    repo,
    pull_number: prNumber,
  });

  const previousBotReview = reviews.data.find(
    review =>
      review.user.type === 'bot' &&
      review.user.login.includes(github.context.actor) &&
      review.body?.includes(needsReleaseLabelMessage),
  );

  // check for release labels
  const prLabels = await getPrLabels(client, prNumber);
  const hasReleaseLabel = prLabels.some(prLabel =>
    // PR label matches at least one release label
    RELEASE_LABELS.some(releaseLabel => prLabel.toLowerCase().match(releaseLabel)),
  );

  if (hasReleaseLabel) {
    // remove any stale reviews that are now addressed
    if (previousBotReview) {
      await client.pulls.dismissReview({
        owner,
        repo,
        pull_number: prNumber,
        review_id: previousBotReview.id,
        message: '✅ Pull Request has a valid release label.',
      });
    }
  } else {
    if (previousBotReview?.state === 'CHANGES_REQUESTED') {
      core.info('Bot already requested release label. Skipping review.');
      return;
    }
    await client.pulls.createReview({
      owner,
      repo,
      pull_number: prNumber,
      body: needsReleaseLabelMessage,
      event: 'REQUEST_CHANGES',
    });
  }
}
