# @visx/theme

Utilities for sharing visual tokens across visx charts without changing the low-level visx primitive
model. The package is split into an RSC-safe root entry for CSS scoping and a client entry for React
hooks.

## Installation

```sh
npm install --save @visx/theme
```

## Motivation

visx is intentionally low level: primitives take props, compose freely, and stay out of your app's
state model. That is what makes visx useful for unusual charts, custom dashboards, and product
interfaces that do not fit a fixed charting API.

The tradeoff is that every primitive chart tends to rebuild the same styling layer:

- categorical colors for each series
- axis strokes, tick labels, and grid lines
- text colors, font family, and chart surfaces
- light/dark color branches
- design-system token plumbing

That works for one chart. It gets noisy when a dashboard has many charts built from different visx
packages. Small differences creep in, dark mode becomes duplicated JavaScript, and teams end up
copying local helpers from chart to chart.

`@visx/theme` gives those charts a shared visual language while keeping the rendering primitives
plain. It does not make `@visx/axis`, `@visx/grid`, or `@visx/shape` theme-aware. Instead, it gives
you CSS-ready values and small prop helpers that you can pass to the primitives you already use.

## Primitive-first design

The theme package is a convenience layer, not a chart framework.

- visx primitives remain prop-driven.
- Theme hooks return ordinary strings, numbers, and prop objects.
- CSS owns resolved colors through custom properties.
- Explicit chart props and `ChartConfig.color` overrides always win.
- Apps own light/dark mode, class names, data attributes, and design-system providers.
- You can use one hook, the whole provider, or only `ThemeScope`.

This keeps shadcn/ui integration zero-config for common apps without making shadcn/ui a requirement
or a constraint. If a chart needs a custom palette, a per-series CSS variable, a hand-tuned axis, or
no theme integration at all, the primitive API still supports that.

## Basic usage

Use `ThemeScope` from the root entry when a server component or app layout only needs to provide the
chart CSS variable boundary.

```tsx
import { ThemeScope } from '@visx/theme';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeScope theme="auto" className="dashboard-charts">
      {children}
    </ThemeScope>
  );
}
```

Use `ThemeProvider` from the client entry when chart components need theme hooks.

```tsx
'use client';

import { ThemeProvider } from '@visx/theme/react';
import type { ReactNode } from 'react';

export function ChartShell({ children }: { children: ReactNode }) {
  return <ThemeProvider theme="auto">{children}</ThemeProvider>;
}
```

`theme="auto"` does not emit generated variables. It returns CSS-ready `var(...)` values, so the app
can own the current light or dark mode through classes, data attributes, media queries, or inline
CSS variables.

## shadcn/ui variables

The default auto theme reads the same chart variable names commonly used by shadcn/ui:

```css
.light {
  --chart-1: #2563eb;
  --chart-2: #16a34a;
  --background: #ffffff;
  --card: #ffffff;
  --border: #e5e7eb;
  --foreground: #0f172a;
  --muted-foreground: #64748b;
}

.dark {
  --chart-1: #60a5fa;
  --chart-2: #4ade80;
  --background: #020617;
  --card: #0f172a;
  --border: #334155;
  --foreground: #f8fafc;
  --muted-foreground: #94a3b8;
}
```

When the surrounding app flips `.light` to `.dark`, CSS variables update the chart colors.
`@visx/theme` does not install a mode switcher, call `matchMedia`, or read the DOM.

### Auto-mode limitation

CSS-backed tokens update through variables in auto mode:

- colors
- categorical colors
- background, surface, border, and text colors
- font family

JS-only numeric values cannot update from CSS alone:

- chart margins
- axis stroke width and tick length
- grid stroke width
- font sizes

Auto mode uses the light theme numeric defaults for those JS-only values. Pass an explicit theme
object from `defineTheme` when light and dark modes need different layout measurements.

## Migrating from `@visx/xychart`

Existing xychart code can keep using `XYChartTheme` directly. New primitive charts can reuse the
same visual choices with `fromXYChartTheme`.

```tsx
import { XYChart, buildChartTheme } from '@visx/xychart';
import { ThemeScope, fromXYChartTheme } from '@visx/theme';

const legacyTheme = buildChartTheme({
  backgroundColor: '#ffffff',
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  gridColor: '#f3f4f6',
  gridColorDark: '#e5e7eb',
  tickLength: 4,
});

const primitiveTheme = fromXYChartTheme(legacyTheme);

export function Dashboard() {
  return (
    <>
      <XYChart theme={legacyTheme}>{/* existing chart */}</XYChart>
      <ThemeScope theme={primitiveTheme}>{/* new primitive chart */}</ThemeScope>
    </>
  );
}
```

The adapter is one-way and structural. `@visx/theme` does not import from `@visx/xychart`, and there
is no `toXYChartTheme` adapter.

## Recipes

### Line chart

```tsx
import { AxisBottom } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { LinePath } from '@visx/shape';
import { useAxisStyle, useColor, useGridStyle } from '@visx/theme/react';

export function RevenueLine({ data, xScale, yScale }) {
  const axis = useAxisStyle('bottom');
  const grid = useGridStyle();
  const lineColor = useColor(0);

  return (
    <>
      <GridRows scale={yScale} stroke={grid.stroke} strokeWidth={grid.strokeWidth} />
      <LinePath
        data={data}
        x={(datum) => xScale(datum.date)}
        y={(datum) => yScale(datum.revenue)}
        stroke={lineColor}
        strokeWidth={2}
      />
      <AxisBottom
        scale={xScale}
        stroke={axis.stroke}
        tickLength={axis.tickLength}
        tickStroke={axis.tickStroke}
        tickLabelProps={axis.tickLabelProps}
      />
    </>
  );
}
```

### Bar chart

```tsx
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Bar } from '@visx/shape';
import type { ChartConfig } from '@visx/theme';
import { useAxisStyle, useChartConfig } from '@visx/theme/react';

const seriesConfig = {
  desktop: { label: 'Desktop' },
  mobile: { label: 'Mobile' },
} satisfies ChartConfig<'desktop' | 'mobile'>;

export function TrafficBars({ data, xScale, yScale }) {
  const xAxis = useAxisStyle('bottom');
  const yAxis = useAxisStyle('left');
  const { getColor, getLabel } = useChartConfig(seriesConfig, {
    order: ['desktop', 'mobile'],
  });

  return (
    <>
      {data.map((datum) => (
        <Bar
          key={datum.browser}
          x={xScale(datum.browser)}
          y={yScale(datum.desktop)}
          width={xScale.bandwidth()}
          height={yScale(0) - yScale(datum.desktop)}
          fill={getColor('desktop')}
          aria-label={`${getLabel('desktop')} traffic`}
        />
      ))}
      <AxisBottom scale={xScale} {...xAxis} />
      <AxisLeft scale={yScale} {...yAxis} />
    </>
  );
}
```

### Area chart

```tsx
import { AxisLeft } from '@visx/axis';
import { AreaClosed } from '@visx/shape';
import { useAxisStyle, useColor, useGridStyle } from '@visx/theme/react';

export function ConversionArea({ data, xScale, yScale }) {
  const axis = useAxisStyle('left');
  const grid = useGridStyle();
  const fill = useColor(1);
  const stroke = useColor('highlight');

  return (
    <>
      <AreaClosed
        data={data}
        x={(datum) => xScale(datum.date)}
        y={(datum) => yScale(datum.conversionRate)}
        yScale={yScale}
        fill={fill}
        fillOpacity={0.18}
        stroke={stroke}
        strokeWidth={2}
      />
      <line x1={0} x2="100%" y1={0} y2={0} stroke={grid.stroke} />
      <AxisLeft
        scale={yScale}
        stroke={axis.stroke}
        tickStroke={axis.tickStroke}
        tickLabelProps={axis.tickLabelProps}
      />
    </>
  );
}
```
