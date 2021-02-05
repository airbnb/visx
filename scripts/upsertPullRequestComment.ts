import createGitHubClient from '@airbnb/nimbus/lib/helpers/createGitHubClient';

export default async function upsertPullRequestComment(query: string, body: string) {
  const { GITHUB_USER, TRAVIS_PULL_REQUEST = 'false', TRAVIS_PULL_REQUEST_SLUG = '' } = process.env;

  if (!TRAVIS_PULL_REQUEST || TRAVIS_PULL_REQUEST === 'false') {
    console.log(`No pull request detected (${TRAVIS_PULL_REQUEST}). Avoiding comment.`);

    return;
  }

  const [owner, repo] = TRAVIS_PULL_REQUEST_SLUG.split('/');
  const prNumber = Number(TRAVIS_PULL_REQUEST);
  const client = createGitHubClient();

  // Load all comments
  const { data: comments } = await client.issues.listComments({
    issue_number: prNumber,
    owner,
    repo,
  });

  // Find a previously created comment by our bot
  const previousComments = comments.filter(
    (comment: any) => comment.body.includes(query) && comment.user.login === GITHUB_USER,
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
