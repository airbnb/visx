import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';

export default async function fetchTags(client: GithubClient) {
  console.log('Fetching tags.');

  const { owner, repo } = getRepoContext();
  return client.request('GET /repos/{owner}/{repo}/tags', {
    owner,
    repo,
  });
}
