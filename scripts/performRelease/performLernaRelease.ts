import util from 'util';
import childProcess from 'child_process';
import { ALPHA_RELEASE, MAJOR_RELEASE, MINOR_RELEASE, RELEASE_LABELS } from './constants';
import type { PR } from './types';

const exec = util.promisify(childProcess.exec);

export function isReleasePR(pr: PR) {
  return RELEASE_LABELS.some((releaseLabel) =>
    pr.labels.some((label) => label.name === releaseLabel),
  );
}

export default async function performLernaRelease(prsSinceLastTag: PR[]) {
  const releasePRsSinceLastTag = prsSinceLastTag.filter(isReleasePR);

  if (releasePRsSinceLastTag.length === 0) {
    console.log('No release PRs found for commits since last release. Exiting.');
    process.exit(0);
  }

  // run lerna based on the type of release
  const isPreRelease = releasePRsSinceLastTag.some((pr) =>
    // note that this logic requires that all alpha tags be removed from PRs
    // in order to trigger a non-alpha release. git keeps tag history so
    // preserving context should not be an issue
    pr.labels.some((label) => label.name === ALPHA_RELEASE),
  );
  const isMinor = releasePRsSinceLastTag.some((pr) =>
    pr.labels.some((label) => label.name === MINOR_RELEASE),
  );
  const isMajor = releasePRsSinceLastTag.some((pr) =>
    pr.labels.some((label) => label.name === MAJOR_RELEASE),
  );

  // perform release
  try {
    const version = `${isPreRelease ? 'pre' : ''}${
      isMajor ? 'major' : isMinor ? 'minor' : 'patch'
    }`;

    const distTag = isPreRelease ? 'next' : 'latest';

    console.log(`Attempting to publish a '${version}' release.`);

    const { stdout, stderr } = await exec(
      // --no-verify-access is needed because the CI token isn't valid for that endpoint
      // provenance is automatically generated when using OIDC Trusted Publishers
      `npx lerna publish ${version} --exact --yes --dist-tag ${distTag}`,
    );
    if (stdout) {
      console.log('Lerna output', stdout);
    }
    if (stderr) {
      console.warn('The following stderr was generated during publishing:', stderr);
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : JSON.stringify(error);
    console.warn('The following error occurred during publishing. Exiting.', message);
    process.exit(1);
  }

  return isPreRelease;
}
