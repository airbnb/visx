import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';
import type { PR } from './types';

export default async function fetchPRsForCommits(
  client: GithubClient,
  shas: string[],
): Promise<PR[]> {
  const { owner, repo } = getRepoContext();
  const prs: PR[] = [];

  await Promise.all(
    shas.map(async (sha) => {
      console.log('Fetching PRs associated with commit', sha);

      const prsForCommit = await client.request(
        'GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls',
        {
          owner,
          repo,
          commit_sha: sha,
          // special header needed https://docs.github.com/en/rest/reference/repos#list-pull-requests-associated-with-a-commit
          mediaType: {
            previews: ['groot'],
          },
        },
      );
      if (prsForCommit.data.length === 0) {
        console.log('Ignoring commit with no PRs', sha);
        return;
      }
      if (prsForCommit.data.length > 1) {
        console.warn('Multiple PRs associated with commit, only considering the first', sha);
      }

      const prForCommit = prsForCommit.data[0] as PR;
      prs.push(prForCommit);
    }),
  );

  return prs;
}
