# @visx/tooltip

<a title="@visx/tooltip npm downloads" href="https://www.npmjs.com/package/@visx/tooltip">
  <img src="https://img.shields.io/npm/dm/@visx/tooltip.svg?style=flat-square" />
</a>

The `@visx/tooltip` package provides utilities for making it easy to add `Tooltip`s to a
visualization and includes hooks, higher-order component (HOC) enhancers, and Tooltip components.

### Installation

```
npm install --save @visx/tooltip
```

### Modern Floating UI tooltips

`@visx/tooltip` also includes an additive Floating UI-backed surface for modern tooltip positioning.
Import it from the explicit React subpath:

```tsx
import {
  ChartTooltip,
  ChartTooltipContent,
  FloatingTooltip,
  useChartTooltip,
  useFloatingTooltip,
} from '@visx/tooltip/floating';
```

Existing `@visx/tooltip` exports are unchanged. Use the modern subpath when a chart needs
collision-aware placement, virtual anchors, SVG or cursor anchoring, arrows, controlled state, or
config-driven chart tooltip content.

#### Manual chart tooltip

`useChartTooltip()` owns tooltip open state, anchor state, and rendered items. Your chart still owns
nearest-datum lookup and event handling.

```tsx
import { localPoint } from '@visx/event';
import { ChartTooltip, type ChartTooltipConfig, useChartTooltip } from '@visx/tooltip/floating';

type Datum = { month: string; revenue: number };

const tooltipConfig = {
  revenue: {
    label: 'Revenue',
    color: '#3b82f6',
    formatValue: (value) => `$${Number(value).toLocaleString()}`,
  },
} satisfies ChartTooltipConfig<Datum>;

function RevenueChart({ data, width, height }: { data: Datum[]; width: number; height: number }) {
  const tooltip = useChartTooltip<Datum>({ placement: 'top', offset: 10 });

  return (
    <>
      <svg
        ref={tooltip.containerRef}
        width={width}
        height={height}
        onPointerMove={(event) => {
          const point = localPoint(event.currentTarget, event);
          if (!point) return;

          const datum = findNearestDatum(point, data);

          tooltip.show({
            anchor: point,
            items: [
              {
                key: 'revenue',
                datum,
                label: datum.month,
                rawValue: datum.revenue,
              },
            ],
          });
        }}
        onPointerLeave={tooltip.hide}
      >
        {data.map((datum) => (
          <circle key={datum.month} cx={xScale(datum.month)} cy={yScale(datum.revenue)} r={4} />
        ))}
      </svg>

      <ChartTooltip {...tooltip.tooltipProps} config={tooltipConfig} />
    </>
  );
}
```

When `tooltip.show()` receives `{ x, y }`, the coordinates are treated as CSS pixels local to the
element registered with `containerRef`. If you have SVG user-space coordinates from scales or glyph
positions, pass a shorthand SVG point instead:

```tsx
tooltip.show({
  anchor: { type: 'svg-local-point', x: xScale(datum.month), y: yScale(datum.revenue) },
  items: [{ key: 'revenue', datum, rawValue: datum.revenue }],
});
```

#### Low-level primitives

Use `FloatingTooltip` directly when you want complete control over positioning and content.

```tsx
<FloatingTooltip.Root
  open={open}
  anchor={{ type: 'point', x: event.clientX, y: event.clientY }}
  placement="right"
  offset={12}
  arrow
>
  <FloatingTooltip.Portal>
    <FloatingTooltip.Positioner className="Tooltip">
      <FloatingTooltip.Content>
        <FloatingTooltip.Arrow />
        {children}
      </FloatingTooltip.Content>
    </FloatingTooltip.Positioner>
  </FloatingTooltip.Portal>
</FloatingTooltip.Root>
```

#### DOM trigger tooltip

`FloatingTooltip.Trigger` is optional. When rendered, it wires hover, focus, dismiss, and tooltip
ARIA props through Floating UI. If `Root` also receives an explicit `anchor`, the trigger owns DOM
interactions while the anchor owns positioning.

```tsx
<FloatingTooltip.Provider delay={700} skipDelay={300}>
  <FloatingTooltip.Root>
    <FloatingTooltip.Trigger render={<button type="button">Export</button>} />
    <FloatingTooltip.Portal>
      <FloatingTooltip.Positioner>
        <FloatingTooltip.Content>Download chart data</FloatingTooltip.Content>
      </FloatingTooltip.Positioner>
    </FloatingTooltip.Portal>
  </FloatingTooltip.Root>
</FloatingTooltip.Provider>
```

Tooltip content should be brief and non-interactive. If content includes links, buttons, form
controls, or rich navigation, use a popover-style primitive instead of tooltip behavior.

### Hooks and Enhancers

This package provides two ways to add tooltip **state** logic to your chart components:

- a hook: `useTooltip()`
- a higher order component (HOC): `withTooltip()`

The `useTooltip` hook is the recommended way to add tooltip state logic to your components, but can
only be used in functional components. The `withTooltip` HOC can be used with both functional and
class components, and is the recommended way to add tooltip state logic to class components.

Both `useTooltip` and `withTooltip` expose the same values and functions for use in your component:

| Name          | Type   | Description                                                                                                                                           |
| :------------ | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| showTooltip   | func   | Call this function with the signature `func({ tooltipData, tooltipLeft, tooltipTop })` to set the tooltip state to the specified values.              |
| hideTooltip   | func   | Call this function to close a tooltip, i.e., set the `showTooltip` state to `false`.                                                                  |
| tooltipOpen   | bool   | Whether the tooltip state is open or closed                                                                                                           |
| tooltipLeft   | number | The `tooltipLeft` position passed to the `showTooltip` func, intended to be used for tooltip positioning                                              |
| tooltipTop    | number | The `tooltipTop` position passed to the `showTooltip` func, intended to be used for tooltip positioning                                               |
| tooltipData   | any    | The `tooltipData` value passed to the `showTooltip` func, intended to be used for any data that your tooltip might need to render                     |
| updateTooltip | func   | Call this function with the signature `func({ tooltipOpen, tooltipLeft, tooltipTop, tooltipData })` to set the tooltip state to the specified values. |

In the case of `useTooltip`, these will be returned from the `useTooltip()` call in your component.
In the case of `withTooltip`, they will be passed as props to your wrapped component. Refer to the
[Examples](#examples) section for a basic demo of each approach.

#### useTooltip()

If you would like to add tooltip state logic to a functional component, you may use the
`useTooltip()` hook which will return an object with several properties that you can use to manage
the tooltip state of your component. **For correct tooltip positioning, it is important to wrap your
component in an element (e.g., `div`) with `relative` positioning**. This is handled for you by the
`withTooltip` HOC, but not with the `useTooltip()` hook.

#### withTooltip(BaseComponent [, containerProps [, renderContainer]])

If you would like to add tooltip state logic to a class component, you may wrap it in
`withTooltip(BaseComponent [, containerProps [, renderContainer])`.

The HOC will wrap your component in a `div` with `relative` positioning by default and handle state
for tooltip positioning, visibility, and content by injecting the following props into your
`BaseComponent`:

You may override the container by specifying `containerProps` as the second argument to
`withTooltip`, or by specifying `renderContainer` as the third argument to `withTooltip`.

### Components

Tooltip **components** render tooltip **state** and can be used in conjunction with `useTooltip` and
`withTooltip` above.

> Note: Because Tooltip and TooltipWithBounds components are rendered within `<div>` elements, they
> **cannot** be inserted within any VisX charts (`<svg>` elements). Instead, place them anywhere
> outside of your rendered charts.

#### Tooltip

This is a simple Tooltip container component meant to be used to actually render a Tooltip. It
accepts the following props, and will spread any additional props on the tooltip container div
(i.e., ...restProps):

| Name      | Type             | Default | Description                                                                   |
| :-------- | :--------------- | :------ | :---------------------------------------------------------------------------- |
| left      | number or string | --      | Sets style.left of the tooltip container                                      |
| top       | number or string | --      | Sets style.top of the tooltip container                                       |
| className | string           | --      | Adds a class (in addition to `visx-tooltip-portal`) to the tooltip container  |
| style     | object           | --      | Sets / overrides any styles on the tooltip container (including top and left) |
| children  | node             | --      | Sets the children of the tooltip, i.e., the actual content                    |
| unstyled  | bool             | true    | Whether the tooltip should use styles from the style prop or not              |

#### TooltipWithBounds

This tooltip component is exactly the same as `Tooltip` above, but it is aware of its boundaries
meaning that it will flip left/right and bottom/top based on whether it would overflow its parent's
boundaries. It accepts the following props, and will spread any additional props on the Tooltip
component (i.e., ...restProps):

| Name       | Type   | Default | Description                                                                                                                                                                      |
| :--------- | :----- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| left       | number | --      | The horizontal position of the cursor, tooltip will be place to the left or right of this coordinate depending on the width of the tooltip and the size of the parent container. |
| top        | number | --      | The vertical position of the cursor, tooltip will be place to the bottom or top of this coordinate depending on the height of the tooltip and the size of the parent container.  |
| offsetLeft | number | 10      | Horizontal offset of the tooltip from the passed `left` value, functions as a horizontal padding.                                                                                |
| offsetTop  | number | 10      | Vertical offset of the tooltip from the passed `top` value, functions as a vertical padding.                                                                                     |
| style      | object | --      | Sets / overrides any styles on the tooltip container (including top and left)                                                                                                    |
| children   | node   | --      | Sets the children of the tooltip, i.e., the actual content                                                                                                                       |
| unstyled   | bool   | true    | Whether the tooltip should use styles from the style prop or not                                                                                                                 |

Note that this component is positioned using a `transform`, so overriding `left` and `top` via
styles may have no effect.

#### useTooltipInPortal

##### ⚠️ `ResizeObserver` dependency

This hook relies on `ResizeObserver`s. If you need a polyfill, you can either polute the `window`
object or inject it cleanly using the `polyfill` config option below.

`useTooltipInPortal` is a hook which gives you a `TooltipInPortal` component for rendering `Tooltip`
or `TooltipWithBounds` in a `Portal`, outside of your component DOM tree which can be useful in many
circumstances (see below for more on `Portal`s).

##### API

```ts

type Options = {
  /** whether TooltipWithBounds should be used to auto-detect (page) boundaries and reposition itself. */
  detectBounds?: boolean;
  /** Debounce resize or scroll events in milliseconds (needed for positioning) **/
  debounce?: number | { scroll: number; resize: number }
  /** React to nested scroll changes, don't use this if you know your view is static */
  scroll?: boolean
  /** You can optionally inject a resize-observer polyfill */
  polyfill?: { new (cb: ResizeObserverCallback): ResizeObserver }
  /** Optional z-index to set on the Portal div */
  zIndex?: number | string;
}

useTooltipInPortal(
  options: Options = { debounce: 0, scroll: true, detectBounds: true }
): {
  /** Set `ref={containerRef}` on the element corresponding to the coordinate system that `left/top` (passed to `TooltipInPortal`) are relative to. */
  containerRef: React.MutableRefObject<HTMLElement | SVGElement>;
  /** Access to the container's bounding box if useful to you. This will be empty on first render. */
  containterBounds: RectReadOnly;
  /** React.FunctionComponent<TooltipProps> with the same API as Tooltip, which will be rendered in a Portal. */
  TooltipInPortal ({ top: containerTop, left: containerLeft, ...tooltipProps }: TooltipProps) => ReactNode;


interface RectReadOnly {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number
}

```

#### Portal

`Portal` is a component which simply renders its children inside a `div` element appended to
`document.body` created by `ReactDOM`. A `Portal` can be an effective strategy for solving the
[`z-index` stacking context problem](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
for `Tooltip`s.

For example, if your chart is rendered inside a stacking context with a lower `z-index` than a
surrounding container, it may get clipped by that container even if you specify a higher `z-index`.
This is solvable with a `Portal` because the separate container will not be subject to the stacking
context of your chart.

To use a `Portal`, simply pass your `Tooltip` as a child: `<Portal><Tooltip {...} /></Portal>`. You
will also need to correct the `left` and `top` positions to be in _page coordinates_, not the
coordinates of your container which you would use when _not_ using a `Portal`. If reacting to a
mouse event, you can use `event.pageX/Y`. Alternatively, if you have container coordinates, you can
convert them to page coordinates using the following (note: `useTooltipInPortal` handles this for
you):

```js
const pageX = containerX + containerBoundingBox.left + window.scrollLeft;
const pageY = containerY + containerBoundingBox.top + window.scrollTop;
```

### Examples

#### useTooltip and useTooltipInPortal For Functional Components

```jsx
import { useTooltip, useTooltipInPortal, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

const ChartWithTooltip = () => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  // If you don't want to use a Portal, simply replace `TooltipInPortal` below with
  // `Tooltip` or `TooltipWithBounds` and remove `containerRef`
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  })

  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  };

  return (
    // Set `ref={containerRef}` on the element corresponding to the coordinate system that
    // `left/top` (passed to `TooltipInPortal`) are relative to.
    <>
      <svg ref={containerRef} width={...} height={...}>
        // Chart here...
        <SomeChartElement
          onMouseOver={handleMouseOver}
          onMouseOut={hideTooltip}
        />
      </svg>

      {tooltipOpen && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          Data value <strong>{tooltipData}</strong>
        </TooltipInPortal>
      )}
    </>
  )
};

render(<ChartWithTooltip />, document.getElementById("root"));
```

#### withTooltip For Class Components

```js
import { withTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

class Chart extends React.Component {
  handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    this.props.showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  };

  render() {
    const {
      tooltipData,
      tooltipLeft,
      tooltipTop,
      tooltipOpen,
      hideTooltip
    } = this.props;

    return (
      // note React.Fragment is only available in >= react@16.2
      <React.Fragment>
        <svg width={...} height={...}>
          // Chart here...
          <SomeChartElement onMouseOver={this.handleMouseOver} onMouseOut={hideTooltip} />
        </svg>

        {tooltipOpen && (
          <TooltipWithBounds
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            Data value <strong>{tooltipData}</strong>
          </TooltipWithBounds>
        )}
      </React.Fragment>
    );
  }
}

const ChartWithTooltip = withTooltip(Chart);

render(<ChartWithTooltip />, document.getElementById("root"));
```

Example codesandbox [here](https://codesandbox.io/s/kw02m019mr).
