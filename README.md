<p align="center">
  <img src="./assets/tiger-sm.png" />
</p>

<p align="center">
  <code>react + d3 = vx</code>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@vx/demo.svg?style=flat-square" />
  <img src="https://img.shields.io/npm/dm/@vx/demo.svg?style=flat-square" />
</p>

### vx

A collection of reusable low-level visualization components. vx combines the power of d3 to generate your visualization and react for updating the DOM.

Super beta. Hold off on using this in production until I shake out some of the bigger API problems (post `v1.0.0+`).

[View Docs](https://vx-demo.now.sh)

## Motivation

Mixing two mental models for updating the DOM is never a good time. Copy and pasting d3 code into `componentDidMount()` is just that. This collection of components lets you easily build your own reusable visualization charts or library without having to learn d3. No more selections or `enter()/exit()/update()`.


## Roadmap

Lots coming soon, check out the [roadmap](./ROADMAP.md).

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
