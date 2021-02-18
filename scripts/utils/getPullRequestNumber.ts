export default function getPullRequestNumber() {
  const prNumberString = process.env.PR_NUMBER;
  if (!prNumberString) throw new Error('No PR number available. Aborting.');

  return Number(prNumberString);
}
