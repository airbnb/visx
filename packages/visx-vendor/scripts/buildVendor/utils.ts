import path from 'path';

import packageJson from '../../package.json';

// types
/** Parsed representation of a vendored package */
export type VendoredPkg = {
  /** Name of the package, e.g., d3-array. */
  packageName: string;
  /** Whether this package is a types file. */
  isTypeFile: boolean;
  /** Fully-resolved path to transpiled vendor source in @visx/vendor. */
  vendorPath: string;
  /** Fully-resolved vendor path with src/index.js */
  vendorIndexFileName: string;
  /** Fully-resolved path of the vendored CJS package. */
  cjsFileName: string;
  /** Fully-resolved path of the vendored ESM package. */
  esmFileName: string;
  /** Fully-resolved path of the vendored TS package (for @types packages). */
  tsFileName?: string;
  /**
   * Fully-resolved path of the vendored root file, e.g,. @visx/vendor/d3-array.js.
   * Used for infra that doesn't support package.json `exports` field.
   */
  indexFileName: string;
  /** Fully-resolved path to the @visx/vendor/node_modules/<pkg> directory. */
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
export const VENDOR_CJS_DIR = 'vendor-cjs/';
const ROOT_PATH = path.resolve(DIRNAME, '../../');
export const TS_GLOB = path.resolve(ROOT_PATH, '*.d.ts');
export const INDEX_GLOB = path.resolve(ROOT_PATH, '*.js');

export const ESM_PATH = path.resolve(DIRNAME, `../../${ESM_DIR}`);
export const CJS_PATH = path.resolve(DIRNAME, `../../${CJS_DIR}`);
export const VENDOR_CJS_PATH = path.resolve(DIRNAME, `../../${VENDOR_CJS_DIR}`);
export const BABEL_CONFIG_FILE = path.resolve(DIRNAME, './babel.config.js');
export const NODE_MODULES_PATH = path.resolve(DIRNAME, '../../node_modules/');

// vendor package metadata
const parseVendorPkgs = (pkgJsonDeps: {
  [dep: string]: string;
}): { [pkg: string]: VendoredPkg } => {
  const pkgDependencies = Object.keys(pkgJsonDeps);

  const result = pkgDependencies.reduce<{ [pkg: string]: VendoredPkg }>((all, packageName) => {
    const isTypeFile = packageName.startsWith('@types/');
    const pkg: VendoredPkg = {
      packageName,
      isTypeFile,
      tsFileName: isTypeFile
        ? `${ROOT_PATH}/${packageName.replace('@types/', '')}.d.ts`
        : undefined,
      esmFileName: `${ESM_PATH}/${packageName}.js`,
      cjsFileName: `${CJS_PATH}/${packageName}.js`,
      indexFileName: `${ROOT_PATH}/${packageName}.js`,
      vendorIndexFileName: `${VENDOR_CJS_PATH}/${packageName}/src/index.js`,
      vendorPath: `${VENDOR_CJS_PATH}/${packageName}`,
      nodeModulesPath: `${NODE_MODULES_PATH}/${packageName}`,
    };

    all[packageName] = pkg;
    return all;
  }, {});

  return result;
};

export const parsedVendorPkgsMap = parseVendorPkgs(packageJson.dependencies);

const getLicenseUrl = (pkgJson: PackageJson) =>
  `${pkgJson.repository.url.replace(/\.git$/, '')}/blob/main/LICENSE`;

/** Generates the content of the vendored ESM package. */
export function getESMContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (ESM)
 * See upstream license: ${getLicenseUrl(pkgJson)}
 *
 * This ESM package re-exports the underlying installed dependencies of 
 * \`node_modules/${pkg.packageName}\`
 */
export * from '${pkg.packageName}';`;
}

/** Generates the content of the vendored CJS package. */
export function getCJSContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (CommonJS)
 * See upstream license: ${getLicenseUrl(pkgJson)}
 *
 * This CJS package exports transpiled vendor files in \`${VENDOR_CJS_DIR}${pkg.packageName}\`
 */
module.exports = require('../${VENDOR_CJS_DIR}${pkg.packageName}/src/index.js');`;
}

/** Generates the content of the root index file which points to CJS. */
export function getIndexContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (CommonJS)
 * See upstream license: ${getLicenseUrl(pkgJson)}
 *
 * This file only exists for tooling that doesn't work yet with package.json:exports
 * by proxying through the CommonJS version.
 */
module.exports = require('./${VENDOR_CJS_DIR}${pkg.packageName}/src/index.js');`;
}

/** Generates the content of the vendored TS types. */
export function getTSContent(pkg: VendoredPkg) {
  return `/** \`@visx/vendor/${pkg.packageName.replace('@types/', '')}\` (TypeScript) 
 *
 * Re-exports the types from \`${pkg.packageName}\` 
 */
export * from '${pkg.packageName.replace('@types/', '')}';`;
}

// note: this is how we pass these dynamic variables into the
// babel config. it's not great but babel config files can't easily
// import from TS module files like this
process.env.VENDOR_CJS_PATH = VENDOR_CJS_PATH;
process.env.NODE_MODULES_PATH = NODE_MODULES_PATH;
process.env.VENDOR_PKG_MAP = JSON.stringify(parsedVendorPkgsMap);
