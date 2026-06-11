import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';
import runGithubRequestWithRetries, {
  pauseBetweenGitHubRequests,
} from './runGithubRequestWithRetries';
import type { PR } from './types';

export default async function postReleaseOnPrs(client: GithubClient, prs: PR[], tagName: string) {
  console.log(`Posting release on ${prs.length} PRs`);
  const { owner, repo } = getRepoContext();
  const message = `🎉 This PR is included in version \`${tagName}\` of the packages modified 🎉`;

  for (let index = 0; index < prs.length; index += 1) {
    const pr = prs[index];

    console.log('Posting release on PR #', pr.number);

    await runGithubRequestWithRetries(`Post release on PR #${pr.number}`, () =>
      client.issues.createComment({
        issue_number: pr.number,
        owner,
        repo,
        body: message,
      }),
    );

    if (index < prs.length - 1) {
      await pauseBetweenGitHubRequests();
    }
  }
}
