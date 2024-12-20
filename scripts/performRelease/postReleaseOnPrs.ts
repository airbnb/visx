import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';
import type { PR } from './types';

export default async function postReleaseOnPrs(client: GithubClient, prs: PR[], tagName: string) {
  console.log(`Posting release on ${prs.length} PRs`);
  const { owner, repo } = getRepoContext();
  const message = `🎉 This PR is included in version \`${tagName}\` of the packages modified 🎉`;

  await Promise.all(
    prs.map(async (pr) => {
      console.log('Posting release on PR #', pr.number);

      await client.issues.createComment({
        issue_number: pr.number,
        owner,
        repo,
        body: message,
      });
    }),
  );
}
