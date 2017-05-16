# @vx/responsive

The `@vx/responsive` package is here to help you make responsive graphs.

If you would like your graph to adapt to the screen size, you can use `Responsive.withScreenSize()` to take an element and attach events that will resize the graph to maintain the same size of the screen.

## Example:
``` js
import Responsive from `@vx/responsive`;
let chartToRender = Responsive.withScreenSize(MySuperCoolVxChart);

// ... Render the chartToRender somewhere
```

You can also create a responsive chart with a specific viewBox with the `<Responsive.ScaleSVG />` component.

## Example:

``` js
import Responsive from `@vx/responsive`;

let chartToRender = (
  <Responsive.ScaleSVG
    width={400}
    height={400}
  >
    <MySuperCoolVXChart/>
  </Responsive.ScaleSVG>
)
```

## vx packages

- [@vx/axis](https://github.com/hshoff/vx/tree/master/packages/vx-axis)
- [@vx/curve](https://github.com/hshoff/vx/tree/master/packages/vx-curve)
- [@vx/demo](https://github.com/hshoff/vx/tree/master/packages/vx-demo)
- [@vx/glyph](https://github.com/hshoff/vx/tree/master/packages/vx-glyph)
- [@vx/grid](https://github.com/hshoff/vx/tree/master/packages/vx-grid)
- [@vx/group](https://github.com/hshoff/vx/tree/master/packages/vx-group)
- [@vx/marker](https://github.com/hshoff/vx/tree/master/packages/vx-marker)
- [@vx/mock-data](https://github.com/hshoff/vx/tree/master/packages/vx-mock-data)
- [@vx/point](https://github.com/hshoff/vx/tree/master/packages/vx-point)
- @vx/responsive
- [@vx/scale](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)
