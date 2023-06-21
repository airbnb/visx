# @visx/vendor

This package consists of vendored packages for other `visx` packages. It is meant to enable dual
support for export of CommonJS and ESM formats by _re-exporting_ some `visx` dependencies, and even
some transitive dependencies, which are ESM-only.

This package is heavily based off of
[`victory-vendor`](https://github.com/FormidableLabs/victory/tree/main/packages/victory-vendor)
which aims to solve the same problem.
