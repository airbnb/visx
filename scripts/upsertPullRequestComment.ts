import { Octokit } from '@octokit/rest';

function createGitHubClient(authToken?: string) {
  return new Octokit({
    auth: `token ${authToken}`,
    userAgent: 'visx',
  });
}

export default async function upsertPullRequestComment(query: string, body: string) {
  const { GITHUB_TOKEN, PR_NUMBER, GITHUB_REPOSITORY = '/', GITHUB_ACTOR = '' } = process.env;

  const client = createGitHubClient(GITHUB_TOKEN);
  const [owner, repo] = GITHUB_REPOSITORY.split('/');
  const prNumber = Number(PR_NUMBER);

  console.log(`Loading comments for repo ${GITHUB_REPOSITORY} issue #${prNumber}`);

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
      comment.user.login.includes(GITHUB_ACTOR),
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
