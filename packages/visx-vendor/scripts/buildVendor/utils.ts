import path from 'path';

import packageJson from '../../package.json';

// types
/** Parsed representation of a vendored package */
export type VendoredPkg = {
  /** Name of the root node_modules/ package alias, e.g., vendor-d3-array. */
  npmAlias: string;
  /** Canonical name of the package, e.g., d3-array. */
  packageName: string;
  /** Whether this package is a types file. */
  isTypeFile: boolean;
  /** Fully-resolved path to transpiled vendor source in @visx/vendor. */
  vendorPath: string;
  /** Vendor path with src/index.js */
  vendorIndexPath: string;
  /** Path of the vendored CJS package. This points to the transpiled vendor path. */
  cjsPath: string;
  /** Path of the vendored ESM package. */
  esmPath: string;
  /** Path of the vendored TS package (for TS files). */
  tsPath?: string;
  /** Fully-resolved path to root node_modules/ source. */
  nodeModulesPath: string;
};

/** Minimal representation of a package.json */
type PackageJson = {
  name: string;
  repository: { url: string };
};

// constants
export const DIRNAME = __dirname; // eslint-disable-line no-undef
export const ESM_DIR = 'esm/';
export const CJS_DIR = 'lib/';
export const TS_DIR = 'types/';
export const VENDOR_CJS_DIR = 'vendor-cjs/';

export const ESM_PATH = path.resolve(DIRNAME, `../../${ESM_DIR}`);
export const CJS_PATH = path.resolve(DIRNAME, `../../${CJS_DIR}`);
export const TS_PATH = path.resolve(DIRNAME, `../../${TS_DIR}`);
export const VENDOR_CJS_PATH = path.resolve(DIRNAME, `../../${VENDOR_CJS_DIR}`);
export const BABEL_CONFIG_PATH = path.resolve(DIRNAME, './babel.config.js');
export const ROOT_NODE_MODULES_PATH = path.resolve(DIRNAME, '../../../../node_modules/');

// vendor package metadata
const parseVendorPkgs = (pkgJsonDeps: {
  [dep: string]: string;
}): { [pkg: string]: VendoredPkg } => {
  // e.g. ['vendor-d3-array@npm:d3-array', ...]
  const pkgDependencies = Object.keys(pkgJsonDeps);

  // e.g., { 'd3-array': 'vendor-d3-array' }
  const pkgToAliasMap = Object.fromEntries(
    pkgDependencies.map((pkgJsonName) => {
      /**
       * Vendored packages are added as dependencies with aliases
       * to guarantee that we reference the correct version within the monorepo.
       * This parses these dependencies into the alias source path
       * and the actual package name.
       *
       * examples (note aliases cannot include `@` or `/`):
       *   d3-array        => vendor-d3-array@npm:d3-array
       *   @types/d3-array => vendor-types-d3-array@npm:@types/d3-array
       *
       */
      const [npmAlias, packageName] = pkgJsonName.split('@npm:');
      if (!npmAlias || !packageName) {
        throw new Error(`Could not parse vendor name ${pkgJsonName}`);
      }
      return [packageName, npmAlias]; // note: reversed from pkgJson entry
    }),
  );

  const result = Object.keys(pkgToAliasMap).reduce<{ [pkg: string]: VendoredPkg }>(
    (all, packageName) => {
      const npmAlias = pkgToAliasMap[packageName];
      const isTypeFile = packageName.includes('@types/');
      const pkg: VendoredPkg = {
        packageName,
        npmAlias,
        isTypeFile,
        // if we don't remove @types/, this creates a nested directory
        tsPath: isTypeFile ? `${TS_PATH}/${packageName.replace('@types/', '')}` : undefined,
        esmPath: `${ESM_PATH}/${packageName}`,
        cjsPath: `${CJS_PATH}/${packageName}`,
        vendorPath: `${VENDOR_CJS_PATH}/${npmAlias}`,
        vendorIndexPath: `${VENDOR_CJS_PATH}/${npmAlias}/src/index.js`,
        nodeModulesPath: `${ROOT_NODE_MODULES_PATH}/${npmAlias}`,
      };

      all[packageName] = pkg;
      return all;
    },
    {},
  );

  return result;
};

export const parsedVendorPkgsMap = parseVendorPkgs(packageJson.dependencies);

/** Generates the content of the vendored ESM package. */
export function getESMContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  const licenseUrl = `${pkgJson.repository.url.replace(/\.git$/, '')}/blob/main/LICENSE`;
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (ESM)
 * See upstream license: ${licenseUrl}
 *
 * This ESM package re-exports the underlying installed dependencies of 
 * \`node_modules/${pkg.packageName}\` (aliased as \`${pkg.npmAlias}\`)
 */
export * from '${pkg.npmAlias}';`;
}

/** Generates the content of the vendored CJS package. */
export function getCJSContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  const licenseUrl = `${pkgJson.repository.url.replace(/\.git$/, '')}/blob/main/LICENSE`;
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (CommonJS)
 * See upstream license: ${licenseUrl}
 *
 * This CJS package exports transpiled vendor files in \`${VENDOR_CJS_DIR}${pkg.npmAlias}\`
 */
module.exports = require('../${VENDOR_CJS_DIR}${pkg.npmAlias}/src/index.js');`;
}

/** Generates the content of the vendored TS types. */
export function getTSContent(pkg: VendoredPkg) {
  return `/** \`@visx/vendor/${pkg.packageName}\` (TypeScript) 
 *
 * Re-exports the types from \`${pkg.packageName}\` 
 */
export * from '${pkg.npmAlias}';`;
}

// note: this is how we pass these dynamic variables into the
// babel config. it's not great but babel config files can't easily
// import from TS module files like this
process.env.VENDOR_CJS_DIR = VENDOR_CJS_DIR;
process.env.VENDOR_PKG_MAP = JSON.stringify(parsedVendorPkgsMap);
