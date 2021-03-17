import chalk from 'chalk';

import fetchCommitsSinceTag from './fetchCommitsSinceTag';
import fetchPRsForCommits from './fetchPRsForCommits';
import fetchTags from './fetchTags';
import getGitHubClient from '../utils/getGitHubClient';
import performLernaRelease from './performLernaRelease';
import postReleaseOnPrs from './postReleaseOnPrs';
import updateChangelog from './updateChangelog';
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

  // fetch most recent non-alpha tag
  // this allows posting on PRs for the alpha + final release
  const tagsRequest = await fetchTags(client); // sorted new => old
  const mostRecentTag = tagsRequest.data.find(tag => !tag.name.includes('alpha'));

  if (!mostRecentTag) {
    console.log('Could not find recent non-alpha tag. Exiting.');
    process.exit(1);
  }

  console.log('Most recent non-alpha tag found is', mostRecentTag.name);

  // get commits since most recent tag
  const commitsSinceTagRequest = await fetchCommitsSinceTag(client, mostRecentTag.commit.sha);
  const commitsSinceTag = commitsSinceTagRequest.data.commits;

  if (commitsSinceTag.length === 0) {
    console.log(`No commits found since last release. Exiting.`);
    process.exit(0);
  }

  // find PRs since last tag, to determine if we need to release and for changelog generation
  const prsSinceLastTag = await fetchPRsForCommits(
    client,
    commitsSinceTag.map(commit => commit.sha),
  );

  const isPreRelease = await performLernaRelease(prsSinceLastTag);

  const newTagsRequest = await fetchTags(client);
  const newTag = newTagsRequest.data[0];

  if (newTag.name === mostRecentTag.name) {
    console.log('Newest tag equals previous tag, will not update changelog or post on PRs.');
    process.exit(0);
  }

  // update changelog only for non-pre-releases
  if (!isPreRelease) {
    await updateChangelog(prsSinceLastTag, newTag.name);
  }

  // post release version on all PRs to inform authors
  await postReleaseOnPrs(client, prsSinceLastTag, newTag.name);
}

performRelease().catch(error => {
  console.error(chalk.red(error.message));
  process.exit(1);
});
