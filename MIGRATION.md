# Upgrading to visx 4

visx 4 is the current major release. It modernizes React support, package entry points, browser
targets, and the published ESM output. For most apps, the upgrade is:

1. Upgrade all `@visx/*` packages together to `^4.0.0`.
2. Use React 18 or 19.
3. Replace deep imports like `@visx/shape/lib/shapes/Bar` with package-root imports like
   `@visx/shape`.
4. If you use TypeScript, install `@types/react` and, when needed, `@types/react-dom` using the
   major version that matches your React version.
5. If you use `withBoundingRects`, attach its injected `nodeRef` to the DOM element you want
   measured.
6. If you rely on generated runtime `propTypes`, migrate those checks into your app.
7. If you still need IE11, stay on visx 3.

## 4.1 (coming soon)

### `@visx/kernel` adds shared primitives for first-party hooks

visx 4.1 introduces `@visx/kernel`, a small shared package for the cross-cutting primitives used by
first-party hooks: structural memoization, accessor normalization, stable callbacks, stable refs,
stable ids, domain computation, number formatting, path-string helpers, `Path2D` caching, and
structured development warnings.

The package gives first-party hooks a consistent place to normalize user input before doing
package-specific math when that normalization is appropriate. Existing component APIs do not change,
and `@visx/kernel` does not add rendering opinions.

**What you need to do:** nothing unless you want to build directly on these low-level primitives.
Existing visx charts continue to work. Future hook APIs may use `@visx/kernel` internally, but
consumers do not need to install or import it directly unless they opt in.

### `@visx/theme` adds shared visual tokens for primitive charts

visx 4.1 introduces `@visx/theme`, an optional package for sharing chart colors, typography, axis,
grid, and layout defaults across low-level visx charts. The package keeps visx primitives
prop-driven: `@visx/axis`, `@visx/grid`, and `@visx/shape` do not read theme context automatically.

Use the server-compatible root entry when a chart only needs scoped CSS variables:

```tsx
import { ThemeScope } from '@visx/theme';

<ThemeScope theme="auto">
  <Chart />
</ThemeScope>;
```

Use the client entry when chart components need hook-derived props:

```tsx
import { ThemeProvider, useAxisStyle, useGridStyle, useColor } from '@visx/theme/react';
```

`theme="auto"` is designed for shadcn/ui-style CSS variables such as `--chart-1`, `--background`,
`--border`, and `--muted-foreground`. It does not install a mode switcher, read the DOM, or update
JS-only layout values when a CSS class changes.

Existing `@visx/xychart` themes remain supported for `XYChart`. New primitive charts can reuse the
same visual choices with `fromXYChartTheme` from `@visx/theme`.

**What you need to do:** nothing unless you want to opt in. Existing visx charts continue to work.
Add `@visx/theme` only when you want shared visual tokens or shadcn/ui-compatible CSS variable
theming for primitive charts.

### `@visx/a11y` adds opt-in accessibility helpers for primitive charts

visx 4.1 introduces `@visx/a11y`, an optional package for adding chart semantics to primitive SVG
charts. It provides server-safe helpers for generated ARIA props, text descriptions, and hidden data
tables, plus a client hook for pre-bound chart props, data-table fallback, and live announcements.

These helpers do not replace the chart render tree or hide non-data elements automatically. If your
chart includes decorative chrome such as grid lines, axis ticks, background rectangles, or clipping
helpers, render those elements with `aria-hidden="true"` so assistive technology focuses on the
chart title, description, series, data marks, and table fallback.

**What you need to do:** nothing unless you want to opt in. Existing visx charts continue to work.
Add `@visx/a11y` only when you want generated chart semantics or a data-table fallback for primitive
charts.

### Registry-oriented hooks for primitive charts

visx 4.1 adds the first hook and helper APIs used to build primitive charts for the visx chart
registry. These APIs are additive and live in package roots or explicit React subpaths:

```tsx
import { useChartDimensions } from '@visx/chart';
import { useAxis } from '@visx/axis/react';
import { useScale } from '@visx/scale/react';
import { arcPath, areaPath, linePath } from '@visx/shape';
import { usePie } from '@visx/shape/react';
import { useColorScale } from '@visx/theme/react';
import { useVoronoi } from '@visx/voronoi/react';
```

Existing component APIs continue to work. `<Axis />` and `<Pie />` reuse the extracted hook logic
internally, but their public props and rendering behavior are unchanged. Hooks that need React are
exported from `/react` subpaths; root package imports such as `@visx/scale` remain available for
non-React code.

**What you need to do:** nothing unless you want to author hook-based primitive charts. Continue
using existing components as before, or opt into the new hooks from the import paths above.

## From visx 3.x

Upgrade every visx package in your application at the same time. Mixing visx 3 and visx 4 packages
is not recommended because package entry points, peer dependency ranges, and internal package
dependencies changed together.

```bash
npm install @visx/shape@^4 @visx/scale@^4
```

With Yarn, upgrade the visx packages your app depends on to the same major:

```bash
yarn up "@visx/*@^4.0.0"
```

### React 18 or 19 is required

React-based `@visx/*` packages declare `react` peer dependencies as `^18.0.0 || ^19.0.0`. Packages
that depend on `react-dom` declare the same supported range for their `react-dom` peer dependency.

**What you need to do:**

- **React 18 or 19 consumers:** no runtime code changes are expected for this peer dependency
  update.
- **React 16 or 17 consumers:** stay on visx 3 or upgrade your app to React 18+ before installing
  visx 4.
- **Preact consumers:** continue aliasing `react` and `react-dom` to `preact/compat`, and configure
  your package manager to satisfy the React 18/19 peer dependency range.

### TypeScript React types are peer dependencies

React-based `@visx/*` packages now declare `@types/react` as an optional peer dependency instead of
bundling their own copy. Packages that touch React DOM APIs also declare optional `@types/react-dom`
peer dependencies.

**What you need to do:**

- **TypeScript consumers:** install `@types/react` and, when needed, `@types/react-dom` using the
  major version that matches your React version.
- **Non-TypeScript consumers:** no action needed.

### Runtime PropTypes were removed

visx packages no longer depend on `prop-types`, and the build no longer generates runtime
`Component.propTypes` from TypeScript definitions.

**What you need to do:**

- Most consumers do not need to change code.
- If your app imported `prop-types` only because a visx package installed it transitively, add
  `prop-types` as a direct dependency.
- If your app inspects visx component `propTypes` at runtime, migrate that validation into your app
  or use TypeScript/static checks instead.

### Package root imports are the supported API surface

Every package now publishes an `exports` field mapping package-root imports to `types`, `import`,
and `require` entries. This improves module resolution in modern bundlers and Node.js, but it also
restricts access to internal paths.

**What you need to do:** replace deep imports like `@visx/foo/lib/bar` with package-root imports
like `@visx/foo`. If a symbol you need is not exported from the package root, open an issue.

Most common component prop types are now exported from package roots as TypeScript-only exports. For
example, prefer importing `AxisProps` from `@visx/axis` instead of reaching into internal files.

### Modern browser targets

Babel targets were bumped to modern browsers. IE11 and other legacy browsers are no longer
supported.

**What you need to do:** if you still need IE11, stay on visx 3.

### Published ESM output works in strict ESM environments

The published `esm/` output now emits explicit `.js` extensions on relative imports and a nested
`esm/package.json` with `"type": "module"`. Strict Node ESM consumers such as Vite SSR, Deno, and
edge runtimes should no longer hit `ERR_MODULE_NOT_FOUND` from extensionless visx ESM imports.

**What you need to do:** nothing, unless you previously pinned to an older alpha to work around ESM
issues. Upgrade all visx packages to `^4.0.0`.

### D3 shape and path dependencies were upgraded

visx packages now use `d3-shape` v3 and `d3-path` v3 through `@visx/vendor`. visx preserves its
existing package-level behavior where compatibility shims were needed, but direct D3 imports are now
your app's responsibility.

**What you need to do:**

- Most consumers do not need to change code.
- If your app imports `d3-shape` or `d3-path` without declaring them in your own `package.json`, add
  them as direct dependencies.
- If your app imports from `@visx/vendor/d3-shape` or `@visx/vendor/d3-path`, review the D3 v3 API
  and type changes.

### `@visx/bounds` `withBoundingRects` requires `nodeRef`

`withBoundingRects` no longer falls back to `ReactDOM.findDOMNode`. The wrapped component receives a
`nodeRef` prop and must attach it to the DOM element that should be measured. This keeps
`@visx/bounds` compatible with React 19 and React strict-mode expectations.

**What you need to do:**

- If you use `withBoundingRects`, make sure the wrapped component accepts `nodeRef` and passes it to
  the measured DOM element.
- If you use TypeScript, type `nodeRef` as a React ref for the element you measure.
- If you already attach `nodeRef`, no action is needed.

```diff
- function Tooltip({ rect, parentRect, children }) {
-   return <div>{children}</div>;
+ type TooltipProps = Omit<WithBoundingRectsProps, 'nodeRef'> & {
+   nodeRef?: React.Ref<HTMLDivElement>;
+ };
+
+ function Tooltip({ rect, parentRect, nodeRef, children }: TooltipProps) {
+   return <div ref={nodeRef}>{children}</div>;
  }
```

### `@visx/responsive` measurement fixes

`ParentSize` and `withParentSize` now render a two-div structure to prevent infinite height growth
in flex and grid layouts. `useParentSize` now uses a callback ref internally and also accepts an
optional `externalRef`.

**What you need to do:**

- Most consumers do not need to change code.
- If you access `parentRef.current` from `useParentSize`, replace it with the returned `node`.
- If tests or CSS rely on the exact `ParentSize` wrapper DOM structure, update them for the nested
  measurement div.

### `@visx/xychart` axis loading behavior

`BaseAxis` no longer renders until at least one data series with non-empty `data` has been
registered in `DataContext`. Previously, on initial render the axis could use the fallback
`scaleLinear()` domain `[0, 1]`, causing `tickFormat` to receive incorrect intermediate values
before real data loaded.

**What you need to do:**

- Most consumers do not need to change code.
- If you relied on the axis being visible before data loaded, render a placeholder `<Axis />` from
  `@visx/axis` directly with your own scale until your data is ready, then switch to the xychart
  `<Axis />`.

### `@visx/xychart` `withRegisteredData` was removed

The internal `withRegisteredData` enhancer was removed from `@visx/xychart`. Series components now
register their data directly instead of using that higher-order component.

**What you need to do:** most consumers do not need to change code. If you imported
`@visx/xychart/lib/enhancers/withRegisteredData` directly, migrate to the public xychart series
components and package-root exports.

### Lodash is no longer a transitive implementation dependency

`@visx/responsive`, `@visx/text`, `@visx/xychart`, and `@visx/shape` no longer declare direct
`lodash` or `@types/lodash` dependencies. Internal `debounce`, `memoize`, and `chunk` usage has been
replaced with small local helpers. Public visx APIs are intended to behave the same.

**What you need to do:** if your app imported `lodash` without declaring it in your own
`package.json`, add `lodash` as a direct dependency. It may have worked before only because a visx
package installed it transitively.

### Building visx from source requires newer tooling

This note is for contributors or consumers building the visx repo itself. The repository now uses
Yarn 4 via Corepack and requires Node 24 or newer.

**What you need to do:** if you only install published `@visx/*` packages, no action is needed. If
you build the repo locally, use Node 24+ and run Yarn through Corepack.

## From 4.0.0 alpha releases

Upgrade all `@visx/*` packages to `^4.0.0`. The stable release includes all alpha changes listed
below, plus the final React 18/19 peer dependency range and Dependabot cleanup from the final alpha
publishes.

If you installed `4.0.0-alpha.10`, `4.0.0-alpha.12`, or `4.0.0-alpha.13`, upgrade immediately. Those
alpha releases partially failed and left some packages unpublished or out of sync.

## Alpha release history

The notes below are preserved for users who tested the v4 alpha series. Stable upgrade guidance
above supersedes any older alpha-specific instructions.

## 4.0.0-alpha.17

Internal only: updated transitive `brace-expansion` lockfile entries to resolve a Dependabot
security alert. No consumer-facing visx API changes are expected.

## 4.0.0-alpha.16

Internal only: updated demo, test, release, and build-tool dependencies to resolve Dependabot
security alerts. No consumer-facing visx API changes are expected.

## 4.0.0-alpha.15

### React 18 or 19 is now required

React-based `@visx/*` packages now declare `react` peer dependencies as `^18.0.0 || ^19.0.0`.
Packages that depend on `react-dom` declare the same supported range for their `react-dom` peer
dependency. Optional `@types/react` and, where applicable, `@types/react-dom` peer dependencies use
the same supported major-version range.

**What you need to do:**

- **React 18 or 19 consumers:** no runtime code changes are expected for this peer dependency
  update.
- **React 16 or 17 consumers:** stay on visx v3 or upgrade your app to React 18+ before installing
  visx v4.
- **TypeScript consumers:** install `@types/react` and, when needed, `@types/react-dom` using the
  major version that matches your React version.
- **Preact consumers:** continue aliasing `react` and `react-dom` to `preact/compat`, and configure
  your package manager to satisfy the React 18/19 peer dependency range.

## 4.0.0-alpha.14

Re-publish of alpha.12 and alpha.13, which partially failed (see below). No intended code changes
relative to alpha.12 — all packages are now published at the same version.

**What you need to do:** if you installed any `@visx/*` packages at `4.0.0-alpha.12` or
`4.0.0-alpha.13`, upgrade to `alpha.14` to ensure all packages are in sync.

### Lodash removed from package dependencies

`@visx/responsive`, `@visx/text`, `@visx/xychart`, and `@visx/shape` no longer declare direct
`lodash` or `@types/lodash` dependencies. Internal `debounce`, `memoize`, and `chunk` usage has been
replaced with small local helpers. Public visx APIs are intended to behave the same, including the
existing debounce options in `@visx/responsive`.

**What you need to do:**

- **Most consumers:** nothing — this removes an implementation dependency from visx packages.
- **If your app imported `lodash` without declaring it in your own `package.json`:** add `lodash` as
  a direct dependency. It may have worked before only because a visx package installed it
  transitively.

This release also fixes the XYChart docs/demo example so it passes its known `width` into `XYChart`.
No consumer code changes are needed for that docs-only fix.

## 4.0.0-alpha.13 (broken)

⚠️ **Do not use this release.** An npm provenance transparency log conflict caused `lerna publish`
to fail partway through. Some packages were never published at this version while the rest were,
resulting in a version mismatch across the monorepo. Use `alpha.14` instead.

## 4.0.0-alpha.12 (broken)

⚠️ **Do not use this release.** An npm provenance transparency log conflict caused `lerna publish`
to fail partway through. Some packages were never published at this version while the rest were,
resulting in a version mismatch across the monorepo. Use `alpha.14` instead.

## 4.0.0-alpha.11

Re-publish of alpha.10 which partially failed (see below). No code changes — all packages are now
published at the same version.

**What you need to do:** if you installed any `@visx/*` packages at `4.0.0-alpha.10`, upgrade to
`alpha.11` to ensure all packages are in sync.

## 4.0.0-alpha.10 (broken)

⚠️ **Do not use this release.** A sigstore transparency log conflict caused `lerna publish` to fail
partway through. 18 packages were never published at this version while the rest were, resulting in
a version mismatch across the monorepo. Use `alpha.11` instead.

## 4.0.0-alpha.9

### ESM fix now published for all packages

Five packages (`@visx/vendor`, `@visx/point`, `@visx/scale`, `@visx/curve`, `@visx/mock-data`) were
stuck on pre-alpha.2 versions and still shipped ESM output without `.js` extensions or the
`esm/package.json` `"type": "module"` marker. This release force-publishes every package so the
alpha.2 ESM fix ([#1976](https://github.com/airbnb/visx/issues/1976)) is present across the board.

**What you need to do:** if you hit `ERR_MODULE_NOT_FOUND` in strict ESM environments (Vite SSR,
Deno, edge runtimes) with any of those five packages, upgrading to this release resolves it.

## 4.0.0-alpha.8

### `@visx/responsive` useParentSize external ref support

`useParentSize` now accepts an optional `externalRef` in its config object. If provided, the hook
forwards the observed DOM node to both its internal state and the external ref, eliminating the need
for a wrapper div when you already have a ref on the container element.

```tsx
const myRef = useRef<HTMLDivElement>(null);
const { parentRef, width, height } = useParentSize({ externalRef: myRef });

return <div ref={parentRef}>...</div>;
// myRef.current is also set to the div element
```

Both `RefObject` and callback refs are supported.

**What you need to do:**

- **Most consumers:** nothing — this is an additive, non-breaking change. Existing usage without an
  `externalRef` argument is unchanged.
- **If you were adding a wrapper div to combine your own ref with `parentRef`:** you can now remove
  the wrapper and pass your ref directly via the `externalRef` option.

## 4.0.0-alpha.7

### `@visx/responsive` ParentSize flex/grid infinite growth fix

`ParentSize` and `withParentSize` now render a two-div structure to prevent infinite height growth
in flex and grid layouts ([#881](https://github.com/airbnb/visx/issues/881),
[#1014](https://github.com/airbnb/visx/issues/1014)).

Previously, the component rendered a single wrapper `<div style="width: 100%; height: 100%">`. In
flex or grid containers, a child SVG's intrinsic height could grow the wrapper, triggering
ResizeObserver in a feedback loop.

The new structure uses an outer `<div style="width: 100%; height: 100%; position: relative">` and an
inner `<div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden">`
that holds the ResizeObserver and children. Since the inner div is absolutely positioned, children's
intrinsic sizes cannot grow the outer container.

**What you need to do:**

- **Most consumers:** nothing — the component API is unchanged and the visual result should be
  identical or better (no more infinite growth).
- **If you rely on the wrapper div's exact DOM structure** (e.g., querying it in tests or applying
  CSS that targets a single wrapper div): the wrapper is now two nested divs. `className`, `style`,
  and all other HTML attributes still apply to the outer div.
- **If you use the deprecated `parentSizeStyles` prop:** it still works and applies to the outer
  div, but `position: relative` is prepended to ensure the inner absolutely-positioned measurement
  div works correctly. If you explicitly set `position` in your custom styles, your value takes
  precedence.
- **If you use `withParentSize`:** the same two-div structure applies. The container div is no
  longer a single `<div style="width: 100%; height: 100%">`.

## 4.0.0-alpha.6

### `@visx/responsive` useParentSize callback ref fix

`useParentSize` now uses a callback ref internally instead of `useRef`. This fixes a bug where the
hook could permanently report 0×0 dimensions because `parentRef.current` was null when the
`useEffect` first ran, and the dependency array never re-fired once the ref attached to the DOM
([#1816](https://github.com/airbnb/visx/issues/1816)).

The returned `parentRef` is now a callback ref (`(node: T | null) => void`) instead of a
`RefObject<T | null>`. A new `node` property is also returned for direct access to the observed DOM
element.

**What you need to do:**

- **Most consumers:** nothing — `<div ref={parentRef}>` works with both `RefObject` and callback
  refs, and `ParentSize` component users are unaffected.
- **If you access `parentRef.current` directly:** replace with the new `node` return value.

  ```diff
  - const { parentRef, width, height } = useParentSize();
  - console.log(parentRef.current);
  + const { parentRef, node, width, height } = useParentSize();
  + console.log(node);
  ```

## 4.0.0-alpha.5

### `@visx/xychart` axis rendering fix (breaking)

`BaseAxis` no longer renders until at least one data series with non-empty `data` has been
registered in `DataContext`. Previously, on initial render the axis could use the fallback
`scaleLinear()` domain `[0, 1]`, causing `tickFormat` to receive incorrect intermediate values
before real data loaded ([#1975](https://github.com/airbnb/visx/issues/1975)).

This is a behavior change: axes that previously rendered immediately (showing `0`–`1` ticks while
data was loading) will now render `null` until real data is available.

**What you need to do:**

- **Most consumers:** nothing — this is a bugfix. If you were working around stale tick labels on
  first render, you can remove that workaround.
- **If you relied on the axis being visible before data loaded** (e.g., to display a skeleton axis):
  render a placeholder `<Axis />` from `@visx/axis` directly with your own scale until your data is
  ready, then switch to the xychart `<Axis />`.

Thank you [wildseansy](https://github.com/wildseansy) for the fix
[#1979](https://github.com/airbnb/visx/pull/1979)

## 4.0.0-alpha.4

Internal only: replaced `ts-node` with `tsx` (esbuild-based) for faster TypeScript script execution.
No consumer-facing changes.

## 4.0.0-alpha.3

### `@types/react` and `@types/react-dom` as peer dependencies

React-based `@visx/*` packages now declare `@types/react` as a **peer** dependency instead of
bundling their own copy. That way your app supplies a single version and you avoid duplicate or
conflicting installs.

`@visx/bounds`, `@visx/tooltip`, `@visx/xychart`, and the `@visx/visx` meta-package all declare
`@types/react-dom` as an optional peer directly (bounds and tooltip type DOM-touching APIs; xychart
consumes tooltip and so transitively needs react-dom at runtime; the umbrella matches the pattern of
its DOM-touching members).

`@visx/brush` and `@visx/wordcloud` also declare `@types/react` as an optional peer so consumers
installing either package directly get the same type-dependency signal as the rest of the
React-based `@visx/*` packages.

The peers are marked `optional` via `peerDependenciesMeta`, so non-TypeScript consumers will not see
missing-peer warnings.

**What you need to do:**

- **React 18 or 19 (TypeScript users):** add `@types/react` as a dev dependency matching your React
  version:

  ```bash
  yarn add -D @types/react
  ```

  If you use `@visx/bounds`, `@visx/tooltip`, `@visx/xychart`, or the `@visx/visx` meta-package,
  also install `@types/react-dom`:

  ```bash
  yarn add -D @types/react-dom
  ```

  Use the major versions that align with your `react` / `react-dom` versions.

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
