# @visx/kernel

Shared primitives for first-party visx hooks.

`@visx/kernel` keeps user-input handling consistent across the hooks surface:
referential stability, structural equality, accessor normalization, and shared
development warnings live in one package instead of being reimplemented in each
consumer package.

The package is intentionally small. Public hooks and pure helpers are added only
when a first-party hook needs the shared behavior.

## v1 non-goals

Symbol keys are not supported as accessors in v1. Use a string key or an accessor
function.

`toPath2D(d)` returns a real `Path2D` in browsers. On the server, it returns a
minimal object that stores the path string for cache identity and string
inspection; it is not a drawing polyfill.

## Review gate

The public value export surface is locked by `test/apiSurface.test.ts`. API
changes should update that test intentionally.

TypeScript ergonomics are checked by `test/api.typecheck.ts`, which uses
realistic call sites without casts. Run it with `yarn type:kernel-api`.

Pure helpers must import and run on the server. Hooks may be imported on the
server, but must only be used during React render.

This package currently follows the repo's fixed visx package version. Publishing
it as `@visx/kernel@1.0.0` requires a release-mode decision before Phase 6.
