# @visx/responsive

<a title="@visx/responsive npm downloads" href="https://www.npmjs.com/package/@visx/responsive">
  <img src="https://img.shields.io/npm/dm/@visx/responsive.svg?style=flat-square" />
</a>

The `@visx/responsive` package is here to help you make responsive graphs by providing a collection
of hooks, enhancers and components.

## Installation

```
npm install --save @visx/responsive
```

## Hooks

### `useScreenSize`

If you would like your graph to adapt to the screen size, you can use the `useScreenSize()` hook. It
returns current screen width and height and updates the value automatically on browser window
resize. You can optionally pass a config object as an argument to the hook. Config object attributes
are:

- `initialSize` - initial size before measuring the screen, defaults to `{ width: 0, height: 0 }`.
- `debounceTime` - determines how often the size is updated in milliseconds, defaults to `300`.
- `enableDebounceLeadingCall` - determines whether the size is updated immediately on first render,
  defaults to `true`. This is essentially the value of
  [`options.leading` in Lodash's `debounce`](https://lodash.com/docs/4.17.15#debounce).

#### Example

```tsx
import { useScreenSize } from '@visx/responsive';

const ChartToRender = () => {
  const { width, height } = useScreenSize({ debounceTime: 150 });

  return (
    <svg width={width} height={height}>
      {/* content */}
    </svg>
  );
};

const chartToRender = <ChartToRender myProp="string" />;
```

### `useParentSize`

If you want your graph to adapt to its parent size, you can use `useParentSize()` hook.
`<ParentSize>` uses this hook internally. The hook returns `width`, `height`, `left`, `top`
properties which describe dimensions of the container which received `parentRef` ref. You can
optionally pass a config object as an argument to the hook. Config object attributes are:

- `initialSize` - initial size before measuring the parent, defaults to
  `{ width: 0, height: 0, left: 0, top: 0 }`.
- `debounceTime` - determines how often the size is updated in miliseconds, defaults to `300`.
- `enableDebounceLeadingCall` - determines whether the size is updated immediately on first render,
  defaults to `true`. This is essentially the value of
  [`options.leading` in Lodash's `debounce`](https://lodash.com/docs/4.17.15#debounce).
- `ignoreDimensions` - array of dimensions for which an update should be skipped. For example, if
  you pass `['width']`, width changes of the component that received `parentRef` won't be
  propagated. Defaults to `[]` (all dimensions changes trigger updates).

#### Example

```tsx
import { useParentSize } from '@visx/responsive';

const ChartToRender = () => {
  const { parentRef, width, height } = useParentSize({ debounceTime: 150 });

  return (
    <div ref={parentRef}>
      <svg width={width} height={height}>
        {/* content */}
      </svg>
    </div>
  );
};

const chartToRender = <ChartToRender myProp="string" />;
```

## Enhancers / (HOCs)

### `withScreenSize`

If you prefer to use an enhancer, you can use the `withScreenSize()`. The resulting component will
pass `screenWidth` and `screenHeight` props to the wrapped component containing the respective
screen dimensions. You can also optionally pass config props to the wrapped component:

- `debounceTime` - determines how often the size is updated in milliseconds, defaults to `300`.
- `windowResizeDebounceTime` - deprecated, equivalent to the above, kept for backwards compatibility
- `enableDebounceLeadingCall` - determines whether the size is updated immediately on first render,
  defaults to `true`. This is essentially the value of
  [`options.leading` in Lodash's `debounce`](https://lodash.com/docs/4.17.15#debounce).

#### Example

```tsx
import { withScreenSize, WithScreenSizeProvidedProps } from '@visx/responsive';

interface Props extends WithScreenSizeProvidedProps {
  myProp: string;
}

const MySuperCoolVisxChart = ({ myProp, screenWidth, screenHeight }: Props) => {
  // ...
};

const ChartToRender = withScreenSize(MySuperCoolVisxChart);

const chartToRender = <ChartToRender myProp="string" />;
```

### `withParentSize`

If you prefer to use an enhancer to adapt your graph to its parent component's size, you can use
`withParentSize()`. The resulting component will pass `parentWidth` and `parentHeight` props to the
wrapped component containing the respective parent's dimensions. You can also optionally pass config
props to the wrapped component:

- `initialWidth` - initial chart width used before the parent size is determined.
- `initialHeight` - initial chart height used before the parent size is determined.
- `debounceTime` - determines how often the size is updated in miliseconds, defaults to `300`.
- `enableDebounceLeadingCall` - determines whether the size is updated immediately on first render,
  defaults to `true`. This is essentially the value of
  [`options.leading` in Lodash's `debounce`](https://lodash.com/docs/4.17.15#debounce).

#### Example

```tsx
import { withParentSize, WithParentSizeProvidedProps } from '@visx/responsive';

interface Props extends WithParentSizeProvidedProps {
  myProp: string;
}

const MySuperCoolVisxChart = ({ myProp, parentWidth, parentHeight }: Props) => {
  // ...
};

const ChartWithParentSize = withParentSize(MySuperCoolVisxChart);

const chartToRender = <ChartWithParentSize myProp="string" initialWidth={400} />;
```

## Components

### `ParentSize`

You might do the same thing as `useParentSize` or `withParentSize` using the `ParentSize` component.

#### Example

```tsx
import { ParentSize } from '@visx/responsive';

const chartToRender = (
  <ParentSize>
    {(parent) => (
      <MySuperCoolVisxChart
        parentWidth={parent.width}
        parentHeight={parent.height}
        parentTop={parent.top}
        parentLeft={parent.left}
        // this is the referrer to the wrapper component
        parentRef={parent.ref}
        // this function can be called inside MyVisxChart to cause a resize of the wrapper component
        resizeParent={parent.resize}
      />
    )}
  </ParentSize>
);
```

### `ScaleSVG`

You can also create a responsive chart with a specific viewBox with the `ScaleSVG` component.

#### Example

```tsx
import { ScaleSVG } from '@visx/responsive';

const chartToRender = (
  <ScaleSVG width={400} height={400}>
    <MySuperCoolVXChart />
  </ScaleSVG>
);
```

## ⚠️ `ResizeObserver` dependency

`useParentSize`, `ParentSize` and `withParentSize` rely on `ResizeObserver`s for auto-sizing. If you
need a polyfill, you can either pollute the `window` object or inject it cleanly like this:

```tsx
import { ResizeObserver } from 'your-favorite-polyfill';

// hook
useParentSize({ resizeObserverPolyfill: ResizeObserver });

// component
<ParentSize resizeObserverPolyfill={ResizeObserver} {...}>
  {() => {...}}
</ParentSize>

// enhancer
withParentSize(MyComponent, ResizeObserver);
```
