<p align="center">
  <img src="./assets/Screen Shot 2017-05-05 at 6.55.56 AM.png" />
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@vx/demo.svg?style=flat-square" />
  <img src="https://img.shields.io/npm/dm/@vx/demo.svg?style=flat-square" />
</p>

### vx

vx is collection of reusable low-level visualization components. vx combines the power of d3 to generate your visualization with the benefits of react for updating the DOM.

### [View Docs](https://vx-demo.now.sh)

## Usage

We can create a simple bar graph pretty easily.

```javascript
import React from 'react';
import Mock from '@vx/mock-data';
import Group from '@vx/group';
import Shape from '@vx/shape';
import Scale from '@vx/scale';
import { max } from 'd3-array'

// We'll use some mock data from `@vx/mock-data` for this.
const data = Mock.letterFrequency;

// Create the bounds around our graph
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = d => d.letter;
const y = d => +d.frequency * 100;

// And then scale the graph by our data
const xScale = Scale.scaleBand({
  rangeRound: [0, xMax],
  domain: data.map(x),
  padding: 0.4,
});
const yScale = Scale.scaleLinear({
  rangeRound: [yMax, 0],
  domain: [0, max(data, y)],
});

// We'll render the bars based on the data
const bars = data.map((d, i) => {
  const barHeight = yMax - yScale(y(d));
  return (
    <Group key={`bar-${x(d)}`}>
      <Shape.Bar
        width={xScale.bandwidth()}
        height={barHeight}
        x={xScale(x(d))}
        y={yMax - barHeight}
      />
    </Group>
  );
});

// Finally we'll embed it all in an SVG
const barGraph = (
  <svg width={width} height={height}>
      {bars}
  </svg>
);
```

## Motivation

**Goal**

The goal is to create a library of components you can use to make both your own reusable chart library or your slick custom one-off chart. vx is largely unopinionated and is meant to be build on top of. Keep your bundle sizes down and use only the packages you need.

**How?**

Under the hood, vx is using d3 for the calculations and math. If you're creating your own awesome chart library on top of vx, it's easy to create a component api that hides d3 entirely. Meaning your team could create charts as easily as using reusable react components.

**But why?**

Mixing two mental models for updating the DOM is never a good time. Copy and pasting d3 code into `componentDidMount()` is just that. This collection of components lets you easily build your own reusable visualization charts or library without having to learn d3. No more selections or `enter()`/`exit()`/`update()`.

## Status

`Super beta` Hold off on using this in production until I shake out some of the bigger API problems (post v1.0.0+).

If you're a curious coder, feel free to install and play around with the packages. I recommend using `--save-exact` when you `npm install`.

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
