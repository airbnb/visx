/* eslint import/no-extraneous-dependencies: 'off' */
import { compareVersions } from 'compare-versions';
import chalk from 'chalk';
import childProcess from 'child_process';
import util from 'util';

const exec = util.promisify(childProcess.exec);

// based off of package.json history of packages in https://github.com/d3
// it is not 100% comprehensive but includes all packages that might make
// their way into visx
const ESM_ONLY_MAP = {
  'd3-array': '3.0.0',
  'd3-chord': '3.0.0',
  'd3-color': '3.0.0',
  'd3-contour': '3.0.0',
  'd3-delaunay': '6.0.0',
  'd3-force': '3.0.0',
  'd3-format': '3.0.0',
  'd3-geo': '3.0.0',
  'd3-geo-projection': '4.0.0',
  'd3-hierarchy': '3.0.0',
  'd3-interpolate': '3.0.0',
  'd3-path': '3.0.0',
  'd3-polygon': '3.0.0',
  'd3-quadtree': '3.0.0',
  'd3-random': '3.0.0',
  'd3-scale': '4.0.0',
  'd3-scale-chromatic': '3.0.0',
  'd3-shape': '3.0.0',
  'd3-time': '3.0.0',
  'd3-time-format': '4.0.0',
  'd3-voronoi': '3.0.0',
  internmap: '2.0.0',

  // unlikely to ever be in visx
  'd3-axis': '3.0.0',
  'd3-brush': '3.0.0',
  'd3-drag': '3.0.0',
  'd3-ease': '3.0.0',
  'd3-fetch': '3.0.0',
  'd3-zoom': '3.0.0',

  // non-esm-only, here for completeness
  'd3-geo-polygon': '',
  'd3-hexbin': '',
  'd3-sankey': '',
  'd3-tile': '',
};

/**
 * For each package in esmOnlyMap with a specified version, this identifies
 * installed versions using `yarn why`. If any installed versions are ESM-only,
 * it will eventually throw an error with the flagged versions.
 */
async function flagVendorRequirements(esmOnlyMap: { [pkg: string]: string }) {
  const flaggedPackages: { [pkg: string]: string[] } = {};

  await Promise.all(
    // .map() does nothing, but is an easy way to await all calls
    Object.entries(esmOnlyMap).map(async ([pkg, esmOnlyVersion]) => {
      if (!esmOnlyVersion) return;

      // find versions of this package in the tree
      const command = `yarn why ${pkg} --recursive`;

      const { stdout, stderr } = await exec(command);

      if (stdout) {
        // match instances of this package, pulling out vendor and version groups
        // e.g., for `d3-array` match all of these
        //   d3-chord#d3-array@1.2.4
        //   @visx/vendor#d3-array@3.2.4
        //   @visx/vendor#vendor-d3-time#d3-array@3.2.1
        const pkgVersionRegex = new RegExp(
          `(?<vendor>(@visx/vendor#.*))?${pkg}@(?<version>([0-9.]+))`,
          'g',
        );
        const esmOnlyMatches = new Set<string>();

        // find all matches/installed versions
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const match = pkgVersionRegex.exec(stdout);
          const seenVersion = match?.groups?.version;
          const isVendorDependency = match?.groups?.vendor;

          // if there's a match check if it's esm-only
          if (seenVersion) {
            // if seen is >= esmOnly, this returns 0 or 1 (not -1)
            const isEsmOnly = compareVersions(seenVersion, esmOnlyVersion) >= 0;

            if (isEsmOnly && !esmOnlyMatches.has(seenVersion)) {
              if (isVendorDependency) {
                console.info(`VENDORED ${pkg}@${seenVersion} is ESM-only (≥ ${esmOnlyVersion})`);
              } else {
                console.info(`${pkg}@${seenVersion} is ESM-only (≥ ${esmOnlyVersion})`, match);
                esmOnlyMatches.add(seenVersion);
              }
            }
          } else {
            break;
          }
        }

        if (esmOnlyMatches.size > 0) {
          flaggedPackages[pkg] = [...esmOnlyMatches].sort(compareVersions);
        }
      }
      if (stderr) {
        // pass (yarn why complains about invalid peer deps, etc)
      }
    }),
  );

  if (Object.keys(flaggedPackages).length > 0) {
    console.error(
      chalk.red(
        'The following ESM-only should be vendored',
        JSON.stringify(flaggedPackages, null, 2),
      ),
    );
    process.exitCode = 1;
  } else {
    console.log(chalk.green('No (non-vendored) ESM-only packages detected ✨'));
  }
}

flagVendorRequirements(ESM_ONLY_MAP).catch((error) => {
  console.error(chalk.red(error.message));
  process.exitCode = 1;
});
