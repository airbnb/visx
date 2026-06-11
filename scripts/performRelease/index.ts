import chalk from 'chalk';
import childProcess from 'child_process';
import util from 'util';

import fetchCommitsSinceTag from './fetchCommitsSinceTag';
import fetchPRsForCommits from './fetchPRsForCommits';
import getGitHubClient from '../utils/getGitHubClient';
import performLernaRelease from './performLernaRelease';
import postReleaseOnPrs from './postReleaseOnPrs';
import updateChangelog from './updateChangelog';
import createGithubRelease from './createGithubRelease';

const execFile = util.promisify(childProcess.execFile);

type ReleaseTag = {
  name: string;
  commit: {
    sha: string;
  };
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function getMostRecentReachableTag(excludeAlpha = false): Promise<ReleaseTag | null> {
  const describeArgs = ['describe', '--tags', '--abbrev=0'];

  if (excludeAlpha) {
    describeArgs.push('--exclude', '*alpha*');
  }

  describeArgs.push('HEAD');

  try {
    const { stdout: tagStdout } = await execFile('git', describeArgs);
    const name = tagStdout.trim();
    const { stdout: shaStdout } = await execFile('git', ['rev-list', '-n', '1', name]);

    return {
      name,
      commit: {
        sha: shaStdout.trim(),
      },
    };
  } catch (error) {
    const tagType = excludeAlpha ? 'non-alpha reachable tag' : 'reachable tag';
    console.warn(
      `Could not resolve most recent ${tagType} with \`git ${describeArgs.join(
        ' ',
      )}\`: ${getErrorMessage(error)}`,
    );
    return null;
  }
}

/**
 * Performs a release + updates changelog as needed using the following approach
 * - fetch PRs for all commits since last non-alpha tag
 * - perform release if any PR has a release label
 * - posts on all PRs with the release info
 * - updates changelog
 */
async function performRelease() {
  const client = getGitHubClient();

  console.log('Running release script');

  // fetch most recent alpha + non-alpha tags
  // this allows posting on PRs for the alpha / non-alpha release
  // while only using PRs since the last (alpha or non-alpha) tag to dictate the next release version
  const mostRecentTag = await getMostRecentReachableTag();
  const mostRecentNonAlphaTag = await getMostRecentReachableTag(true);

  if (!mostRecentTag || !mostRecentNonAlphaTag) {
    console.log('Could not find recent tag. Exiting.');
    process.exit(1);
  }

  console.log('Most recent tag found is', mostRecentTag.name);
  console.log('Most recent non-alpha tag found is', mostRecentNonAlphaTag.name);

  // get commits since most recent alpha / non-alpha tag
  const commitsSinceLastTagRequest = await fetchCommitsSinceTag(client, mostRecentTag.commit.sha);
  const commitsSinceNonAlphaTagRequest = await fetchCommitsSinceTag(
    client,
    mostRecentNonAlphaTag.commit.sha,
  );

  const commitsSinceNonAlphaTag = commitsSinceNonAlphaTagRequest.data.commits;
  const commitsSinceLastTag = commitsSinceLastTagRequest.data.commits;

  if (commitsSinceLastTag.length === 0) {
    console.log(`No commits found since last release tag. Exiting.`);
    process.exit(0);
  }

  // find PRs since last alpha / non-alpha tags, to determine if we need to release
  // and for changelog generation
  const prsSinceLastTag = await fetchPRsForCommits(
    client,
    commitsSinceLastTag.map((commit) => commit.sha),
  );
  const prsSinceLastNonAlphaTag = await fetchPRsForCommits(
    client,
    commitsSinceNonAlphaTag.map((commit) => commit.sha),
  );

  // release is based on tags since last tag regardless of alpha / non-alpha
  // this better matches the workflow where you
  //   1) publish alpha major release (e.g., 2.0.0-alpha.0)
  //   2) publish alpha patch changes (e.g., 2.0.1-alpha.0)
  //   3) publish non-alpha patch     (e.g., 2.0.2)
  // if we base the release on PRs since the last non-alpha tag, we would get
  // get multiple major version bumps
  const isPreRelease = await performLernaRelease(prsSinceLastTag);

  const newTag = await getMostRecentReachableTag();

  // no new tag was created, bail
  if (!newTag || newTag.name === mostRecentTag.name) {
    console.log('Newest tag equals previous tag, will not update changelog or post on PRs.');
    process.exit(0);
  }

  // update changelog + create Github release only for non-alpha releases
  // include all PRs since last non-alpha release
  if (!isPreRelease) {
    await updateChangelog(prsSinceLastNonAlphaTag, newTag.name);
    await createGithubRelease(client, prsSinceLastNonAlphaTag, newTag.name);
  }

  // post release version on all PRs since last non-alpha release to inform authors
  // this will double post on alpha PRs (which is desired)
  await postReleaseOnPrs(client, prsSinceLastNonAlphaTag, newTag.name);
}

performRelease().catch((error) => {
  console.error(chalk.red(String(error.message)));
  process.exit(1);
});
