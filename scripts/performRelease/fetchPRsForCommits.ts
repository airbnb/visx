import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';
import runGithubRequestWithRetries, {
  pauseBetweenGitHubRequests,
} from './runGithubRequestWithRetries';
import type { PR } from './types';

export default async function fetchPRsForCommits(
  client: GithubClient,
  shas: string[],
): Promise<PR[]> {
  const { owner, repo } = getRepoContext();
  const prs: PR[] = [];

  for (let index = 0; index < shas.length; index += 1) {
    const sha = shas[index];

    console.log('Fetching PRs associated with commit', sha);

    const prsForCommit = await runGithubRequestWithRetries(`Fetch PRs for commit ${sha}`, () =>
      client.request('GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls', {
        owner,
        repo,
        commit_sha: sha,
        // special header needed https://docs.github.com/en/rest/reference/repos#list-pull-requests-associated-with-a-commit
        mediaType: {
          previews: ['groot'],
        },
      }),
    );

    if (prsForCommit.data.length === 0) {
      console.log('Ignoring commit with no PRs', sha);
    } else {
      if (prsForCommit.data.length > 1) {
        console.warn('Multiple PRs associated with commit, only considering the first', sha);
      }

      const prForCommit = prsForCommit.data[0] as PR;
      prs.push(prForCommit);
    }

    if (index < shas.length - 1) {
      await pauseBetweenGitHubRequests();
    }
  }

  return prs;
}
