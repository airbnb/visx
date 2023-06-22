/**
 * This file handles the logic of transpiling ESM-only modules, ensuring that
 * any references to _other_ ESM-only modules also points to our vendored libs.
 */
const path = require('path');

module.exports = {
  plugins: [
    [
      '@babel/transform-modules-commonjs',
      {
        strict: false,
        allowTopLevelThis: true,
      },
    ],
    [
      'module-resolver',
      {
        // Convert all imports for _other_ ESM-only dependencies to the relative
        // path in our vendor package.
        resolvePath(sourcePath, currentFile) {
          // extract the pkg name and detect if there is a deep import path
          const packagePattern = /^(?<pkg>([^/]))(?<path>.*)/;
          const match = packagePattern.exec(sourcePath);

          if (match) {
            const pkgName = match.groups.pkg;

            // this is the easies way to pass this map to this file :melt:
            const vendorPkgMap = JSON.parse(process.env.VENDOR_PKG_MAP || '{}');

            // if this pkg is one we vendor
            if (pkgName in vendorPkgMap) {
              // Throw if there is a path component like "d3-<whatever>/path/to.js"
              if (match.groups.path) {
                throw new Error(`Unable to process ${sourcePath} import in ${currentFile}`);
              }
              const parsedPkg = vendorPkgMap[pkgName];

              // Derive relative path to vendor lib to have a file like move from:
              // - 'node_modules/d3-interpolate/src/rgb.js'
              // - 'lib-vendor/d3-interpolate/src/rgb.js'
              const currentFileVendor = currentFile.replace(
                /node_modules/,
                process.env.VENDOR_CJS_DIR,
              );

              // and have an import transform like:
              // - d3-color
              // - ../../d3-color
              const relPathToPkg = path
                .relative(path.dirname(currentFileVendor), parsedPkg.vendorIndexPath)
                .replace(/\\/g, '/');

              return relPathToPkg;
            }
          }

          return sourcePath;
        },
      },
    ],
  ],
};
