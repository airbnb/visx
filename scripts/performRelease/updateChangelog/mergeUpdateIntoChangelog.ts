/**
 * Example structure
    # Changelog
    - [v1.6.0](#v160)
    - [v1.5.0](#v150)
    - [v1.4.0](#v140)
    <details>
    <summary>Older Releases...</summary>
    <ul>
    <li><a href="#v00198">v0.0.198</a></li>
    <li><a href="#v00197">v0.0.197</a></li>
    </ul>
    </details>
    ------
    # v1.6.0
    ...

    # v1.5.0
    ...
 */
export default function mergeUpdateIntoChangelog(
  currChangelog: string,
  changelogAddition: string,
  tagName: string,
) {
  // We need to
  // - insert the new release tag
  // - move the oldest recent link into the older releases section
  // - incorporate the new changelogAddition

  // split into all links and actual changelog content
  const [currChangelogLinks, currChangelogContent] = currChangelog.split('------');
  const currChangelogLinksByLine = currChangelogLinks
    .split('\n')
    .filter(line => line !== '\n' && line !== '# Changelog')
    .map(line => line.trim()); // remove header

  // find start of older releases
  const detailsIndex = currChangelogLinksByLine.findIndex(line => line.includes('<details>'));
  const oldestRecentLinkIndex = detailsIndex - 1;
  const [oldestRecentLink] = currChangelogLinksByLine.splice(oldestRecentLinkIndex, 1);

  // extract the version + URL id from the oldest recent link `- [v1.3.0](#v130)`
  const oldestRecentLinkMatch = oldestRecentLink.match(/\[(.*)\]\((.*)\)/);
  if (oldestRecentLinkMatch == null) {
    console.log('Error merging changes into changelog. Exiting.');
    process.exit(1);
  }
  const oldestRecentLinkVersion = oldestRecentLinkMatch[1];
  const oldestRecentLinkUrl = oldestRecentLinkMatch[2];

  const ulIndex = currChangelogLinksByLine.findIndex(line => line.includes('<ul>'));
  const oldestRecentLinkInsertionIndex = ulIndex + 1;
  const nextChangelogLinksByLine = [
    // new link
    `- [${tagName}](#${tagName.replace('.', '')})`,
    // previous recent links
    ...currChangelogLinksByLine.slice(0, oldestRecentLinkInsertionIndex),
    // oldest recent link now in older links
    `<li><a href="${oldestRecentLinkUrl}">${oldestRecentLinkVersion}</a></li>`,
    // older links
    ...currChangelogLinksByLine.slice(oldestRecentLinkInsertionIndex),
  ];

  // now merge new and old content
  const nextChangelog = `# Changelog\n${nextChangelogLinksByLine.join(
    '\n',
  )}\n------\n${changelogAddition}\n${currChangelogContent}`;

  return nextChangelog;
}
