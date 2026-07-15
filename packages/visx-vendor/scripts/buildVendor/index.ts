/* eslint import/no-extraneous-dependencies: 'off' */
import chalk from 'chalk';
import childProcess from 'child_process';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import util from 'util';
import baseRimraf from 'rimraf';

import {
  parsedVendorPkgsMap,
  getESMContent,
  getCJSContent,
  BABEL_CONFIG_FILE,
  ESM_PATH,
  CJS_PATH,
  VENDOR_CJS_PATH,
  NODE_MODULES_PATH,
  getTSContent,
  TS_GLOB,
  INDEX_GLOB,
  getIndexContent,
} from './utils';

const exec = util.promisify(childProcess.exec);
const rimraf = util.promisify(baseRimraf);

/**
 * Handles building the entire package. Assumes all vendored packages are included
 * in the package.json and yarn installed in `./packages/visx-vendor/node_modules`
 * (i.e., they are not hoisted to the root, this helps guarantee specificity of
 * vendored packages).
 */
async function build() {
  // print out packages to be vendored
  console.log(
    chalk.green(
      `👀 Vendoring the following packages\n  --${Object.values(parsedVendorPkgsMap)
        .map((pkg) => pkg.packageName)
        .sort()
        .join('\n  --')}`,
    ),
  );

  // validate that we can resolve all packages in (the root) node modules
  // they are aliased so they are guaranteed to be in the root
  Object.values(parsedVendorPkgsMap).forEach((pkg) => {
    const exists = fs.existsSync(pkg.nodeModulesPath);
    if (!exists) {
      throw new Error(`Module note found: ${pkg.packageName} (looked for: ${pkg.nodeModulesPath})`);
    }
  });
  console.log(chalk.green('✅ Verified all packages are installed.'));

  // clean output directories
  const dirs = [ESM_PATH, CJS_PATH, VENDOR_CJS_PATH];
  const dirsAndFiles = [...dirs, TS_GLOB, INDEX_GLOB];

  console.log(chalk.green('🧹 Cleaning old vendor directories.'));
  await Promise.all(dirsAndFiles.map((glob) => rimraf(glob)));

  console.log(chalk.green('📁 Creating empty vendor directories.'));
  await Promise.all(dirs.map((libPath) => fsPromises.mkdir(libPath, { recursive: true })));

  // transpile vendor packages to CJS
  console.log(chalk.green('🪄  Transpiling vendor sources to CJS'));

  // transpile the src/ of non-type files
  const transpileGlob = Object.values(parsedVendorPkgsMap)
    .filter((pkg) => !pkg.isTypeFile)
    .map((pkg) => `"${pkg.nodeModulesPath}/src/**/*.js"`)
    .join(',');

  const { stdout, stderr } = await exec(
    `babel \
      --config-file "${BABEL_CONFIG_FILE}" \
      --only ${transpileGlob} \
      --out-dir "${VENDOR_CJS_PATH}" \
      "${NODE_MODULES_PATH}"`,
  );

  if (stdout) {
    console.log(chalk.greenBright(`  ${stdout}`));
  }
  if (stderr) {
    console.log(chalk.redBright(`  ${stderr}`));
  }

  // write esm + cjs files, and copy licenses
  console.log(chalk.green('🏗️ Generating esm, cjs, and type files, and copying licenses.'));
  await Promise.all(
    Object.values(parsedVendorPkgsMap).map(async (pkg) => {
      console.log(chalk.green(`  -${pkg.packageName}`));

      if (pkg.isTypeFile) {
        if (!pkg.tsFileName) {
          throw new Error(`Missing tsFileName for ${pkg.packageName}`);
        }
        await Promise.all([fsPromises.writeFile(pkg.tsFileName, getTSContent(pkg))]);
      } else {
        // paths
        const libVendorPath = pkg.vendorPath;
        const pkgJsonPath = path.join(pkg.nodeModulesPath, 'package.json');
        const srcLicensePath = path.join(pkg.nodeModulesPath, 'LICENSE');
        const vendorLicensePath = path.join(libVendorPath, 'LICENSE');

        const parsedPkgJson = await fsPromises
          .readFile(pkgJsonPath)
          .then((buf) => JSON.parse(buf.toString()));

        await Promise.all([
          // write ESM version
          fsPromises.writeFile(pkg.esmFileName, getESMContent(parsedPkgJson, pkg)),

          // write CJS version
          fsPromises.writeFile(pkg.cjsFileName, getCJSContent(parsedPkgJson, pkg)),

          // write index file
          fsPromises.writeFile(pkg.indexFileName, getIndexContent(parsedPkgJson, pkg)),

          // copy licenses
          fsPromises.copyFile(srcLicensePath, vendorLicensePath),
        ]);
      }
    }),
  );

  console.log(chalk.green('✅ Completed successfully'));
}

// run build
build().catch((error) => {
  console.error(chalk.red(error.message));
  process.exitCode = 1;
});
