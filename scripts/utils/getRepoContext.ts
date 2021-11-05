export default function getRepoContext() {
  const { GITHUB_REPOSITORY = '/' } = process.env;
  const [owner, repo] = GITHUB_REPOSITORY.split('/');
  return { owner, repo };
}
