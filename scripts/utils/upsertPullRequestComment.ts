import getGitHubClient from './getGitHubClient';
import getPullRequestNumber from './getPullRequestNumber';
import getRepoContext from './getRepoContext';

export default async function upsertPullRequestComment(query: string, body: string) {
  const client = getGitHubClient();
  const prNumber = getPullRequestNumber();
  const { owner, repo } = getRepoContext();

  console.log(`Loading comments for repo ${owner} ${repo} PR #${prNumber}`);

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
      comment.user?.type.toLowerCase() === 'bot' &&
      comment.user?.login === 'github-actions[bot]',
  );

  // Update existing comment
  if (previousComments.length > 0) {
    const { id } = previousComments[0];

    console.log(`Updating comment #${id}`);

    await client.issues.updateComment({
      comment_id: id,
      owner,
      repo,
      body,
    });

    // Insert a new comment
  } else {
    console.log('Adding a new comment');

    await client.issues.createComment({
      issue_number: prNumber,
      owner,
      repo,
      body,
    });
  }
}
