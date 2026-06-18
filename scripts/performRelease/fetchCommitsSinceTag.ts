import childProcess from 'child_process';
import util from 'util';

const execFile = util.promisify(childProcess.execFile);

export default async function fetchCommitsSinceTag(tagSha: string) {
  console.log('Fetching commits since sha', tagSha);

  const { stdout } = await execFile('git', ['rev-list', '--reverse', `${tagSha}..HEAD`]);
  const commits = stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((sha) => ({ sha }));

  return { data: { commits } };
}
