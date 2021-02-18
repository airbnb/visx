import chalk from 'chalk';
import { Octokit } from '@octokit/rest';

import getGitHubClient from './utils/getGitHubClient';
import getPullRequestNumber from './utils/getPullRequestNumber';
import getRepoContext from './utils/getRepoContext';

const RELEASE_LABELS = ['enhancements', 'bug', 'breaking'];

/** Helper to fetch PR labels. */
async function getPrLabels(client: Octokit, prNumber: number): Promise<string[]> {
  const { owner, repo } = getRepoContext();

  console.log(`Fetching PR labels for ${owner} ${repo} PR #${prNumber}.`);

  const { data } = await client.pulls.get({
    pull_number: prNumber,
    owner,
    repo,
  });

  return data.labels.map(label => label.name).filter(label => label) as string[];
}

const needsReleaseLabelMessage = `👋 Hi,
  This is a reminder for maintainers to assign a proper release label to this Pull Request.
  The bot will dismiss the review as soon as a valid release label has been assigned.
Thanks.`;

async function assertPullRequestReleaseLabelsExist() {
  const client = getGitHubClient();
  const prNumber = getPullRequestNumber();
  const { owner, repo } = getRepoContext();

  // find any reviews already left by the bot
  const reviews = await client.pulls.listReviews({
    owner,
    repo,
    pull_number: prNumber,
  });

  console.log('Found reviews', JSON.stringify(reviews));

  const previousBotReview = reviews.data.find(
    review =>
      review.user?.type === 'bot' &&
      (!process.env.GITHUB_ACTOR || review.user?.login.includes(process.env.GITHUB_ACTOR)) &&
      review.body?.includes(needsReleaseLabelMessage),
  );

  // check for release labels
  const prLabels = await getPrLabels(client, prNumber);

  console.log('Found the following PR labels', prLabels.join(', '));

  const hasReleaseLabel = prLabels.some(prLabel =>
    // PR label matches at least one release label
    RELEASE_LABELS.some(releaseLabel => prLabel.toLowerCase().match(releaseLabel)),
  );

  if (hasReleaseLabel) {
    // remove any stale reviews that are now addressed
    if (previousBotReview) {
      console.log('Has valid release label, updating previous bot review.');

      await client.pulls.dismissReview({
        owner,
        repo,
        pull_number: prNumber,
        review_id: previousBotReview.id,
        message: '✅ Pull Request has a valid release label.',
      });
    } else {
      console.log('Has valid release label, no previous bot review found.');
    }
  } else {
    if (previousBotReview?.state === 'CHANGES_REQUESTED') {
      console.log('Bot already requested release label. Skipping review.');
      return;
    }

    console.log('No valid release labels found, requesting changes.');
    await client.pulls.createReview({
      owner,
      repo,
      pull_number: prNumber,
      body: needsReleaseLabelMessage,
      event: 'REQUEST_CHANGES',
    });
  }
}

assertPullRequestReleaseLabelsExist().catch(error => {
  console.error(chalk.red(error.message));
  process.exitCode = 1;
});
