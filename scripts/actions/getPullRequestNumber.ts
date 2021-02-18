import github from '@actions/github';

export default function getPullRequestNumber() {
  const prNumberString = github.context.issue.number || process.env.PR_NUMBER;
  if (!prNumberString) throw new Error('No PR number available. Aborting.');

  return Number(prNumberString);
}
