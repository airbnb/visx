import childProcess from 'child_process';
import { ALPHA_RELEASE, MAJOR_RELEASE, MINOR_RELEASE, RELEASE_LABELS } from './constants';
import type { PR } from './types';

const RETRY_DELAYS_MS = [30_000, 90_000];

type ProcessEnv = Record<string, string | undefined>;

type PublishError = Error & {
  command?: string;
  stderr?: string;
  stdout?: string;
};

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function formatCommand(args: string[]) {
  return ['yarn', ...args].join(' ');
}

function getErrorOutput(error: unknown) {
  if (error instanceof Error) {
    const publishError = error as PublishError;
    return [publishError.message, publishError.stdout, publishError.stderr]
      .filter(Boolean)
      .join('\n');
  }

  if (typeof error === 'string') {
    return error;
  }

  try {
    return JSON.stringify(error) ?? String(error);
  } catch {
    return String(error);
  }
}

async function runCommand(args: string[], env: ProcessEnv = process.env) {
  const command = formatCommand(args);

  console.log(command);

  return new Promise<void>((resolve, reject) => {
    const child = childProcess.spawn('yarn', args, {
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
      process.stdout.write(data);
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
      process.stderr.write(data);
    });

    child.on('error', (error: PublishError) => {
      error.command = command;
      error.stdout = stdout;
      error.stderr = stderr;
      reject(error);
    });

    child.on('close', (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      const failureReason = signal ? `signal ${signal}` : `exit code ${code}`;
      const error = new Error(`Command failed with ${failureReason}: ${command}`) as PublishError;
      error.command = command;
      error.stdout = stdout;
      error.stderr = stderr;
      reject(error);
    });
  });
}

async function runWithRetries(label: string, args: string[], env?: ProcessEnv, attempt = 0) {
  try {
    console.log(`${label}, attempt ${attempt + 1}`);
    await runCommand(args, env);
  } catch (error) {
    const delayMs = RETRY_DELAYS_MS[attempt];

    if (delayMs === undefined) {
      throw error;
    }

    console.warn(`${label} failed. Retrying in ${delayMs / 1000}s.`);
    await wait(delayMs);
    await runWithRetries(label, args, env, attempt + 1);
  }
}

export function isReleasePR(pr: PR) {
  return RELEASE_LABELS.some((releaseLabel) =>
    pr.labels.some((label) => label.name === releaseLabel),
  );
}

export default async function performLernaRelease(prsSinceLastTag: PR[]) {
  const releasePRsSinceLastTag = prsSinceLastTag.filter(isReleasePR);

  if (releasePRsSinceLastTag.length === 0) {
    console.log('No release PRs found for commits since last release. Skipping release.');
    return false;
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
    const version = isPreRelease ? 'prerelease' : isMajor ? 'major' : isMinor ? 'minor' : 'patch';

    const distTag = isPreRelease ? 'next' : 'latest';

    console.log(`Attempting to publish a '${version}' release.`);

    const publishArgs = [
      'lerna',
      'publish',
      version,
      '--exact',
      '--yes',
      '--dist-tag',
      distTag,
      '--concurrency',
      '1',
      '--throttle',
      '--throttle-size',
      '1',
      '--throttle-delay',
      '5',
      ...(isPreRelease ? ['--preid', 'alpha', '--force-publish'] : []),
    ];

    const recoveryArgs = [
      'lerna',
      'publish',
      'from-package',
      '--yes',
      '--dist-tag',
      distTag,
      '--concurrency',
      '1',
      '--throttle',
      '--throttle-size',
      '1',
      '--throttle-delay',
      '5',
    ];

    try {
      await runCommand(publishArgs);
    } catch (error) {
      console.warn('Initial publish failed:', getErrorOutput(error));
      console.warn(
        'Initial publish failed. Attempting to recover unpublished packages with lerna publish from-package.',
      );

      await runWithRetries('OIDC from-package recovery', recoveryArgs);
    }
  } catch (error) {
    const message = getErrorOutput(error);
    throw new Error(`The following error occurred during publishing. Exiting.\n${message}`, {
      cause: error,
    });
  }

  return isPreRelease;
}
