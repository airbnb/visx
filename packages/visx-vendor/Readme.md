# @visx/vendor

This package consists of vendored packages for other `visx` packages. It is meant to enable dual
support for export of CommonJS and ESM formats by _re-exporting_ some `visx` dependencies, and even
some transitive dependencies, which are ESM-only.

This package is heavily based off of
[`victory-vendor`](https://github.com/FormidableLabs/victory/tree/main/packages/victory-vendor)
which aims to solve the same problem.

## Vendored packages

All vendored packages are listed as `dependencies` in the `package.json` of this package (note that
the `yarn` `nohoist` option is set for this package to guarantee version specificity in this large
monorepo where we may have mixed versions of `d3` packages). For each (non-types) package `<pkg>`,
we generate the following:

- an ESM version of the package in `esm/<pkg>.js`
- a CJS version of the package in `lib/<pkg>.js`
  - this points to the fully-transpiled version of the package in
    `vendor-cjs/vendor-<pkg>/src/index.js`
  - `vendor-cjs/vendor-<pkg>/LICENSE` contains the upstream license of the vendored package
  - other ESM-only packages (e.g., `<pkg2>`) that are referenced by `<pkg>` are updated to point to
    `vendor-cjs/vendor-<pkg2>/src/index.js`
- TypeScript types from `@types/<pkg>` as root `<pkg>.d.ts` files (when available as specified in
  the `package.json` `dependencies`)
- a root `<pkg>.js` file (pointing to the CJS version of the lib) for tooling that doesn't yet
  support `package.json:exports`
  ([conditional exports](https://nodejs.org/api/packages.html#conditional-exports))

## How it works

We provide two alternate paths and behaviors -- for ESM and CommonJS

### ESM

When you use a module `import` syntax like the following, it will resolve to a re-exported version
of `node_modules/d3-interpolate`, the unmodified ESM library from D3.

```ts
import { interpolate } from '@visx/vendor/d3-interpolate';
```

### CommonJS

If you use a CJS `require` syntax like the following, it will resolve to an alternate path that
contains the **transpiled** version of the underlying `d3-*` (or other) library to be found at
`@visx/vendor/vendor-cjs/d3-interpolate/**/*.js`.

```ts
const { interpolate } = require('@visx/vendor/d3-interpolate');
```

Such transpiled versions have _internally consistent_ import references to other other
`@visx/vendor/vendor-cjs/<pkg-name>` paths that need to be transpiled.

### Root index files & types

For tooling that doesn't yet support `package.json:exports`
([conditional exports](https://nodejs.org/api/packages.html#conditional-exports)), we include root
index files for all vendored packages, e.g., `@visx/vendor/d3-array.js`.

Type declaration files are also included in the root, e.g., `@types/d3-array` is exported as
`@visx/vendor/d3-array.d.ts`.
