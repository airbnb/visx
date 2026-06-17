# @visx/registry

Source files and validation scripts for the visx shadcn registry. This package is private and has no
runtime API; it exists to ship drop-in chart components through GitHub registry installs.

## Motivation

visx is intentionally low level: primitives take props, compose freely, and stay out of your app's
state model. That is what makes visx useful for unusual charts, custom dashboards, and product
interfaces that do not fit a fixed charting API.

The tradeoff is that teams often need a good starting point before they can customize. A line chart,
bar chart, heatmap chart, or treemap chart usually needs the same surrounding work:

- responsive SVG sizing
- theme token usage
- axis and grid styling
- accessible SVG labels and descriptions
- hidden data table fallbacks
- live region wiring
- installable dependency metadata

That work is valuable, but it is repetitive. `@visx/registry` packages those starting points as
copyable registry items while keeping the installed output plain React and visx primitives.

## Registry-first design

The registry package is distribution infrastructure, not a chart framework.

- Registry items install into user projects as source files.
- Installed charts depend on public visx packages, not `@visx/registry`.
- Source files live under `registry/charts`.
- The repository root `registry.json` is the public GitHub registry entrypoint.
- The source registries are committed, but generated `public/r` item JSON is not.
- Each chart remains editable after install.

This keeps the installed result compatible with the rest of visx: users can change scales, marks,
themes, accessibility labels, data accessors, and layout directly in their app.

## Local development

Add or edit chart source in `registry/charts`, then update `registry.json` with the item metadata,
dependencies, source path, and install target.

```sh
yarn registry:validate
```

This validates both the root GitHub registry entrypoint and the package source registry with the
shadcn CLI.

Run the focused registry test suite when changing chart source, metadata, or build scripts:

```sh
yarn vitest run --project @visx/registry
```

Run the install smoke when changing public item names, file targets, dependencies, or exported
component names:

```sh
yarn registry:smoke
```

The smoke test installs every registry item into fresh Next and Vite fixtures with the real shadcn
CLI and typechecks the installed source.

## Item structure

Each registry item should have a stable install name and a matching component export.

```txt
registry/charts/line-chart/line-chart.tsx
components/charts/line-chart.tsx
export function LineChart()
```

Use the `-chart` suffix for chart item names, source files, targets, and exported components. This
keeps registry install names, file names, and generated import names predictable.

## GitHub installs

The public registry entrypoint is the repository root `registry.json`, which includes this package's
source registry:

```txt
registry.json
packages/visx-registry/registry.json
```

After the registry branch lands on the default branch and the referenced visx packages are
published, items can be installed with the shadcn CLI by GitHub address:

```sh
npx shadcn@latest add airbnb/visx/line-chart
```

The local smoke test builds registry item JSON into a temporary directory only so unpublished branch
changes can still be installed into fresh fixtures.

## Accessibility and theming

Registry charts should ship with live accessibility wiring from `@visx/a11y` and theme token usage
from `@visx/theme`.

Use `showLiveRegion={false}` when rendering multiple charts on a page that owns a single shared
announcer. The chart should still render its SVG semantics and hidden data table fallback.

Charts should read theme values through visx theme hooks and CSS-ready variables, rather than
hard-coding light and dark mode branches.
