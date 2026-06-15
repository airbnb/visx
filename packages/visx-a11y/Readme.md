# @visx/a11y

Accessibility helpers for primitive visx charts.

`@visx/a11y` will provide spreadable chart semantics, data table fallbacks, live announcements, and
keyboard navigation helpers for charts built from low-level visx packages. The package follows the
same primitive-first model as the rest of visx: hooks and helpers own accessibility state and
generated semantics, while users keep control of their SVG render tree.

This package is being introduced for the visx chart registry work. The initial implementation will
focus on semantic SVG annotation, server-safe description and table generators, and React helpers
that registry items can compose without adopting a new chart component.

## Entry points

```tsx
import type { ChartA11yConfig } from '@visx/a11y';
import { ChartA11yDataTable, useChartA11y } from '@visx/a11y';
import { generateChartDescription, getChartAriaProps } from '@visx/a11y/server';
```

The root entry is reserved for React hooks and components. The `server` entry is reserved for pure
helpers that can run during server rendering.

## Semantic Hook

`useChartA11y` is the lowest-friction adoption path for client-rendered charts. It returns
spreadable SVG, series, and point props, a generated description, pre-bound data table and announcer
components, and an imperative `announce` helper.

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

The hook uses React `useId()` only when `id` is omitted. Server-safe helpers remain pure and derive
ids from explicit `id` / `idPrefix` inputs. `keyboardNavEnabled` is part of the hook API, but full
keyboard traversal is intentionally left to the dedicated keyboard-navigation follow-up.
