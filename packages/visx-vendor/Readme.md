# @visx/vendor

This package consists of vendored packages for other `visx` packages. It is meant to enable dual
support for export of CommonJS and ESM formats by _re-exporting_ some `visx` dependencies, and even
some transitive dependencies, which are ESM-only.

This package is heavily based off of
[`victory-vendor`](https://github.com/FormidableLabs/victory/tree/main/packages/victory-vendor)
which aims to solve the same problem.

## Vendored packages

All vendored packages are listed as `dependencies` in the `package.json` of this package.

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
`@visx/vendor/lib-vendor/d3-interpolate/**/*.js`.

```ts
const { interpolate } = require('victory-vendor/d3-interpolate');
```

Such transpiled versions have _internally consistent_ import references to other other
`@visx/vendor/lib-vendor/<pkg-name>` paths that need to be transpiled.

### TODO

- [x] collect d3 requirements (manual) to inform design
- [ ] automate dependency requirements
  - yarn install packages
  - script
    - crawls packages from the root, finding those in the map
      - yarn why <pgk> => extract <pgk>@XXX => compare XXX to map => if in map => add to dep
      -
  - bump d3-dep anywhere to version that needs vendor => CI should assert that the package.json diff
    is clean
  -
- [ ] create @visx/vendor
  - [ ]
- [ ] write transpilation
- [ ] update `d3-*` imports to reference `@visx/vendor/d3-*`
  - [ ]
