import fs from 'fs';
import size from 'filesize';
import chalk from 'chalk';

import upsertPullRequestComment from './utils/upsertPullRequestComment';
import { PACKAGE_SIZES_FILENAME } from './computeBuildSizes';

type StatMap = {
  [pkg: string]: {
    [dir: string]: number;
  };
};

function calculateDiff(prev: number, next: number): number {
  return (next - prev) / prev;
}

function formatDiff(diff: number): string {
  const sum = diff * 100;
  const percent = sum.toFixed(1);

  // Smaller
  if (percent.startsWith('-')) {
    return `${sum < -10 ? ':small_red_triangle_down: ' : ''}${percent}%`;
  }

  // Larger
  return `${sum > 10 ? ':small_red_triangle: ' : ''}+${percent}%`;
}

async function compareBuildSizes() {
  const nextSizes: StatMap = JSON.parse(fs.readFileSync(PACKAGE_SIZES_FILENAME, 'utf8'));
  let prevSizes: StatMap = {};
  let sameBuild = false;

  try {
    const masterFileSizesRequest = await fetch(
      `https://raw.githubusercontent.com/airbnb/visx/master/${PACKAGE_SIZES_FILENAME}`,
    );

    prevSizes = await masterFileSizesRequest.json();
  } catch (error) {
    console.log(`Could not fetch file ${PACKAGE_SIZES_FILENAME} from master. Aborting.`);
    console.log((error as any).message);

    prevSizes = nextSizes;
    sameBuild = true;
  }

  function getPrevSize(name: string, type: string) {
    return prevSizes[name]?.[type] || 0;
  }

  const output: string[] = [
    '### Size Changes',
    '| Package | Diff | ESM | Prev ESM | CJS | Prev CJS |',
    '| --- | ---: | ---: | ---: | ---: | ---: |',
  ];
  const rows: string[] = [];

  Object.entries(nextSizes).forEach(([pkgName, stats]) => {
    const prevEsm = getPrevSize(pkgName, 'esm');
    const prevLib = getPrevSize(pkgName, 'lib');
    const diff = calculateDiff(prevEsm, stats.esm);

    if (!isFinite(diff) || diff === 0 || diff === 0.0) {
      return;
    }

    const row = [
      pkgName,
      formatDiff(diff),
      size(stats.esm),
      prevEsm === 0 ? 'N/A' : size(prevEsm),
      size(stats.lib),
      prevLib === 0 ? 'N/A' : size(prevLib),
    ];

    rows.push(`| ${row.join(' | ')} |`);
  });

  // Don't post anything if no changes
  if (rows.length === 0) {
    return;
  }

  // Sort rows before joining to output
  rows.sort();

  output.push(...rows);
  output.push('> Compared to master. File sizes are unminified and ungzipped.');

  // Show dumps for easier debugging
  if (!sameBuild) {
    output.push(`<details>
<summary>View raw build stats</summary>

#### Previous (master)
\`\`\`json
${JSON.stringify(prevSizes, null, 2)}
\`\`\`

#### Current
\`\`\`json
${JSON.stringify(nextSizes, null, 2)}
\`\`\`
</details>`);
  }

  // Leave a comment on the PR
  const breakdown = output.join('\n');

  try {
    await upsertPullRequestComment('### Size Changes', breakdown);
  } catch (error) {
    console.warn(`Could not post size stats:\n${breakdown}`);
    // @TODO this should throw once it works on forks
    console.error(error);
  }
}

// invoke function since this is a script
compareBuildSizes().catch((error) => {
  console.error(chalk.red(String(error.message)));
  process.exitCode = 1;
});
