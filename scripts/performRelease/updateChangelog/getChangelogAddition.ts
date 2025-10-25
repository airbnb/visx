import type { PR } from '../types';

const MS_PER_MINUTE = 60 * 1000;

/** Returns a UTC date string in the format YYYY-MM-DD */
function getCurrentDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * MS_PER_MINUTE)
    .toISOString()
    .split('T')[0];
}

/** util to print a section of PRs. */
const printPRs = (sectionTitle: string, prs: PR[]) =>
  `\n\n${sectionTitle}\n\n${prs
    .map((pr) => `- ${pr.title} [#${pr.number}](${pr.html_url})`)
    .join('\n')}`;

/** Creates the new content for the changelog. */
export default function getChangelogAddition(tagName: string, prs: PR[]) {
  // find unique contributors and alphabetize
  const contributors = Array.from(
    new Set(prs.map((pr) => pr.user?.login ?? '').filter((user) => user)),
  ).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // categorize PRs. each PR may be in multiple categories tho it will have only one title
  const enhancements = prs.filter((pr) =>
    pr.labels.some((label) => label.name?.match(/enhancement/gi)),
  );
  const bugFixes = prs.filter((pr) => pr.labels.some((label) => label.name?.match(/bug/gi)));
  const breaking = prs.filter((pr) => pr.labels.some((label) => label.name?.match(/breaking/gi)));
  const internal = prs.filter((pr) => pr.labels.some((label) => label.name?.match(/internal/gi)));
  const docs = prs.filter((pr) => pr.labels.some((label) => label.name?.match(/docs/gi)));
  const uncategorized = prs.filter(
    ({ id }) =>
      !enhancements.find((pr) => pr.id === id) &&
      !bugFixes.find((pr) => pr.id === id) &&
      !breaking.find((pr) => pr.id === id) &&
      !internal.find((pr) => pr.id === id) &&
      !docs.find((pr) => pr.id === id),
  );

  const changelogAddition = `# ${tagName} (${getCurrentDate()})${
    enhancements.length === 0 ? '' : printPRs('#### :rocket: Enhancements', enhancements)
  }${bugFixes.length === 0 ? '' : printPRs('#### :bug: Bug Fix', bugFixes)}${
    breaking.length === 0 ? '' : printPRs('### :boom:  Breaking Changes', breaking)
  }${docs.length === 0 ? '' : printPRs('### :memo: Documentation', docs)}${
    internal.length === 0 ? '' : printPRs('### :house:  Internal', internal)
  }${uncategorized.length === 0 ? '' : printPRs('#### Uncategorized', uncategorized)}
  
#### :trophy: Contributors
${contributors
  .map((contributor) => `- [${contributor}](https://github.com/${contributor})`)
  .join('\n')}`;

  return changelogAddition;
}
