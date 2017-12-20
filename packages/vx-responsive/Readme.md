# @vx/responsive

```
npm install --save @vx/responsive
```

The `@vx/responsive` package is here to help you make responsive graphs.

**With Enhancers**

`withScreenSize`

`withParentSize`

**With Components**

`ParentSize`

`ScaleSVG`

## `withScreenSize`

If you would like your graph to adapt to the screen size, you can use `withScreenSize()` to give the argument the `screenWidth` and `screenHeight` props containing the respective screen dimensions.

If you want your graph to adapth to the parent component, use the `withParentSize()` instead.

### Example:
``` js
import { withScreenSize } from '@vx/responsive';
// or
// import * as Responsive from '@vx/responsive';
// Responsive.withScreenSize(...);

let chartToRender = withScreenSize(MySuperCoolVxChart);

// ... Render the chartToRender somewhere
```

## `withParentSize`

If you would like your graph to adapt to it's parent size, you can use `withParentSize()` to give the argument the `parentWidth` and `parentHeight` props containing the respective parent's dimensions.

### Example:
``` js
import { withParentSize } from '@vx/responsive';
// or
// import * as Responsive from '@vx/responsive';
// Responsive.withParentSize(...);

let chartToRender = withParentSize(MySuperCoolVxChart);

// ... Render the chartToRender somewhere
```

## `ParentSize`

You might do the same thing using the `ParentSize` component.

### Example:
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

## `ScaleSVG`

You can also create a responsive chart with a specific viewBox with the `ScaleSVG` component.

### Example:

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
