import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';

export default async function fetchCommitsSinceTag(client: GithubClient, tagSha: string) {
  console.log('Fetching commits since sha', tagSha);

  const { owner, repo } = getRepoContext();
  return client.request('GET /repos/{owner}/{repo}/compare/{base}...{head}', {
    owner,
    repo,
    base: tagSha,
    head: 'HEAD',
  });
}
