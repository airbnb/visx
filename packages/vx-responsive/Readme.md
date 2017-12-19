# @vx/responsive

```
npm install --save @vx/responsive
```

The `@vx/responsive` package is here to help you make responsive graphs.

## With Enhancers

If you would like your graph to adapt to the screen size, you can use `withScreenSize()` to take an element and attach events that will resize the graph to maintain the same size of the screen.

If you want your graph to adapth to the parent component, use the `withParentSize()` instead.

## Example:
``` js
import { withParentSize, withScreenSize } from '@vx/responsive';
// or
// import * as Responsive from '@vx/responsive';
// Responsive.withScreenSize(...);
// Responsive.withParentSize(...);

let chartToRender = withScreenSize(MySuperCoolVxChart);
let otherChartToRender = withParentSize(MySuperCoolVxChart);

// ... Render the chartToRender somewhere
```

## With Components

You might do the same thing using the `ParentSize` component.

## Example:
``` js
import { ParentSize } from "@vx/responsive";

let chartToRender = (
  <ParentSize>
    {parent => (
      <MySuperCoolVxChart 
        parentWidth={parent.width}
        parentHeight={parent.height}
        parentTop={parent.top}
        paretnLeft={parent.left}
        parentRef={parent.ref}
        resizeParent={parent.resize}
      />)
    }
  </ParentSize>
);

```

You can also create a responsive chart with a specific viewBox with the `<ScaleSVG />` component.

## Example:

``` js
import { ScaleSVG } from '@vx/responsive';
// or
// import * as Responsive from '@vx/responsive';
// <Responsive.ScaleSVG />

let chartToRender = (
  <ScaleSVG
    width={400}
    height={400}
  >
    <MySuperCoolVXChart/>
  </ScaleSVG>
)
```
