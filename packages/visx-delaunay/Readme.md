# @visx/voronoi

<a title="@visx/voronoi npm downloads" href="https://www.npmjs.com/package/@visx/voronoi">
  <img src="https://img.shields.io/npm/dm/@visx/voronoi.svg?style=flat-square" />
</a>

## Overview

A Voronoi diagram partitions a two-dimensional plane into regions based on a set of input points.
Each unique input point maps to a corresponding region, where each region represents _all points
that are closer to the input point than to any other input point_.

Not only are Voronoi diagrams 😍, but they can be used to
[improve the interactive experience of a visualization](https://www.visualcinnamon.com/2015/07/voronoi.html).
This is most often accomplished by overlaying an invisible voronoi grid on top of the visualization
to increase the target area of interaction sites such as points on a scatter plot.

The `@visx/voronoi` package provides a wrapper around the existing
[d3-voronoi](https://github.com/d3/d3-voronoi) package with some `react`-specific utilities.

## Installation

```
npm install --save @visx/voronoi
```

## Usage

The `@visx/voronoi` package exports a wrapped version of the d3 `voronoi` layout for flexible usage,
as well as a `<VoronoiPolygon />` component for rendering Voronoi regions.

```js
import { voronoi, VoronoiPolygon } from '@visx/voronoi';

const points = Array(n).fill(null).map(() => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
}));

// width + height set an extent on the voronoi
// x + y set relevant accessors depending on the shape of your data
const voronoiLayout = voronoi({
  x: d => d.x,
  y: d => d.y,
  width,
  height,
});

const voronoiDiagram = voronoiLayout(data);
const polygons = voronoiDiagram.polygons(); // equivalent to voronoiLayout.polygons(points)

return (
  <svg>
    <Group>
      {polygons.map((polygon) => (
        <VoronoiPolygon key={...} polygon={polygon} />
      ))}
      {points.map(({ x, y }) => (
        <circle key={...} cx={x} cy={y} />
      )}
    </Group>
  </svg>
)
```

For more advanced usage with events, see [this example](https://airbnb.io/visx/voronoi). Additional
information about the voronoi layout + diagram can be found in the
[d3-voronoi documentation](https://github.com/d3/d3-voronoi).
