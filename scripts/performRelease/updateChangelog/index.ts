import fetch from 'node-fetch';
import { GithubClient } from '../../utils/getGitHubClient';
import getRepoContext from '../../utils/getRepoContext';
import { PR } from '../types';
import getChangelogAddition from './getChangelogAddition';
import mergeUpdateIntoChangelog from './mergeUpdateIntoChangelog';

const CHANGELOG_PATH = 'CHANGELOG.md';

export default async function updateChangelog(client: GithubClient, prs: PR[], tagName: string) {
  if (prs.length === 0) {
    console.log('No PRs with which to update changelog. Exiting.');
    return;
  }

  const { owner, repo } = getRepoContext();

  try {
    console.log('Fetching current changelog');

    const currChangelogRequest = await fetch(
      `https://raw.githubusercontent.com/airbnb/visx/master/${CHANGELOG_PATH}`,
    );

    const currChangelog = await currChangelogRequest.text();
    const nextChangelog = mergeUpdateIntoChangelog(
      currChangelog,
      getChangelogAddition(tagName, prs),
      tagName,
    );

    console.log('Updating changelog with new content.');

    // https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
    await client.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: CHANGELOG_PATH,
      message: `changelog: ${tagName}`,
      content: btoa(nextChangelog), // base64 encode
    });
  } catch (error) {
    console.log(`Could not update CHANGELOG.md from master. Aborting.`);
    console.warn(error.message);
    process.exit(1);
  }
}
