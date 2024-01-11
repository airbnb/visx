# @visx/responsive

<a title="@visx/responsive npm downloads" href="https://www.npmjs.com/package/@visx/responsive">
  <img src="https://img.shields.io/npm/dm/@visx/responsive.svg?style=flat-square" />
</a>

The `@visx/responsive` package is here to help you make responsive graphs.

**Enhancers**

`withScreenSize`

`withParentSize`

**Components**

`ParentSize`

`ScaleSVG`

### `withScreenSize`

If you would like your graph to adapt to the screen size, you can use `withScreenSize()`. The
resulting component will pass `screenWidth` and `screenHeight` props to the wrapped component
containing the respective screen dimensions. You can also optionally pass two config props to the
wrapped component, although in 99% of the cases this is not necessary:

- `windowResizeDebounceTime` - determines how often the size is updated in miliseconds, defaults to
  `300`,
- `enableDebounceLeadingCall` - determines whether the size is updated immediately on first render,
  defaults to `true`. This is essentially the value of
  [`options.leading` in Lodash's `debounce`](https://lodash.com/docs/4.17.15#debounce).

### Example:

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

// ... Render the chartToRender somewhere
```

## `withParentSize`

If you would like your graph to adapt to it's parent component's size, you can use
`withParentSize()`. The resulting component will pass `parentWidth` and `parentHeight` props to the
wrapped component containing the respective parent's dimensions. You can also optionally pass config
props to the wrapped component:

- `initialWidth` - initial chart width used before the parent size is determined,
- `initialHeight` - initial chart height used before the parent size is determined,
- `debounceTime` - determines how often the size is updated in miliseconds, defaults to `300`,
- `enableDebounceLeadingCall` - determines whether the size is updated immediately on first render,
  defaults to `true`. This is essentially the value of
  [`options.leading` in Lodash's `debounce`](https://lodash.com/docs/4.17.15#debounce).

### Example:

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

// ... Render the chartToRender somewhere
```

## `ParentSize`

You might do the same thing using the `ParentSize` component.

### Example:

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

// ... Render the chartToRender somewhere
```

## `ScaleSVG`

You can also create a responsive chart with a specific viewBox with the `ScaleSVG` component.

### Example:

```tsx
import { ScaleSVG } from '@visx/responsive';

const chartToRender = (
  <ScaleSVG width={400} height={400}>
    <MySuperCoolVXChart />
  </ScaleSVG>
);

// ... Render the chartToRender somewhere
```

### ⚠️ `ResizeObserver` dependency

The `ParentSize` component and `withParentSize` enhancer rely on `ResizeObserver`s for auto-sizing.
If you need a polyfill, you can either polute the `window` object or inject it cleanly through
props:

```tsx
import { ResizeObserver } from 'your-favorite-polyfill';

function App() {
  return (
    <ParentSize resizeObserverPolyfill={ResizeObserver} {...}>
      {() => {...}}
    </ParentSize>
  );
```

## Installation

```
npm install --save @visx/responsive
```
