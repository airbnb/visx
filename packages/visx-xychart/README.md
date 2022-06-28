# @visx/xychart

<a title="@visx/xychart npm downloads" href="https://www.npmjs.com/package/@visx/xychart">
  <img src="https://img.shields.io/npm/dm/@visx/xychart.svg?style=flat-square" />
</a>

In contrast to other `visx` packages which are low-level, this package seeks to abstract some of the
complexity of common visualization engineering, and exposes a **high-level** x,y (cartesian
coordinate) chart API. However, it is implemented using modularized `React.context` layers for
theme, canvas dimensions, x/y/color scales, data, events, and tooltips which allows for more
expressivity and advanced use cases.

Out of the box it supports the following:

- \* many common `<*Series />` types (animated or not) such as lines, bars, etc.
- \* `<Axis />` (animated or not)
- \* `<Grid />` (animated or not)
- \* `<Annotation />` (animated or not)
- \* `<Tooltip />`
- \* `theme`ing

The following illustrates basic usage to create an animated line chart with a bottom `Axis`, `Grid`,
and `Tooltip`:

```tsx
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';

const data1 = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
];

const data2 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
];

const accessors = {
  xAccessor: d => d.x,
  yAccessor: d => d.y,
};

const render = () => (
  <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
    <AnimatedAxis orientation="bottom" />
    <AnimatedGrid columns={false} numTicks={4} />
    <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
    <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
    <Tooltip
      snapTooltipToDatumX
      snapTooltipToDatumY
      showVerticalCrosshair
      showSeriesGlyphs
      renderTooltip={({ tooltipData, colorScale }) => (
        <div>
          <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
            {tooltipData.nearestDatum.key}
          </div>
          {accessors.xAccessor(tooltipData.nearestDatum.datum)}
          {', '}
          {accessors.yAccessor(tooltipData.nearestDatum.datum)}
        </div>
      )}
    />
  </XYChart>
);
```

See sections below for more detailed guidance and advanced usage, or explore the comprehensive API
below.

<hr />

## Basic usage

<details>
  <summary>Installation</summary>

```
npm install --save @visx/xychart react-spring
```

Note: `react-spring` is a required `peerDependency` for importing `Animated*` components.

</details>

<details>
  <summary>Series types</summary>

The following `Series` types are currently supported and we are happy to review or consider
additional Series types in the future.

| Component name        | Description                                                                                      | Usage                                                |
| --------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| (Animated)AreaSeries  | Connect data points with a `<path />`, with a color fill to the zero baseline                    | `<AreaSeries />`                                     |
| (Animated)BarSeries   | Render a `<rect />` for each data point                                                          | `<BarSeries />`                                      |
| (Animated)BarGroup    | Group multiple child `<BarSeries />` values together                                             | `<BarGroup><BarSeries /><BarSeries />...</BarGroup>` |
| (Animated)BarStack    | Stack multiple child `<BarSeries />` values together                                             | `<BarStack><BarSeries /><BarSeries />...</BarStack>` |  |
| (Animated)GlyphSeries | Render a `Glyph` (any shape, defaults to `<circle />`) for each data point, e.g., a scatter plot | `<GlyphSeries renderGlyph={() => ...} />`            |
| (Animated)LineSeries  | Connect data points with a `<path>`                                                              | `<GlyphSeries />`                                    |

All `Series` have animated and non-animated variants to give you more control over your bundle size,
support missing (`null`) data, and can be rendered vertically or horizontally.

</details>

<details>
  <summary>Theming</summary>

Default `lightTheme` and `darkTheme` themes are exported from `@visx/xychart` and the utility
`buildChartTheme` is exported to support easy creation of custom themes.

```ts
import { buildChartTheme, XYChart } from '@visx/xychart';
import { TextProps as SVGTextProps } from '@visx/text/lib/Text'; // just for types

const customTheme = buildChartTheme({
  // colors
  backgroundColor: string; // used by Tooltip, Annotation
  colors: string[]; // categorical colors, mapped to series via `dataKey`s

  // labels
  svgLabelBig?: SVGTextProps;
  svgLabelSmall?: SVGTextProps;
  htmlLabel?: HTMLTextStyles;

  // lines
  xAxisLineStyles?: LineStyles;
  yAxisLineStyles?: LineStyles;
  xTickLineStyles?: LineStyles;
  yTickLineStyles?: LineStyles;
  tickLength: number;

  // grid
  gridColor: string;
  gridColorDark: string; // used for axis baseline if x/yxAxisLineStyles not set
  gridStyles?: CSSProperties;
});

() => <XYChart theme={customTheme} />
```

</details>

<details>
  <summary>Tooltips</summary>

`@visx/tooltip` `Tooltip`s are integrated into `@visx/xychart`, and should be rendered as a child of
`XYChart` (or a child where `TooltipContext` is provided).

**`Tooltip` positioning** is handled by the `Tooltip` itself, based on `TooltipContext`. `Tooltip`
is rendered inside a `Portal`, avoiding clipping by parent DOM elements with higher z-index
contexts. See the API below for a full list of `props` to support additional behavior, such as
snapping to data point positions and rendering cross-hairs.

**`Tooltip` content** is controlled by the specified `prop.renderTooltip` which has access to:

- `tooltipData.nearestDatum` – the globally closest `Datum`, **across all** `Series`'s `dataKey`s
- `tooltipData.datumByKey` – the closest `Datum` **for each** `Series`'s `dataKey`; this enables
  "shared tooltips" where you can render the nearest data point for each `Series`.
- a shared `colorScale` which maps `Series`'s `dataKey`s to `theme` colors

</details>

<details>
  <summary>Event handlers</summary>

The following `PointerEvent`s (handling both `MouseEvent`s and `TouchEvent`s) are currently
supported. They may be set on individual `Series` components (e.g.,
`<BarSeries onPointerMove={() => ...} />`), or at the chart level (e.g.,
`<XYChart onPointerMove={() => {}} />`) in which case they are invoked once for _every_ `*Series`.
To **disable** event emitting for any `Series` set `<*Series enableEvents=false />`. The
`onFocus/onBlur` handlers enable you to make your chart events and `Tooltip`s accessible via
keyboard interaction. Note that the current implementation requires your target browser to support
the `SVG 2.0` spec for `tabIndex` on `SVG` elements.

Below, `HandlerParms` has the following type signature:

```ts
type EventHandlerParams<Datum> = {
  datum: Datum; // nearest Datum to event, for Series with `dataKey=key`
  distanceX: number; // x distance between event and Datum, in px
  distanceY;: number; // y distance between event and Datum, in px
  event: React.PointerEvent | React.FocusEvent; // the event
  index: number; // index of Datum in Series `data` array
  key: string; // `dataKey` of Series to which `Datum` belongs
  svgPoint: { x: number; y: number }; // event position in svg-coordinates
};
```

| Prop name       | Signature                                     | `XYChart` support | `*Series` support |
| --------------- | --------------------------------------------- | ----------------- | ----------------- |
| `onPointerMove` | `(params: EventHandlerParams<Datum>) => void` | ✅                | ✅                |
| `onPointerOut`  | `(event: React.PointerEvent) => void`         | ✅                | ✅                |
| `onPointerUp`   | `(params: EventHandlerParams<Datum>) => void` | ✅                | ✅                |
| `onPointerDown` | `(params: EventHandlerParams<Datum>) => void` | ✅                | ✅                |
| `onFocus`       | `(params: EventHandlerParams<Datum>) => void` | ❌                | ✅                |
| `onBlur`        | `(event: React.TouchEvent) => void`           | ❌                | ✅                |

</details>

<details>
  <summary>Annotations</summary>

Composable `@visx/annotations` annotations are integrated into `@visx/xychart` and use its theme and
dimension context. These components allow for annotation of individual points using
`AnnotationCircleSubject`, or x- or y-thresholds using `AnnotationLineSubject`.

[CodeSandbox](https://codesandbox.io/s/annotations-8npmf?file=/Example.tsx)

```tsx
import React from 'react';
import {
  Annotation,
  AnnotationLabel,
  AnnotationConnector,
  AnnotationCircleSubject,
  Grid,
  LineSeries,
  XYChart,
} from '@visx/xychart';

const data = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
  { x: '2020-01-04', y: 5 },
];

const labelXOffset = -40;
const labelYOffset = -50;
const chartConfig = {
  xScale: { type: 'band' },
  yScale: { type: 'linear' },
  height: 300,
  margin: { top: 10, right: 10, bottom: 10, left: 10 },
};

export default () => (
  <XYChart {...chartConfig}>
    <Grid numTicks={3} />
    <LineSeries dataKey="line" data={data} xAccessor={d => d.x} yAccessor={d => d.y} />
    <Annotation
      dataKey="line" // use this Series's accessor functions, alternatively specify x/yAccessor here
      datum={data[2]}
      dx={labelXOffset}
      dy={labelYOffset}
    >
      {/** Text label */}
      <AnnotationLabel
        title="Title"
        subtitle="Subtitle deets"
        showAnchorLine={false}
        backgroundFill="rgba(0,150,150,0.1)"
      />
      {/** Draw circle around point */}
      <AnnotationCircleSubject />
      {/** Connect label to CircleSubject */}
      <AnnotationConnector />
    </AnimatedAnnotation>
  </XYChart>
);
```

</details>

<hr />

## Advanced usage

<details>
  <summary>Examples</summary>

`XYChart` is implemented using modularized `React.context` layers for scales, canvas dimensions,
data, events, and tooltips which enables more advanced usage than many other chart-level
abstractions.

By default `XYChart` renders all context providers if a given context is not available, but you can
share context across multiple `XYChart`s to implement functionality such as linked tooltips, shared
themes, or shared data.

- [`ThemeProvider` + custom theme chart background example](https://codesandbox.io/s/themeprovider-sbdvz?file=/Example.tsx)
- [`DataProvider/EventEmitterProvider` example of linked tooltips / small multiples](https://codesandbox.io/s/linked-tooltips-7s0jz?file=/Example.tsx)
- [`TooltipProvider` example of programmatic + keyboard tooltip triggering](https://codesandbox.io/s/programmatic-tooltips-hh7ly?file=/Example.tsx)

</details>

<details>
  <summary>DataContext</summary>

This context provides chart canvas dimensions (`width`, `height`, and `margin`), x/y/color scales,
and a data registry. The data registry includes data from all child `*Series`, and x/y/color scales
are updated accordingly accounting for canvas dimensions.

</details>

<details>
  <summary>ThemeContext</summary>

This context provides an `XYChart` theme, its used by all visual elements that compose a chart, and
can be used to render custom visual elements that are on theme.

</details>

<details>
  <summary>EventEmitterContext</summary>

This context provides an event publishing / subscription object which can be used via the
`useEventEmitter` hook. `Series` and `XYChart` events, including tooltip updates, are emitted and
handled with through this context.

[CodeSandbox](https://codesandbox.io/s/eventemitterprovider-w8jhl?file=/Example.tsx)

```tsx
import React, { useState } from 'react';
import { useEventEmitter, EventEmitterProvider } from '@visx/xychart';

const eventSourceId = 'optional-source-id-filter';

const EmitEvent = () => {
  const emit = useEventEmitter();
  return <button onPointerUp={event => emit('pointerup', event, eventSourceId)}>emit event</button>;
};

const SubscribeToEvent = () => {
  const [clickCount, setClickCount] = useState(0);
  const allowedEventSources = [eventSourceId];
  useEventEmitter('pointerup', () => setClickCount(clickCount + 1), allowedEventSources);

  return <div>Emitted {clickCount} events</div>;
};

export default function Example() {
  return (
    <EventEmitterProvider>
      <EmitEvent />
      <SubscribeToEvent />
    </EventEmitterProvider>
  );
}
```

</details>

<details>
  <summary>TooltipContext</summary>

This context provides access to `@visx/tooltip`s `useTooltip` state, including whether the tooltip
is visible (`tooltipOpen`), tooltlip position (`tooltipLeft`, `tooltipTop`),
`tooltipData: { nearestDatum, datumByKey }` described above, and functions to update context
(`hideTooltip`, `showTooltip`, and `updateTooltip`).

</details>

<hr />

##### ⚠️ `ResizeObserver` dependency

The `Tooltip` and `AnnotationLabel` components rely on
[`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)s. If your
browswer target needs a polyfill, you can either polute the `window` object or inject it cleanly
using the `resizeObserverPolyfill` prop for these components.

<details>
  <summary>Examples</summary>

❌ `Error: This browser does not support ResizeObserver out of the box`

```tsx
// no polyfill, no browser support
() => <XYChart {...}><Tooltip /></XYChart>
```

✅ No errors

```tsx
// no polyfill, target browser supports ResizeObserver
() => <XYChart {...}><Tooltip /></XYChart>

// import the polyfill in the needed module, or set it on `window` object
import ResizeObserver from 'resize-observer-polyfill';
() => <XYChart {...}><Tooltip /></XYChart> // 😎

// cleanly pass polyfill to component that needs it
import ResizeObserver from 'resize-observer-polyfill';
() => (
  <XYChart {...}>
    <Tooltip resizeObserverPolyfill={ResizeObserver} />
  </XYChart>
)
```

  </details>

<hr />
