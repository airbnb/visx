# @visx/a11y

Accessibility helpers for primitive visx charts without changing the low-level visx primitive model.
The package is split into a server-safe entry for generated semantics and a client root entry for
React hooks and companion components.

## Installation

```sh
npm install --save @visx/a11y
```

## Motivation

visx is intentionally low level: primitives take props, compose freely, and stay out of your app's
state model. That is what makes visx useful for unusual charts, custom dashboards, and product
interfaces that do not fit a fixed charting API.

The tradeoff is that primitive charts tend to rebuild the same accessibility layer:

- chart titles and long descriptions
- series labels and point value labels
- hidden data tables for exact values
- live regions for async chart updates
- keyboard affordances for chart exploration
- rules for hiding decorative SVG chrome

That works for one chart. It gets noisy when a registry or dashboard has many charts built from
different visx packages. Small differences creep in, dense charts can produce too much screen reader
output, and teams end up copying local helpers from chart to chart.

`@visx/a11y` gives those charts a shared semantic layer while keeping the rendering primitives
plain. It does not ship a chart component, impose SVG structure, or hide non-data elements
automatically. Instead, it gives you spreadable props, generated descriptions, table fallbacks, and
small React helpers that you can attach to the primitives you already render.

## Primitive-first design

The a11y package is a semantics layer, not a chart framework.

- visx primitives remain prop-driven.
- Server helpers are pure functions with no DOM or React hook requirements.
- The client hook uses React `useId()` only when `id` is omitted.
- Consumers own the SVG render tree, focus ring styling, and decorative element visibility.
- Data table and announcer components are independently usable.
- Dense charts degrade to summary descriptions above `pointDescriptionThreshold`.
- `keyboardNavEnabled` controls roving focus for point-by-point chart exploration.

This keeps chart registry items and product charts able to opt in one layer at a time. If a chart
needs custom descriptions, a visible data table, a separate live region, or no interactive keyboard
state yet, the primitive API still supports that.

## Basic usage

Use the server entry when a server-rendered chart only needs generated SVG semantics, a text
description, or an HTML table fallback.

```tsx
import type { ChartA11yConfig } from '@visx/a11y/server';
import {
  generateChartDescription,
  generateDataTableHTML,
  getChartAriaProps,
} from '@visx/a11y/server';

type Datum = {
  month: string;
  revenue: number;
};

const config: ChartA11yConfig<Datum> = {
  id: 'revenue-chart',
  title: 'Revenue by month',
  chartType: 'line',
  data,
  x: (datum) => datum.month,
  y: (datum) => datum.revenue,
  yLabel: 'Revenue',
  formatY: (value) => `$${value}`,
};

const a11y = getChartAriaProps(config);
const description = generateChartDescription(config);
const tableHtml = generateDataTableHTML(config);
```

Use `useChartA11y` from the root entry when chart components need React-bound props and companion
components.

```tsx
'use client';

import { useChartA11y } from '@visx/a11y';

export function RevenueChart({ data }) {
  const a11y = useChartA11y({
    id: 'revenue-chart',
    title: 'Revenue by month',
    chartType: 'line',
    data,
    x: (datum) => datum.month,
    y: (datum) => datum.revenue,
    yLabel: 'Revenue',
    formatY: (value) => `$${value}`,
  });

  return (
    <>
      <svg {...a11y.svgProps}>
        <desc id={a11y.descriptionId}>{a11y.description}</desc>
        {/* chart marks */}
      </svg>
      <a11y.DataTable />
      <a11y.Announcer />
    </>
  );
}
```

## Recipes

### Level 1: Chart semantics, description, and table fallback

Start by spreading `svgProps`, rendering the generated description, and adding the pre-bound data
table and live announcer. This gives the chart an accessible name, a chart-level description, and an
exact-value table fallback without changing the visual chart.

```tsx
const a11y = useChartA11y({
  id: 'revenue-chart',
  title: 'Revenue by month',
  chartType: 'line',
  data,
  x: (datum) => datum.month,
  y: (datum) => datum.revenue,
  yLabel: 'Revenue',
  formatY: (value) => `$${value}`,
});

return (
  <>
    <svg {...a11y.svgProps}>
      <desc id={a11y.descriptionId}>{a11y.description}</desc>
      <g>
        {data.map((datum) => (
          <circle key={datum.month} />
        ))}
      </g>
    </svg>
    <a11y.DataTable />
    <a11y.Announcer />
  </>
);
```

### Level 2: Series and point semantics

After Level 1 is in place, spread `getSeriesProps` on each rendered series group and `getPointProps`
on each rendered data mark. This adds per-series labels and per-point value labels for charts below
the configured `pointDescriptionThreshold`.

```tsx
const a11y = useChartA11y({
  id: 'revenue-chart',
  title: 'Revenue by month',
  chartType: 'line',
  data,
  x: (datum) => datum.month,
  y: (datum) => datum.revenue,
  yLabel: 'Revenue',
  formatY: (value) => `$${value}`,
  series: [{ label: 'Revenue' }],
});

return (
  <>
    <svg {...a11y.svgProps}>
      <desc id={a11y.descriptionId}>{a11y.description}</desc>
      <g {...a11y.getSeriesProps(0)}>
        {data.map((datum, index) => (
          <circle key={datum.month} {...a11y.getPointProps(0, index)} />
        ))}
      </g>
    </svg>
    <a11y.DataTable />
    <a11y.Announcer />
  </>
);
```

### Level 3: Keyboard navigation and tooltip bridge

Keep `keyboardNavEnabled` enabled when a chart should support point-by-point keyboard exploration.
`useChartA11y` adds roving focus props to each data mark and calls `onPointFocus` when keyboard
focus moves to a point. Use that callback to mirror the same tooltip, crosshair, or active-point
state that pointer interaction uses.

```tsx
const a11y = useChartA11y({
  id: 'revenue-chart',
  title: 'Revenue by month',
  chartType: 'line',
  data,
  x: (datum) => datum.month,
  y: (datum) => datum.revenue,
  yLabel: 'Revenue',
  formatY: (value) => `$${value}`,
  series: [{ label: 'Revenue' }],
  onPointFocus: ({ datum, index, seriesIndex }) => {
    showTooltip({
      datum,
      index,
      seriesIndex,
    });
  },
});

return (
  <svg {...a11y.svgProps}>
    <desc id={a11y.descriptionId}>{a11y.description}</desc>
    <g {...a11y.getSeriesProps(0)}>
      {data.map((datum, index) => (
        <circle
          key={datum.month}
          className={a11y.focusedPoint?.index === index ? 'is-keyboard-focused' : undefined}
          {...a11y.getPointProps(0, index)}
        />
      ))}
    </g>
  </svg>
);
```

Use `useChartKeyboardNav` directly when a custom chart already owns its generated ARIA semantics but
still wants the same roving-focus behavior, point focus state, and `onPointFocus` callback.

## Keyboard interaction model

`useChartA11y` starts in chart mode. The chart root is tabbable, and data marks become tabbable only
while keyboard exploration is active. Navigation is enabled by default for charts with at least one
point and no more than `pointDescriptionThreshold` points.

| Key                | Result                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `Tab`              | Moves focus to or away from the chart root through normal page tab order.                    |
| `Enter` or `Space` | Enters data mode and focuses the first data point, or the last focused point when returning. |
| `ArrowRight`       | Moves to the next point in the current series, wrapping at the end.                          |
| `ArrowLeft`        | Moves to the previous point in the current series, wrapping at the beginning.                |
| `ArrowDown`        | Moves to the next non-empty series and keeps the closest point index.                        |
| `ArrowUp`          | Moves to the previous non-empty series and keeps the closest point index.                    |
| `Home`             | Moves to the first point in the current series.                                              |
| `End`              | Moves to the last point in the current series.                                               |
| `Control` + `Home` | Moves to the first point in the chart.                                                       |
| `Control` + `End`  | Moves to the last point in the chart.                                                        |
| `Escape`           | Exits data mode and returns focus to the chart root.                                         |
| `?` or `F1`        | Announces the configured keyboard help text through `Announcer`.                             |

## Assistive technology validation

Automated tests cover the keyboard state machine, roving-focus DOM props, generated labels, and the
`onPointFocus` bridge across line, bar, pie, and multi-series charts. Before release, validate the
same flows manually with representative assistive technology:

- NVDA with Chrome
- JAWS with Chrome
- VoiceOver with Safari on macOS
- VoiceOver with Safari on iOS
- TalkBack with Chrome on Android
- Narrator with Edge

The manual pass should verify tabbing to the chart, entering and exiting data mode, arrow navigation
through points, up/down navigation across multi-series charts, tooltip announcements triggered from
`onPointFocus`, and fallback table navigation.

### Decorative chart chrome

`@visx/a11y` annotates the chart elements it receives through the hook. Consumers are responsible
for hiding decorative chart chrome from assistive technology. Grid lines, axis ticks, background
rects, clipping helpers, and other non-data elements should usually be rendered with
`aria-hidden="true"` so screen readers focus on the title, description, series, points, and data
table.

```tsx
<svg {...a11y.svgProps}>
  <rect aria-hidden="true" width={width} height={height} />
  <GridRows aria-hidden="true" scale={yScale} width={innerWidth} />
  <AxisBottom aria-hidden="true" scale={xScale} />
  <g {...a11y.getSeriesProps(0)}>{/* data marks */}</g>
</svg>
```
