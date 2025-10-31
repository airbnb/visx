const CHANGELOG_HEADER = '# Changelog';
const LINK_CONTENT_SEPARATOR = '------';

/**
 * Util that merges a new changelog entry into the existing changelog. It: 
 * - inserts a convenience link for the new release tag
 * - moves the oldest *recent* link into the *older releases section*
 * - incorporate the new changelog change addition

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
  // split into all links and actual changelog content
  const [currChangelogLinks, currChangelogContent] = currChangelog.split(LINK_CONTENT_SEPARATOR);
  const currChangelogLinksByLine = currChangelogLinks
    .split('\n')
    .filter((line) => line !== '\n' && line !== CHANGELOG_HEADER); // remove header + newlines

  // find start of older releases
  const detailsIndex = currChangelogLinksByLine.findIndex((line) => line.includes('<details>'));
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

  const ulIndex = currChangelogLinksByLine.findIndex((line) => line.includes('<ul>'));
  const oldestRecentLinkInsertionIndex = ulIndex + 1;
  const nextChangelogLinksByLine = [
    // new link
    `- [${tagName}](#${tagName.replace(/\./g, '')})`, // remove '.' in tag
    // previous recent links
    ...currChangelogLinksByLine.slice(0, oldestRecentLinkInsertionIndex),
    // oldest recent link now in older links
    `  <li><a href="${oldestRecentLinkUrl}">${oldestRecentLinkVersion}</a></li>`,
    // older links
    ...currChangelogLinksByLine.slice(oldestRecentLinkInsertionIndex),
  ];

  // now merge new and old content
  const nextChangelog = `${CHANGELOG_HEADER}\n${nextChangelogLinksByLine.join(
    '\n',
  )}${LINK_CONTENT_SEPARATOR}\n${changelogAddition}\n${currChangelogContent}`;

  return nextChangelog;
}
