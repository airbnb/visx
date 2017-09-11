<p align="center">
  <img src="./assets/Screen Shot 2017-05-05 at 6.55.56 AM.png" />
</p>

<p align="center">
  <a title="npm version" href="https://www.npmjs.com/~vx">
    <img src="https://img.shields.io/npm/v/@vx/demo.svg?style=flat-square" />
  </a>
  <a title="build status" href="https://travis-ci.org/hshoff/vx">
    <img src="https://travis-ci.org/hshoff/vx.svg?branch=master" />
  </a>
  <a href='https://coveralls.io/github/hshoff/vx?branch=master'>
    <img src='https://coveralls.io/repos/github/hshoff/vx/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a title="@vx/demo npm downloads" href="https://www.npmjs.com/package/@vx/demo">
    <img src="https://img.shields.io/npm/dm/@vx/demo.svg?style=flat-square" />
  </a>
  <a href="https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhshoff%2Fvx?ref=badge_shield" alt="FOSSA Status">     <img src="https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhshoff%2Fvx.svg?type=shield"/>
  </a>
</p>

### vx

vx is a collection of reusable low-level visualization components. vx combines the power of d3 to generate your visualization with the benefits of react for updating the DOM.

<br />

<p align="center">
  <strong>
    <a href="https://vx-demo.now.sh">Docs</a>
  </strong>
  &bull;
  <strong>
    <a href="https://vx-demo.now.sh/gallery">Gallery</a>
  </strong>
  &bull;
  <strong>
    <a href="https://medium.com/vx-code/getting-started-with-vx-1756bb661410">Blog</a>
  </strong>
  &bull;
  <strong>
    <a href="./CHANGELOG.md">Changelog</a>
  </strong>
  &bull;
  <strong>
    <a href="https://medium.com/vx-code/getting-started-with-vx-1756bb661410">Getting started tutorial</a>
  </strong>
</p>


<p align="center">
  <a href="https://vx-demo.now.sh/gallery">
    <img src="./assets/vx-gallery.png" />
  </a>
</p>


## Usage

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/kind-modem)

Let's make a simple bar graph.

First we'll install the relevant packages:

```
$ npm install --save @vx/mock-data @vx/group @vx/shape @vx/scale
```

<img src="./assets/simplebar.png" height="150" />

```javascript
import React from 'react';
import { letterFrequency } from '@vx/mock-data';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';

// We'll use some mock data from `@vx/mock-data` for this.
const data = letterFrequency;

// Define the graph dimensions and margins
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
const xScale = scaleBand({
  rangeRound: [0, xMax],
  domain: data.map(x),
  padding: 0.4,
});
const yScale = scaleLinear({
  rangeRound: [yMax, 0],
  domain: [0, Math.max(...data.map(y))],
});

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => (data) => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

// Finally we'll embed it all in an SVG
function BarGraph(props) {
  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill='#fc2e1c'
            />
          </Group>
        );
      })}
    </svg>
  );
}

// ... somewhere else, render it ...
// <BarGraph />
```

For more examples using `vx`, check out the [gallery](https://vx-demo.now.sh/gallery).

## Motivation

**Goal**

The goal is to create a library of components you can use to make both your own reusable chart library or your slick custom one-off chart. vx is largely unopinionated and is meant to be build on top of. Keep your bundle sizes down and use only the packages you need.

**How?**

Under the hood, vx is using d3 for the calculations and math. If you're creating your own awesome chart library on top of vx, it's easy to create a component api that hides d3 entirely. Meaning your team could create charts as easily as using reusable react components.

**But why?**

Mixing two mental models for updating the DOM is never a good time. Copy and pasting d3 code into `componentDidMount()` is just that. This collection of components lets you easily build your own reusable visualization charts or library without having to learn d3. No more selections or `enter()`/`exit()`/`update()`.

## Status

`Super beta` Hold off on using this in production until I shake out some of the bigger API problems (post v1.0.0+). Check out [the road to v1](https://github.com/hshoff/vx/projects/1).

If you're a curious coder, feel free to install and play around with the packages. I recommend using `--save-exact` when you `npm install`.

## Roadmap

Lots coming soon, check out the [roadmap](./ROADMAP.md).

## In the wild

- [williaster/data-ui](https://github.com/williaster/data-ui) ([Demo](https://williaster.github.io/data-ui/))
- [Flaque/data-structures](https://github.com/Flaque/data-structures) ([Interactive explanation of the trie data structure](https://trie.now.sh/))
- Have a project that's using vx? Open a pull request and we'll add it to the list.

## FAQ

1. What does `vx` stand for?

    > vx stands for visualization components.

1. Do you plan on supporting animation/transitions?

    > more info: https://github.com/hshoff/vx/issues/6

1. Do I have to use every package to make a chart?

    > nope! pick and choose the packages you need.

1. Can I use this to create my own library of charts for my team?

    > Please do.

1. Does vx work with [preact](https://preactjs.com/)?

    > yup! need to alias `react` + `react-dom` and using `preact-compat`. Here's a quick demo: https://vx-preact.now.sh/. [more info](https://preactjs.com/guide/switching-to-preact#how-to-alias-preact-compat)

1. I like using d3.

    > Me too.

:v:

[MIT](./LICENSE) &bull; [@hshoff](https://twitter.com/hshoff)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhshoff%2Fvx.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhshoff%2Fvx?ref=badge_large)
