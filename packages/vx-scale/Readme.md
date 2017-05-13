# @vx/scale

## Overview of Scaling
The `@vx/scale` package aims to provide a wrapper around existing d3 scaling originally defined in the [d3-scale](https://github.com/d3/d3-scale) package.

Scales are functions that help you map your data to the physical pixel size that your graph requires. For example, let's say you wanted to create a bar chart to show populations per country. If you were to use a 1-to-1 scale (IE: 1 pixel per y value) your bar for the USA would be about 321.4 million pixels high!

Instead, you can tell vx a function to use that takes a value (like your population per country) and spits out another value.

For example, we could create a linear scale like this:

``` javascript
const graphHeight = 500; // We'll have a 500 pixel high graph
const maxPopulation = getMostPopulatedCountryInTheWorld();

const yScale = Scale.scaleLinear({
  rangeRound: [graphHeight, 0],
  domain: [0, maxPopulation],
});

// ...

const bars = data.map((d, i) => {
  const barHeight = graphHeight - yScale(d.y);
  return <Shape.Bar height={barHeight} y={graphHeight - barHeight} />
})
```

**Note:** This example represents how to use a yScale, but skipped a lot of details about how to make a bar chart. If you're trying to do that, you should check out [this example](https://github.com/hshoff/vx/blob/master/packages/vx-demo/components/charts/SimpleBar.js).

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
- [@vx/responsive](https://github.com/hshoff/vx/tree/master/packages/vx-responsive)
- @vx/scale
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)
