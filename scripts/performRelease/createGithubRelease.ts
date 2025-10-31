import type { GithubClient } from '../utils/getGitHubClient';
import getChangelogAddition from './updateChangelog/getChangelogAddition';
import type { PR } from './types';
import getRepoContext from '../utils/getRepoContext';

/**
 * Posts a new Github release if prs is not empty.
 * Release text matches changelog entry.
 */
export default async function createGithubRelease(
  client: GithubClient,
  prs: PR[],
  tagName: string,
) {
  if (prs.length === 0) {
    console.log('No PRs for which to create Github release. Exiting.');
    return;
  }

  const { owner, repo } = getRepoContext();
  const releaseDescription = getChangelogAddition(tagName, prs);

  try {
    await client.request('POST /repos/{owner}/{repo}/releases', {
      owner,
      repo,
      tag_name: tagName,
      target_commitish: 'master',
      name: tagName,
      body: releaseDescription,
      draft: false,
      prerelease: false,
      generate_release_notes: false,
    });
  } catch (error) {
    console.log(`Could not post new Github release. Aborting.`);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : JSON.stringify(error);
    console.warn(message); // log but don't fail the job
  }
}
