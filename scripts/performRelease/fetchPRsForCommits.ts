import childProcess from 'child_process';
import util from 'util';

import type { GithubClient } from '../utils/getGitHubClient';
import getRepoContext from '../utils/getRepoContext';
import runGithubRequestWithRetries, {
  pauseBetweenGitHubRequests,
} from './runGithubRequestWithRetries';
import type { PR } from './types';

const execFile = util.promisify(childProcess.execFile);
// GitHub squash merges append the PR number to the commit subject. Verify the
// fetched PR's merge commit before using its labels to drive release behavior.
const PR_NUMBER_MATCHER = /\(#(\d+)\)\s*$/;

async function getCommitSubject(sha: string) {
  const { stdout } = await execFile('git', ['show', '-s', '--format=%s', sha]);

  return stdout.trim();
}

function getPullRequestNumberFromSubject(subject: string) {
  const match = subject.match(PR_NUMBER_MATCHER);

  return match ? Number(match[1]) : null;
}

export default async function fetchPRsForCommits(
  client: GithubClient,
  shas: string[],
): Promise<PR[]> {
  const { owner, repo } = getRepoContext();
  const prs: PR[] = [];
  const shasByPullRequestNumber = new Map<number, string[]>();

  for (const sha of shas) {
    // eslint-disable-next-line no-await-in-loop -- Keep local Git lookups serial for stable release logs.
    const subject = await getCommitSubject(sha);
    const pullRequestNumber = getPullRequestNumberFromSubject(subject);

    if (pullRequestNumber == null) {
      console.log('Ignoring commit with no PR number in subject', sha);
    } else {
      const shasForPullRequest = shasByPullRequestNumber.get(pullRequestNumber);

      if (shasForPullRequest) {
        shasForPullRequest.push(sha);
      } else {
        shasByPullRequestNumber.set(pullRequestNumber, [sha]);
      }
    }
  }

  const pullRequestsForCommits = Array.from(
    shasByPullRequestNumber,
    ([pullRequestNumber, shasForPullRequest]) => ({
      pullRequestNumber,
      shas: shasForPullRequest,
    }),
  );

  for (const [
    index,
    { pullRequestNumber, shas: candidateShas },
  ] of pullRequestsForCommits.entries()) {
    console.log('Fetching PR #', pullRequestNumber);

    // eslint-disable-next-line no-await-in-loop -- GitHub requests are intentionally paced.
    const prForCommit = await runGithubRequestWithRetries(`Fetch PR #${pullRequestNumber}`, () =>
      client.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
        owner,
        repo,
        pull_number: pullRequestNumber,
      }),
    );

    const pr = prForCommit.data as PR;

    if (pr.merge_commit_sha == null || !candidateShas.includes(pr.merge_commit_sha)) {
      throw new Error(
        `PR #${pullRequestNumber} merge commit ${
          pr.merge_commit_sha ?? 'null'
        } does not match candidate commits ${candidateShas.join(', ')}.`,
      );
    }

    prs.push(pr);

    if (index < pullRequestsForCommits.length - 1) {
      // eslint-disable-next-line no-await-in-loop -- GitHub requests are intentionally paced.
      await pauseBetweenGitHubRequests();
    }
  }

  return prs;
}
