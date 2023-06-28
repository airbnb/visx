/**
 * This file handles the logic of transpiling ESM-only modules, ensuring that
 * any references to _other_ ESM-only modules also points to our vendored libs.
 */
// eslint-disable-next-line no-undef
const path = require('path');

// eslint-disable-next-line no-undef
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
        /**
         * Converts all imports for _other_ ESM-only dependencies to the relative
         * path in our vendor package. Example input and output for a `d3-scale` file
         * importing from `d3-time-format`.
         *
         * sourcePath: 'd3-time-format'
         * currentFile: '/some/path/visx/node_modules/d3-scale/src/time.js'
         * relativePath: '../../d3-time-format/src/index.js'
         */
        resolvePath(sourcePath, currentFile) {
          // extract the pkg name and detect if there is a deep import path
          const packagePattern = /^(?<pkg>([^/]+))(?<path>.*)/;
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
              const sourcePkg = vendorPkgMap[pkgName];

              // convert from node_modules to the target vendored path, e.g.,
              //    /path/visx/node_modules/d3-array/src/difference.js
              //    /path/visx/packages/visx-vendor/lib/d3-array/src/difference.js
              const currentFileVendoredFilename = currentFile.replace(
                process.env.ROOT_NODE_MODULES_PATH,
                process.env.VENDOR_CJS_PATH,
              );

              // now create a *relative* path from the current vendor file to the
              // vendored source file being imported in the current file, e.g., the path from
              //    /path/visx/packages/visx-vendor/lib/d3-array/src/difference.js
              // to
              //    /path/visx/packages/visx-vendor/lib/d3-XXX/src/index.js
              const relativePath = path.relative(
                path.dirname(currentFileVendoredFilename),
                sourcePkg.vendorIndexFileName,
              );

              return relativePath;
            }
          }

          return sourcePath;
        },
      },
    ],
  ],
};
