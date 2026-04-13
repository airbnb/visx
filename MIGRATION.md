# Migration guide

This document tracks consumer-facing changes for each `4.0.0-alpha.*` release. Upgrades are
cumulative — if you're jumping several versions, apply the steps from each section in order.

## 4.0.0-alpha.3

### `@types/react` and `@types/react-dom` as peer dependencies

React-based `@visx/*` packages now declare `@types/react` as a **peer** dependency instead of
bundling their own copy. That way your app supplies a single version and you avoid duplicate or
conflicting installs.

`@visx/bounds`, `@visx/tooltip`, `@visx/xychart`, and the `@visx/visx` meta-package all declare
`@types/react-dom` as an optional peer directly (bounds and tooltip type DOM-touching APIs;
xychart consumes tooltip and so transitively needs react-dom at runtime; the umbrella matches the
pattern of its DOM-touching members).

`@visx/brush` and `@visx/wordcloud` also declare `@types/react` as an optional peer so consumers
installing either package directly get the same type-dependency signal as the rest of the
React-based `@visx/*` packages.

The peers are marked `optional` via `peerDependenciesMeta`, so non-TypeScript consumers and React
19+ consumers who rely on React's built-in types will not see missing-peer warnings.

**What you need to do:**

- **React 18 and earlier (TypeScript users):** add `@types/react` as a dev dependency matching
  your React version:

  ```bash
  yarn add -D @types/react
  ```

  If you use `@visx/bounds`, `@visx/tooltip`, `@visx/xychart`, or the `@visx/visx` meta-package,
  also install `@types/react-dom`:

  ```bash
  yarn add -D @types/react-dom
  ```

  Use the major versions that align with your `react` / `react-dom` versions.

- **React 19+:** rely on the types shipped with `react` and `react-dom`. The optional peer means no
  install warning either way.

- **Non-TypeScript consumers:** no action needed.

If you see TypeScript errors about missing `react` types after upgrading, install the appropriate
`@types/react` (and `@types/react-dom` when using `@visx/bounds`, `@visx/tooltip`, `@visx/xychart`,
or `@visx/visx`) in your application.

## 4.0.0-alpha.2

### Node ESM compatibility fix for published `esm/` output

The published `esm/` output now emits explicit `.js` extensions on relative imports and a nested
`esm/package.json` with `"type": "module"`. Strict Node ESM consumers (Vite/react-router SSR, Deno,
edge runtimes) previously failed with `ERR_MODULE_NOT_FOUND` when resolving visx's ESM entry.

**What you need to do:** nothing — this is a bugfix. If you were pinned to `4.0.0-alpha.1`
specifically to avoid a different ESM issue, you can upgrade safely.

## 4.0.0-alpha.1

Release-plumbing only: prerelease bump configuration and CI permissions for release PR comments. No
consumer-facing changes.

## 4.0.0-alpha.0

The React 19 cut. This is the release that drops legacy React support and modernizes the build
targets.

### React 19 support (automatic JSX transform)

Every `@visx/*` package now uses the automatic JSX transform and imports React symbols as direct
named imports or type-only imports (no more `React.ReactNode` namespace access). Peer dependency
ranges were widened to `^16.14.0 || ^17.0.0-0 || ^18.0.0-0 || ^19.0.0-0`.

**What you need to do:**

- **React 19 consumers:** you should be able to upgrade with no code changes.
- **React 18 / 17 / 16.14+ consumers:** still supported, no action needed.
- **React ≤ 16.13:** no longer supported — upgrade React first.
- If you import directly from deep subpaths (e.g. `@visx/shape/lib/shapes/Bar`), prefer the package
  root (`@visx/shape`). Deep imports are no longer the blessed API surface and may break in a future
  alpha. Every package now declares `exports` so Node's module resolver will honor the root entry.

### Dropped IE11 support

Babel targets were bumped to modern browsers. IE11 and other legacy browsers are no longer
supported.

**What you need to do:** if you still need IE11, stay on `3.x`.

### Package `exports` field

Every package now publishes an `exports` field mapping `.` to `types`, `import`, and `require`
entries. This improves module resolution in modern bundlers and Node.js, but does restrict access to
internal paths.

**What you need to do:** replace any deep imports (`@visx/foo/lib/bar`) with root imports
(`@visx/foo`). If a symbol you need isn't re-exported from the root, open an issue.

### Lerna v9 / OIDC publishing / resolution cleanup

Internal only — Lerna was upgraded to v9, publishing now uses OIDC trusted publishing, and unused
`ansi-*` resolutions were removed from the root. No consumer impact.

### `@visx/demo` (internal)

Upgraded to React 19, Next.js 15, and `@react-spring/web` v10. Affects contributors only.
