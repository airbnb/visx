import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';
import runGithubRequestWithRetries from './runGithubRequestWithRetries';

export default async function fetchCommitsSinceTag(client: GithubClient, tagSha: string) {
  console.log('Fetching commits since sha', tagSha);

  const { owner, repo } = getRepoContext();
  return runGithubRequestWithRetries(`Fetch commits since ${tagSha}`, () =>
    client.request('GET /repos/{owner}/{repo}/compare/{base}...{head}', {
      owner,
      repo,
      base: tagSha,
      head: 'HEAD',
    }),
  );
}
