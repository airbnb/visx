import { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';
import { PR } from './types';

export default async function postReleaseOnPrs(client: GithubClient, prs: PR[], tagName: string) {
  console.log(`Posting release on ${prs.length} PRs`);
  const { owner, repo } = getRepoContext();
  const message = `🎉 This PR is included in version \`${tagName}\` of the packages modified 🎉`;

  for (let i = 0; i < prs.length; i += 1) {
    const pr = prs[i];

    console.log('Posting release on PR #', pr.number);

    await client.issues.createComment({
      issue_number: pr.number,
      owner,
      repo,
      body: message,
    });
  }
}
