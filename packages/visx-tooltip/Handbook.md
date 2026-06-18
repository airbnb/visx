# @visx/tooltip/floating API Patterns Handbook

## Import Surface

Use the additive floating subpath:

```tsx
import {
  ChartTooltip,
  ChartTooltipContent,
  FloatingTooltip,
  useChartTooltip,
  useFloatingTooltip,
} from '@visx/tooltip/floating';
```

The package exports `./floating` in `packages/visx-tooltip/package.json`. The floating entrypoint
starts with `'use client'`, so these APIs are React client APIs.

The existing root `@visx/tooltip` API is separate. Do not import these new floating APIs from the
root package unless a future change explicitly exports them there.

## Which Layer To Use

Use `useChartTooltip` plus `ChartTooltip` for most chart tooltips. This is the most convenient
layer: the hook owns open state, current anchor, current items, hide delay, and the props needed by
`ChartTooltip`.

Use `ChartTooltipContent` when you only want the config-driven content renderer and you already have
positioning handled elsewhere.

Use `FloatingTooltip` primitives when you want full positioning composition: root, trigger, portal,
positioner, content, and arrow.

Use `useFloatingTooltip` directly when you want the low-level hook state, Floating UI refs,
`getReferenceProps`, and `getFloatingProps`.

## Simplest Discrete Datum Pattern

For bars, points, glyphs, or any mark with a DOM/SVG element, anchor to the element. This avoids
coordinate math.

```tsx
import {
  ChartTooltip,
  useChartTooltip,
  type ChartTooltipConfig,
  type ChartTooltipItem,
} from '@visx/tooltip/floating';

type Datum = {
  color: string;
  month: string;
  revenue: number;
};

const config = {
  revenue: {
    label: 'Revenue',
    color: (item) => item.datum?.color,
    formatValue: (value) => `$${Number(value)}k`,
  },
} satisfies ChartTooltipConfig<Datum>;

function RevenueBars({ datum }: { datum: Datum }) {
  const tooltip = useChartTooltip<Datum>({ placement: 'top', offset: 12 });

  const items: ChartTooltipItem<Datum>[] = [
    {
      key: 'revenue',
      label: 'Revenue',
      rawValue: datum.revenue,
      datum,
      color: datum.color,
    },
  ];

  return (
    <>
      <svg ref={tooltip.containerRef} onPointerLeave={tooltip.hide}>
        <rect
          tabIndex={0}
          onBlur={tooltip.hide}
          onFocus={(event) =>
            tooltip.show({
              anchor: { type: 'element', element: event.currentTarget },
              items,
            })
          }
          onPointerEnter={(event) =>
            tooltip.show({
              anchor: { type: 'element', element: event.currentTarget },
              items,
            })
          }
        />
      </svg>

      <ChartTooltip
        {...tooltip.tooltipProps}
        label={tooltip.items[0]?.datum?.month}
        config={config}
      />
    </>
  );
}
```

What is happening:

- `tooltip.show()` opens the tooltip and sets both anchor and items.
- `anchor: { type: 'element', element }` is a public `TooltipAnchor`.
- `tooltip.tooltipProps` contains the controlled props that `ChartTooltip` needs: `open`, `anchor`,
  `items`, plus `floatingOptions`, `offset`, and `placement`.
- `ChartTooltip` renders in a portal by default.

## `useChartTooltip`

`useChartTooltip<Datum>()` is the chart convenience hook.

Options:

```ts
type UseChartTooltipOptions<Datum> = {
  defaultOpen?: boolean;
  defaultItems?: ChartTooltipItem<Datum>[];
  defaultAnchor?: TooltipAnchor | null;
  placement?: TooltipPlacement;
  offset?: number | FloatingTooltipOffset;
  hideDelay?: number;
  container?: Element | null;
  floatingOptions?: Omit<
    UseFloatingTooltipOptions<ChartTooltipItem<Datum>[]>,
    'open' | 'defaultOpen' | 'data' | 'defaultData' | 'anchor' | 'defaultAnchor'
  >;
};
```

Return shape:

```ts
type UseChartTooltipReturn<Datum> = {
  open: boolean;
  items: ChartTooltipItem<Datum>[];
  anchor: TooltipAnchor | null;
  containerRef: React.RefCallback<HTMLElement | SVGElement>;
  show: (args: {
    anchor:
      | TooltipAnchor
      | { x: number; y: number }
      | { type: 'svg-local-point'; x: number; y: number };
    items: ChartTooltipItem<Datum>[];
  }) => void;
  hide: () => void;
  update: (args: Partial<{ anchor: TooltipAnchor; items: ChartTooltipItem<Datum>[] }>) => void;
  tooltipProps: ChartTooltipControlledProps<Datum> &
    Pick<ChartTooltipProps<Datum>, 'floatingOptions' | 'offset' | 'placement'>;
};
```

Important behavior:

- `show()` clears any pending hide delay, resolves the anchor, stores the new items, and opens.
- `hide()` closes immediately unless `hideDelay` is set.
- `hideDelay` schedules a delayed close; calling `show()` again cancels that pending close.
- `update()` can replace `items` and/or a full `TooltipAnchor`; it does not accept the `{ x, y }` or
  shorthand SVG point forms.
- `floatingOptions` intentionally cannot control `open`, `data`, or `anchor`; those are owned by the
  chart convenience hook.

## Anchor Patterns

`TooltipAnchor` supports six explicit anchor variants.

### Element Anchor

Use this for bars, dots, buttons, legends, or any element you can place against directly.

```tsx
tooltip.show({
  anchor: { type: 'element', element: event.currentTarget },
  items,
});
```

If `element` is `null`, the anchor resolves to `null`.

### Local Container Point

With `useChartTooltip.show()`, a bare `{ x, y }` is shorthand for a CSS-pixel point local to the
latest `containerRef` element, or to the explicit `container` option.

```tsx
<svg
  ref={tooltip.containerRef}
  onPointerMove={(event) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    tooltip.show({
      anchor: {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      },
      items,
    });
  }}
/>
```

The resolved anchor is:

```ts
{
  type: 'container-point',
  x,
  y,
  container,
}
```

If the container is missing, that anchor cannot resolve to a Floating UI reference.

### SVG User-Space Point

Use this when your anchor coordinates are SVG user-space coordinates from scales or glyph positions.

```tsx
tooltip.show({
  anchor: { type: 'svg-local-point', x: 40, y: 20 },
  items,
});
```

The `useChartTooltip` shorthand uses `type: 'svg-local-point'` and fills in the SVG element from
`containerRef` when the latest container is an SVG element. The full `TooltipAnchor` form is:

```ts
{
  type: 'svg-point',
  x: 40,
  y: 20,
  svg,
}
```

Source behavior:

- If `createSVGPoint()` and `getScreenCTM()` are available, the point is transformed through the
  screen CTM.
- Otherwise, it falls back to the SVG element bounding rect plus `x` and `y`.
- If `svg` is `null`, the anchor resolves to `null`.

### Client Or Page Point

Use this for viewport or page coordinates.

```ts
const clientPoint = { type: 'point', x: event.clientX, y: event.clientY };
const pagePoint = { type: 'point', x: event.pageX, y: event.pageY, coordinateSpace: 'page' };
```

`coordinateSpace` can be `'client'` or `'page'`. Page coordinates are converted to client
coordinates by subtracting window scroll.

### Rect Anchor

Use this when you want to provide a lazily read rectangle.

```ts
const anchor = {
  type: 'rect',
  getRect: () => new DOMRect(120, 80, 0, 0),
  contextElement: document.body,
} satisfies TooltipAnchor;
```

### Virtual Anchor

Use this when you already have a Floating UI-compatible virtual element.

```ts
const anchor = {
  type: 'virtual',
  element: {
    getBoundingClientRect: () => new DOMRect(120, 80, 0, 0),
    contextElement: document.body,
  },
} satisfies TooltipAnchor;
```

## `ChartTooltipItem` And `ChartTooltipConfig`

Each chart tooltip row is a `ChartTooltipItem`.

```ts
type ChartTooltipItem<Datum = unknown> = {
  key: string;
  datum?: Datum;
  index?: number;
  label?: React.ReactNode;
  value?: React.ReactNode;
  rawValue?: unknown;
  color?: string;
  x?: number;
  y?: number;
  distance?: number;
  hidden?: boolean;
  payload?: unknown;
};
```

`key` is required. The default rendered row uses the item key for config lookup and data attributes.

`ChartTooltipConfig` is a record keyed by item key:

```ts
type ChartTooltipConfig<Datum = unknown> = Record<
  string,
  {
    label?: React.ReactNode | ((item: ChartTooltipItem<Datum>) => React.ReactNode);
    color?: string | ((item: ChartTooltipItem<Datum>) => string | undefined);
    icon?: React.ComponentType<{ item: ChartTooltipItem<Datum> }>;
    formatValue?: (value: unknown, item: ChartTooltipItem<Datum>) => React.ReactNode;
    formatLabel?: (item: ChartTooltipItem<Datum>) => React.ReactNode;
    hide?: boolean;
    order?: number;
  }
>;
```

Content precedence in the current implementation:

- Label: `config[key].formatLabel(item)` first, then `config[key].label`, then `item.label`, then
  `item.key`.
- Value: `config[key].formatValue(value, item)` first, then `item.value`, then
  `String(item.rawValue)`, then `''`.
- The value passed to `formatValue` is `item.rawValue` when it is not `undefined`; otherwise it is
  `item.value`.
- Color: `config[key].color` first, then `item.color`.
- Visibility: `item.hidden` and `config[key].hide` both remove an item.
- Order: config `order` first, then `sortItems`, then original input order.

## `ChartTooltip`

`ChartTooltip` composes `FloatingTooltip.Root`, `FloatingTooltip.Positioner`,
`FloatingTooltip.Content`, and `FloatingTooltip.Portal`.

Required controlled props:

```ts
type ChartTooltipControlledProps<Datum> = {
  open: boolean;
  anchor: TooltipAnchor | null;
  items: ChartTooltipItem<Datum>[];
};
```

Optional props:

- `config`
- `label`
- `placement` default: `'top'`
- `strategy`
- `offset` default: `8`
- `collisionPadding`
- `portal` default: `true`
- `portalProps`
- `positionerProps`
- `contentProps`
- `floatingOptions`
- `renderContent`

`floatingOptions` cannot include `open`, `defaultOpen`, `data`, `defaultData`, `anchor`, or
`defaultAnchor`. Pass those as explicit `ChartTooltip` props.

Explicit `ChartTooltip` props win over overlapping fields inside `floatingOptions`. This is
implemented by spreading `floatingOptions` first and then passing explicit `open`, `anchor`, `data`,
`placement`, `strategy`, `offset`, and `collisionPadding` to `FloatingTooltip.Root`.

Disable the portal when you need inline rendering:

```tsx
<ChartTooltip open={open} anchor={anchor} items={items} config={config} portal={false} />
```

Render custom content while keeping `ChartTooltip` positioning:

```tsx
<ChartTooltip
  open={open}
  anchor={anchor}
  items={items}
  renderContent={({ items, state }) => <div data-side={state.side}>Rows: {items.length}</div>}
/>
```

## `ChartTooltipContent`

Use this when you want the default config-driven rows without the positioning layer.

```tsx
<ChartTooltipContent
  label="Apr"
  items={items}
  config={config}
  indicator="square"
  renderValue={({ value }) => <strong>{value}</strong>}
/>
```

Props:

- `label`
- `items`
- `config`
- `indicator`: `'dot' | 'line' | 'dashed' | 'square' | 'none'`; default is `'dot'`
- `hideLabel`
- `hideIndicator`
- `sortItems`
- `renderLabel`
- `renderItem`
- `renderValue`
- `getItemKey`
- `data-testid`; default is `'chart-tooltip-content'`
- standard `div` attributes

Default data attributes:

- `data-visx-chart-tooltip`
- `data-visx-chart-tooltip-label`
- `data-visx-chart-tooltip-items`
- `data-visx-chart-tooltip-item`
- `data-visx-chart-tooltip-indicator`
- `data-visx-chart-tooltip-item-label`
- `data-visx-chart-tooltip-item-value`
- `data-item-key`

The default row sets the CSS custom property `--visx-tooltip-item-color` when a color is available.

If no visible items remain, `ChartTooltipContent` returns `null`.

## Low-Level `FloatingTooltip` Primitives

Use the primitive layer when you want full manual composition.

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

Primitive parts:

- `FloatingTooltip.Provider`
- `FloatingTooltip.Root`
- `FloatingTooltip.Trigger`
- `FloatingTooltip.Portal`
- `FloatingTooltip.Positioner`
- `FloatingTooltip.Content`
- `FloatingTooltip.Arrow`

### Provider

`Provider` wraps Floating UI's delay group.

Props:

- `delay`; default `600`
- `closeDelay`; default `0`
- `skipDelay`; default `400`
- `children`

When `delay` is a number, it maps to `{ open: delay, close: closeDelay }`. When `delay` is an
object, `open` defaults to `600` and `close` defaults to `closeDelay`.

### Root

`Root` accepts `UseFloatingTooltipOptions<TData>` plus:

- `forceMount?: boolean`
- `children: React.ReactNode | ((state) => React.ReactNode)`

Closed content is unmounted by default. With `forceMount`, `state.mounted` stays true while
`state.open` can still be false.

### Trigger

`Trigger` is optional. It wires Floating UI reference props for hover, focus, dismiss, and tooltip
role behavior when interactions are enabled by `Root`.

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

`Trigger` render forms:

```tsx
<FloatingTooltip.Trigger render={<button type="button">Export</button>} />

<FloatingTooltip.Trigger
  render={(props, state) => (
    <button {...props} type="button" data-open={state.open}>
      Export
    </button>
  )}
/>
```

If `Root` has no explicit `anchor`, the trigger becomes the positioning reference. If `Root` has an
explicit `anchor`, the trigger still owns interactions while the explicit anchor owns positioning.

`Trigger disabled` sets `aria-disabled`, adds `data-disabled`, and does not wire hover or focus
interaction handlers for that trigger. To disable the whole tooltip state machine, use
`Root disabled`.

### Portal

`Portal` renders through Floating UI's portal by default.

Props:

- `container?: HTMLElement | ShadowRoot | React.RefObject<HTMLElement | ShadowRoot | null> | null`
- `disabled?: boolean`
- `children`

Use `disabled` for inline rendering.

### Positioner

`Positioner` owns Floating UI positioning props and styles.

It renders nothing when `state.mounted` is false.

It sets:

- `data-visx-tooltip`
- `data-state`
- `data-side`
- `data-align`
- `data-anchor-hidden` when hide middleware reports `referenceHidden`
- `--visx-tooltip-transform-origin`
- `--visx-tooltip-arrow-x`
- `--visx-tooltip-arrow-y`

`render` can replace the default `div`:

```tsx
<FloatingTooltip.Positioner
  render={(props, state) => (
    <section {...props} data-side-from-state={state.side}>
      {props.children}
    </section>
  )}
>
  <FloatingTooltip.Content>Tooltip</FloatingTooltip.Content>
</FloatingTooltip.Positioner>
```

### Content

`Content` renders a `div` by default and sets:

- `data-visx-tooltip-content`
- `data-state`

`Content` does not assign a default `role`. Floating UI role props are applied through `Positioner`.
An explicit `Content role` prop is forwarded.

`render` can replace the default element.

### Arrow

Use `Root arrow` to include arrow middleware, and render `FloatingTooltip.Arrow` inside content.

```tsx
<FloatingTooltip.Root open anchor={anchor} arrow>
  <FloatingTooltip.Positioner>
    <FloatingTooltip.Content>
      Tooltip
      <FloatingTooltip.Arrow width={14} height={20} />
    </FloatingTooltip.Content>
  </FloatingTooltip.Positioner>
</FloatingTooltip.Root>
```

When no custom `render` prop is supplied, `Arrow` uses Floating UI's `FloatingArrow`.

## `useFloatingTooltip`

`useFloatingTooltip<TData>()` is the low-level hook behind the primitives.

Options:

```ts
type UseFloatingTooltipOptions<TData = unknown> = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: FloatingTooltipOpenChangeDetails<TData>) => void;

  anchor?: TooltipAnchor | null;
  defaultAnchor?: TooltipAnchor | null;
  data?: TData;
  defaultData?: TData;

  placement?: TooltipPlacement;
  strategy?: Strategy;
  offset?: number | FloatingTooltipOffset;
  collisionPadding?: FloatingTooltipPadding;
  collisionBoundary?: FloatingTooltipBoundary;
  flip?: boolean | FloatingTooltipFlipOptions;
  shift?: boolean | FloatingTooltipShiftOptions;
  size?: boolean | FloatingTooltipSizeOptions;
  hideWhenDetached?: boolean | FloatingTooltipHideOptions;
  arrow?: boolean | FloatingTooltipArrowOptions;

  interactions?: FloatingTooltipInteractions;
  middleware?: Middleware[];
  middlewareMode?: 'append' | 'replace';
  whileElementsMounted?: UseFloatingOptions['whileElementsMounted'];

  id?: string;
  role?: 'tooltip' | 'label';
  disabled?: boolean;
};
```

Return shape:

```ts
type UseFloatingTooltipReturn<TData = unknown> = {
  open: boolean;
  mounted: boolean;
  data: TData | undefined;
  anchor: TooltipAnchor | null;
  placement: TooltipPlacement;
  side: TooltipSide;
  align: TooltipAlign;
  strategy: Strategy;
  x: number | null;
  y: number | null;
  floatingStyles: React.CSSProperties;
  middlewareData: MiddlewareData;

  refs: UseFloatingReturn<ReferenceElement>['refs'];
  context: UseFloatingReturn<ReferenceElement>['context'];
  arrowRef: React.RefCallback<SVGSVGElement>;

  setAnchor: (anchor: TooltipAnchor | null) => void;
  setData: (data: TData | undefined) => void;
  update: () => void;
  openTooltip: (data?: TData, anchor?: TooltipAnchor | null) => void;
  closeTooltip: () => void;

  getReferenceProps: <TProps extends React.HTMLProps<Element>>(props?: TProps) => TProps;
  getFloatingProps: <TProps extends React.HTMLProps<HTMLElement>>(props?: TProps) => TProps;
  getArrowProps: <TProps extends React.SVGProps<SVGSVGElement>>(props?: TProps) => TProps;
};
```

Controlled/uncontrolled behavior:

- `open`, `anchor`, and `data` each become controlled when their corresponding prop is provided.
- `defaultOpen`, `defaultAnchor`, and `defaultData` seed uncontrolled state.
- `openTooltip(nextData, nextAnchor)` updates uncontrolled data and anchor when provided, then
  opens.
- `closeTooltip()` closes.
- `setAnchor()` and `setData()` only update uncontrolled state.
- `id` is used as the default floating element id returned by `getFloatingProps()`.
- An explicit `id` passed into `getFloatingProps()` overrides the hook option id.
- `disabled` forces `open` to false and prevents `onOpenChange` handling.

Example:

```tsx
function HookTooltip() {
  const tooltip = useFloatingTooltip<{ month: string }>({
    defaultData: { month: 'Apr' },
    defaultOpen: true,
    offset: 8,
    placement: 'bottom-start',
  });

  return (
    <div>
      <button
        type="button"
        {...tooltip.getReferenceProps({
          onPointerEnter: () =>
            tooltip.openTooltip({ month: 'Apr' }, { type: 'point', x: 100, y: 120 }),
          onPointerLeave: tooltip.closeTooltip,
        })}
      >
        Hook trigger
      </button>

      {tooltip.mounted && (
        <div
          {...tooltip.getFloatingProps({
            ref: tooltip.refs.setFloating,
            style: tooltip.floatingStyles,
          })}
        >
          {tooltip.data?.month}
        </div>
      )}
    </div>
  );
}
```

## Interactions

`interactions` defaults to `true`.

When enabled, `useFloatingTooltip` wires:

- hover via Floating UI `useHover`
- focus via Floating UI `useFocus`
- dismiss via Floating UI `useDismiss`
- role via Floating UI `useRole`

Disable all interactions:

```tsx
<FloatingTooltip.Root interactions={false}>...</FloatingTooltip.Root>
```

Disable or configure one interaction:

```tsx
<FloatingTooltip.Root
  interactions={{
    hover: false,
    focus: true,
    dismiss: true,
    role: true,
  }}
>
  ...
</FloatingTooltip.Root>
```

`FloatingTooltip.Trigger` is the usual way to consume these interaction props. In tests, trigger
hover opens, focus opens, Escape dismisses, default tooltip role wiring adds `aria-describedby`, and
`role="label"` adds `aria-labelledby` instead.

When `FloatingTooltip.Root` receives an `id`, that id becomes the default
`FloatingTooltip.Positioner` id and the trigger's ARIA target. An explicit
`FloatingTooltip.Positioner id` wins over the root id.

## Middleware

The built-in middleware order is:

1. `offset`
2. `flip`
3. `shift`
4. `size`
5. `hide`
6. `arrow`
7. caller middleware

Only enabled middleware is included:

- `flip` default: `true`
- `shift` default: `true`
- `size` default: `false`
- `hideWhenDetached` default: `false`
- `arrow` default: `false`
- `offset` default: `0`

Append custom middleware:

```tsx
<ChartTooltip
  open
  anchor={{ type: 'point', x: 0, y: 0 }}
  items={items}
  floatingOptions={{
    middleware: [customMiddleware],
    middlewareMode: 'append',
    shift: { padding: 8 },
  }}
/>
```

Replace all built-in middleware:

```tsx
<FloatingTooltip.Root
  open
  anchor={{ type: 'point', x: 0, y: 0 }}
  middleware={[customMiddleware]}
  middlewareMode="replace"
>
  ...
</FloatingTooltip.Root>
```

`collisionBoundary` and `collisionPadding` are forwarded into `flip`, `shift`, `size`, and `hide`
when those middleware are enabled.

## Styling Contract

The floating APIs are intentionally minimally styled. Consumers should style via normal classes and
data attributes.

Useful primitive attributes:

- `[data-visx-tooltip]`
- `[data-visx-tooltip-content]`
- `[data-visx-tooltip-arrow]`
- `[data-visx-tooltip-trigger]`
- `[data-disabled]`
- `[data-state='open' | 'closed']`
- `[data-side='top' | 'right' | 'bottom' | 'left']`
- `[data-align='start' | 'center' | 'end']`
- `[data-anchor-hidden]`

Useful chart content attributes:

- `[data-visx-chart-tooltip]`
- `[data-visx-chart-tooltip-label]`
- `[data-visx-chart-tooltip-items]`
- `[data-visx-chart-tooltip-item]`
- `[data-visx-chart-tooltip-indicator]`
- `[data-visx-chart-tooltip-item-label]`
- `[data-visx-chart-tooltip-item-value]`

## Current Source Caveats

These are source-validated caveats, not design guidance.

- `FloatingTooltip.Content` does not assign a default role. `Positioner` receives Floating UI role
  props when role interactions are enabled.
- `FloatingTooltip.Trigger disabled` is trigger-scoped; use `Root disabled` to disable the whole
  tooltip state machine.
- `ChartTooltip` is controlled; it requires `open`, `anchor`, and `items`. `useChartTooltip` is the
  convenience state owner if you do not want to wire those yourself.
- `useChartTooltip.update()` accepts a full `TooltipAnchor`, not the local-point or shorthand
  SVG-point forms accepted by `show()`.
