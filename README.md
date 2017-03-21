<p align="center">
  <img src="./logo.png" />
</p>

<p align="center">
  <code>react + d3 = vx</code>
</p>

### vx

A collection of reusable low-level visualization components. vx combines the power of d3 to generate your visualization and react for updating the DOM.

Super beta. Hold off on using this in production until I shake out some of the bigger API problems (post `v1.0.0+`).

## Table of contents

1. [Motivation](#motivation)
1. [Examples](#examples)
1. [Packages](#packages)
1. [FAQ](#faq)

## Motivation

Mixing two mental models for updating the DOM is never a good time. Copy and pasting d3 code into `componentDidMount()` is just that. This collection of components lets you easily build your own reusable visualization charts or library without having to learn d3. No more selections or `enter()/exit()/update()`.

## Examples

+ [Simple line chart](https://github.com/hshoff/vx/blob/master/packages/vx-demo/src/demos/charts/SimpleLineChart.js)
+ [Simple area chart](https://github.com/hshoff/vx/blob/master/packages/vx-demo/src/demos/charts/SimpleAreaChart.js)

## Packages

- [@vx/axis](https://github.com/hshoff/vx/tree/master/packages/vx-axis)
- [@vx/curve](https://github.com/hshoff/vx/tree/master/packages/vx-curve)
- [@vx/demo](https://github.com/hshoff/vx/tree/master/packages/vx-demo)
- [@vx/glyph](https://github.com/hshoff/vx/tree/master/packages/vx-glyph)
- [@vx/grid](https://github.com/hshoff/vx/tree/master/packages/vx-grid)
- [@vx/group](https://github.com/hshoff/vx/tree/master/packages/vx-group)
- [@vx/mock-data](https://github.com/hshoff/vx/tree/master/packages/vx-mock-data)
- [@vx/point](https://github.com/hshoff/vx/tree/master/packages/vx-point)
- [@vx/scale](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)

## FAQ

1. What does `vx` stand for?

    > vx stands for visualization components.

1. Do you plan on supporting animation/transitions?

    > yup!

1. Do I have to use every package to make a chart?

    > nope! pick and choose the packages you need.

1. Can I use this to create my own library of charts for my team?

    > Please do.

1. I like using d3.

    > Me too.

:v:

[MIT](./LICENSE) &bull; [@hshoff](https://twitter.com/hshoff)
