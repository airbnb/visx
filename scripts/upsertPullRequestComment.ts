import core from '@actions/core';
import github from '@actions/github';

import getGitHubClient from './actions/getGitHubClient';
import getPullRequestNumber from './actions/getPullRequestNumber';

export default async function upsertPullRequestComment(query: string, body: string) {
  const client = getGitHubClient();
  const prNumber = getPullRequestNumber();
  const { owner, repo } = github.context.repo;

  core.info(`Loading comments for repo ${owner} ${repo} PR #${prNumber}`);

  // Load all comments
  const { data: comments } = await client.issues.listComments({
    issue_number: prNumber,
    owner,
    repo,
  });

  // Find a previously created comment by our bot
  const previousComments = comments.filter(
    comment =>
      comment.body?.includes(query) &&
      comment.user?.type === 'Bot' &&
      // bots have [bot] appended to GITHUB_ACTOR
      comment.user.login.includes(github.context.actor),
  );

  // Update existing comment
  if (previousComments.length > 0) {
    const { id } = previousComments[0];

    core.info(`Updating comment #${id}`);

    await client.issues.updateComment({
      comment_id: id,
      owner,
      repo,
      body,
    });

    // Insert a new comment
  } else {
    core.info('Adding a new comment');

    await client.issues.createComment({
      issue_number: prNumber,
      owner,
      repo,
      body,
    });
  }
}
