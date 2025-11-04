import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';

import type { PR } from '../types';
import getChangelogAddition from './getChangelogAddition';
import mergeUpdateIntoChangelog from './mergeUpdateIntoChangelog';

const CHANGELOG_PATH = 'CHANGELOG.md';
const exec = util.promisify(childProcess.exec);

export default async function updateChangelog(prs: PR[], tagName: string) {
  if (prs.length === 0) {
    console.log('No PRs with which to update changelog. Exiting.');
    return;
  }

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

    fs.writeFileSync(CHANGELOG_PATH, nextChangelog, 'utf8');

    const { stdout, stderr } = await exec(
      `git add . && git commit -m "changelog: ${tagName}" && git push`,
    );
    if (stdout) {
      console.log('Commit changelog output', stdout);
    }
    if (stderr) {
      console.warn('Commit changelog stderr:', stderr);
    }
  } catch (error) {
    console.log(`Could not update CHANGELOG.md from master. Aborting.`);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : JSON.stringify(error);
    console.warn(message);
    process.exit(1);
  }
}
