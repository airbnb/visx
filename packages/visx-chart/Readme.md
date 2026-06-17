# @visx/chart

Chart-level React hooks and helpers for building primitive visx charts without adopting a chart
framework. The package starts with shared layout and domain helpers that registry-style charts can
use before composing `@visx/axis`, `@visx/scale`, `@visx/shape`, and other low-level primitives.

## Installation

```sh
npm install --save @visx/chart
```

## Motivation

visx charts are usually assembled from several packages: one package for scales, one for axes, one
for marks, one for interaction, and application code for the SVG frame around them. That composition
is the point, but every primitive chart still tends to rebuild the same chart-level setup:

- outer SVG dimensions
- margin defaults
- inner drawable width and height
- `xMax` and `yMax` aliases used throughout visx examples
- common numeric domains for primitive chart scales
- responsive width fallbacks while parent measurement initializes
- stable layout objects for downstream hooks and components

Those details are small, but they become repetitive in examples, dashboards, and registry items.
`@visx/chart` gives primitive charts one shared place for that chart-level setup while leaving scale
construction, rendering, interaction, animation, and state ownership in user code.

## Primitive-first design

The chart package is a convenience layer, not a chart framework.

- Hooks return ordinary values that can be passed to any visx primitive.
- The package does not render SVG elements or own a chart scene graph.
- Data accessors, scales, axes, marks, events, and animation remain explicit.
- Layout defaults are normalized, but callers can keep their own sizing system.
- You can use the chart hooks with one visx package, many visx packages, or custom SVG.

This keeps registry examples compact without hiding the pieces that make visx flexible. If a chart
needs a custom margin model, responsive container, canvas renderer, or no shared layout helper at
all, the primitive API still supports that.

## Basic usage

Use `useChartDimensions` to normalize an outer chart size and margin into the inner drawing area.

```tsx
import { Group } from '@visx/group';
import { useChartDimensions } from '@visx/chart';

const margin = { top: 16, right: 16, bottom: 32, left: 40 };

export function ChartFrame({ width, height, children }) {
  const dimensions = useChartDimensions({ width, height, margin });

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <Group left={dimensions.margin.left} top={dimensions.margin.top}>
        {children(dimensions)}
      </Group>
    </svg>
  );
}
```

The hook fills missing margin sides with `0`, treats non-finite dimensions as `0`, and clamps the
inner drawing area to `0` so marks never receive negative layout space.

## Numeric domains

Use the domain helpers when a primitive chart needs the usual safe defaults for empty, invalid, or
single-value data.

```tsx
import { getPositiveDomain, getZeroBaselineDomain } from '@visx/chart';

const yDomain = getZeroBaselineDomain(data.map((datum) => datum.value));
const stackedYDomain = getPositiveDomain(
  data.map((datum) => datum.desktop + datum.mobile + datum.tablet),
);
```

`getZeroBaselineDomain` includes zero and expands equal domains. `getPositiveDomain` returns a
positive `[0, max]` domain with an empty fallback of `[0, 1]`. `getPaddedDomain` is available for
plots such as scatter charts where the domain should wrap finite values with proportional padding.

## Axis ticks

Use the tick helpers when a chart axis may become too dense in responsive layouts.
`getVisibleTickValues` thins explicit category tick values while preserving the first and last tick
by default, and `getAxisTickCount` computes a conservative numeric tick count from the available
axis length.

```tsx
import { getAxisTickCount, getVisibleTickValues } from '@visx/chart';

const xTickValues = getVisibleTickValues(months, {
  axisLength: dimensions.innerWidth,
  minTickSpacing: 48,
});
const yNumTicks = getAxisTickCount({
  axisLength: dimensions.innerHeight,
  maxTicks: 5,
  minTickSpacing: 48,
});
```

The helpers only choose visible axis labels. They do not remove data points, bars, bins, or table
fallback rows.

## Responsive width fallback

Use `getResponsiveWidth` when a responsive container may report `0`, `NaN`, or another
non-renderable width while layout measurement initializes.

```tsx
import { getResponsiveWidth } from '@visx/chart';

const chartWidth = getResponsiveWidth(measuredWidth, 640);
```

The helper returns the measured width only when it is finite and greater than `0`; otherwise it
returns the fallback width.

## Chart config

Use `ChartConfig` when labels, colors, icons, and theme-specific tokens should live outside the
chart data. This mirrors the way registry charts are usually copied into app code: the data can come
from an API while chart presentation stays colocated with the component.

```tsx
import { getChartConfigColor, getChartConfigLabel, type ChartConfig } from '@visx/chart';

const chartConfig = {
  bookings: {
    label: 'Bookings',
    color: 'var(--chart-1)',
  },
  revenue: {
    label: 'Revenue',
    theme: {
      light: 'oklch(0.646 0.222 41.116)',
      dark: 'oklch(0.488 0.243 264.376)',
    },
  },
} satisfies ChartConfig;

const label = getChartConfigLabel(chartConfig, 'bookings');
const color = getChartConfigColor(chartConfig, 'bookings', 'currentColor');
```

`getChartCssVariables` can turn a config into `--color-*` CSS variables for chart shells that want
the same token style as copied registry components.

## Working with scales

`xMax` and `yMax` are aliases for `innerWidth` and `innerHeight`, matching the naming used in many
visx examples.

```tsx
import { useChartDimensions } from '@visx/chart';
import { useScale } from '@visx/scale/react';

export function useRevenueScales({ data, width, height }) {
  const dimensions = useChartDimensions({
    width,
    height,
    margin: { top: 16, right: 16, bottom: 32, left: 48 },
  });
  const maxRevenue = Math.max(0, ...data.map((datum) => datum.revenue));

  const xScale = useScale({
    type: 'band',
    domain: data.map((datum) => datum.month),
    range: [0, dimensions.xMax],
    padding: 0.2,
  });

  const yScale = useScale({
    type: 'linear',
    domain: [0, maxRevenue],
    range: [dimensions.yMax, 0],
    nice: true,
  });

  return { dimensions, xScale, yScale };
}
```

## Recipes

### Bar chart shell

```tsx
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { useChartDimensions } from '@visx/chart';
import { useScale } from '@visx/scale/react';

const margin = { top: 16, right: 16, bottom: 32, left: 48 };

export function RevenueBars({ data, width, height }) {
  const dimensions = useChartDimensions({ width, height, margin });
  const maxRevenue = Math.max(0, ...data.map((datum) => datum.revenue));
  const xScale = useScale({
    type: 'band',
    domain: data.map((datum) => datum.month),
    range: [0, dimensions.xMax],
    padding: 0.2,
  });
  const yScale = useScale({
    type: 'linear',
    domain: [0, maxRevenue],
    range: [dimensions.yMax, 0],
    nice: true,
  });

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <Group left={dimensions.margin.left} top={dimensions.margin.top}>
        {data.map((datum) => {
          const barX = xScale(datum.month) ?? 0;
          const barY = yScale(datum.revenue) ?? 0;

          return (
            <Bar
              key={datum.month}
              x={barX}
              y={barY}
              width={xScale.bandwidth()}
              height={dimensions.yMax - barY}
              fill="currentColor"
            />
          );
        })}
        <AxisBottom top={dimensions.yMax} scale={xScale} />
        <AxisLeft scale={yScale} />
      </Group>
    </svg>
  );
}
```

### Responsive dimensions

`useChartDimensions` does not measure the DOM. Pair it with your app's layout system or with
`@visx/responsive` when a chart should fill available space.

```tsx
import { getResponsiveWidth } from '@visx/chart';
import { ParentSize } from '@visx/responsive';

export function ResponsiveRevenueBars({ data }) {
  return (
    <ParentSize>
      {({ width }) => (
        <RevenueBars data={data} width={getResponsiveWidth(width, 640)} height={320} />
      )}
    </ParentSize>
  );
}
```
