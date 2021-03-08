import { Octokit } from '@octokit/rest';

export default function getGitHubClient() {
  if (!process.env.GITHUB_TOKEN) throw new Error('No GitHub token available. Aborting.');

  const client = new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`,
    userAgent: 'visx',
  });

  return client;
}

export type GithubClient = ReturnType<typeof getGitHubClient>;
