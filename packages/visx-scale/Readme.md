# @visx/scale

<a title="@visx/scale npm downloads" href="https://www.npmjs.com/package/@visx/scale">
  <img src="https://img.shields.io/npm/dm/@visx/scale.svg?style=flat-square" />
</a>

## Installation

```sh
npm install --save @visx/scale
```

## Overview of scales

The `@visx/scale` package aims to provide a wrapper around existing `d3` scaling originally defined
in the [d3-scale](https://github.com/d3/d3-scale) package.

Scales are functions that help you map your data values to the physical pixel size that your graph
requires. For example, let's say you wanted to create a bar chart to show populations per country.
If you were to use a 1-to-1 scale (IE: 1 pixel per y value) your bar for the USA would be about
321.4 million pixels high!

Instead, you can tell `visx` a function to use that takes a data value (like your population per
country) and quantitatively maps to another dimensional space, like pixels.

For example, we could create a linear scale like this:

```js
const graphWidth = 500;
const graphHeight = 200;
const [minX, maxX] = getXMinAndMax();
const [minY, maxY] = getYMinAndMax();

const xScale = Scale.scaleLinear({
  domain: [minX, maxX], // x-coordinate data values
  range: [0, graphWidth], // svg x-coordinates, svg x-coordinates increase left to right
  round: true,
});

const yScale = Scale.scaleLinear({
  domain: [minY, maxY], // y-coordinate data values
  // svg y-coordinates, these increase from top to bottom so we reverse the order
  // so that minY in data space maps to graphHeight in svg y-coordinate space
  range: [graphHeight, 0],
  round: true,
});

// ...

const points = data.map((d, i) => {
  const barHeight = graphHeight - yScale(d.y);
  return <Shape.Bar height={barHeight} y={graphHeight - barHeight} />;
});
```

## Different types of scales

### Band scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#_band)

Example:

```js
const scale = Scale.scaleBand({
  /*
    range,
    round,
    domain,
    padding,
    nice = false
  */
});
```

### Linear scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear)

Example:

```js
const scale = Scale.scaleLinear({
  /*
    range,
    round,
    domain,
    nice = false,
    clamp = false,
  */
});
```

### Log scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#scaleLog)

Example:

```js
const scale = Scale.scaleLog({
  /*
    range,
    round,
    domain,
    base,
    nice = false,
    clamp = false,
  */
});
```

**Important note:** As log(0) = -∞, a log scale domain must be strictly-positive or strictly-negative; the domain must not include or cross zero.

### Radial scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#scaleRadial)

Example:

```js
const scale = Scale.scaleRadial({
  /*
    range,
    round,
    domain,
    nice = false,
    clamp = false,
  */
});
```

### Ordinal scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal)

Example:

```js
const scale = Scale.scaleOrdinal({
  /*
    range,
    domain,
    unknown,
  */
});
```

### Point scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#scalePoint)

Example:

```js
const scale = Scale.scalePoint({
  /*
    range,
    round,
    domain,
    padding,
    align,
    nice = false,
  */
});
```

### Power scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#scalePow)

Example:

```js
const scale = Scale.scalePower({
  /*
    range,
    round,
    domain,
    exponent,
    nice = false,
    clamp = false,
  */
});
```

### Square Root scale

[Original d3 docs](https://github.com/d3/d3-scale#scaleSqrt)

Example:

```js
// No need to set the exponent, It is always 0.5
const scale = Scale.scaleSqrt({
  /*
    range,
    round,
    domain,
    nice = false,
    clamp = false,
  */
});
```

### Time scale

[Original d3 docs](https://github.com/d3/d3-scale/blob/master/README.md#scaleTime)

Example:

```js
const scale = Scale.scaleTime({
  /*
    range,
    round,
    domain,
    nice = false,
    clamp = false,
   */
});
```

You also can scale time with Coordinated Universal Time via `scaleUtc`.

Example:

```js
const scale = Scale.scaleUtc({
  /*
    range,
    round,
    domain,
    nice = false,
    clamp = false,
   */
});
```

### Color Scales

D3 scales offer the ability to map points to colors. You can use
[`d3-scale-chromatic`](https://github.com/d3/d3-scale-chromatic) in conjunction with visx's
`scaleOrdinal` to make color scales.

You can install `d3-scale-chromatic` with npm:

```sh
npm install --save d3-scale-chromatic
```

You create a color scale like so:

```js
import { scaleOrdinal } from '@visx/scale';
import { schemeSet1 } from 'd3-scale-chromatic';

const colorScale = scaleOrdinal({
  domain: arrayOfThings,
  range: schemeSet1,
});
```

This generates a color scale with the following colors:

![d3-scale-chromatic schemeSet1](https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set1.png)

There are a number of other
[categorical color schemes](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#categorical)
available, along with other continuous color schemes.
