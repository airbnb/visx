# @visx/delaunay

<a title="@visx/delaunay npm downloads" href="https://www.npmjs.com/package/@visx/delaunay">
  <img src="https://img.shields.io/npm/dm/@visx/delaunay.svg?style=flat-square" />
</a>

## Overview

A Voronoi diagram partitions a two-dimensional plane into regions based on a set of input points.
Each unique input point maps to a corresponding region, where each region represents _all points
that are closer to the input point than to any other input point_.

Not only are Voronoi diagrams 😍, but they can be used to
[improve the interactive experience of a visualization](https://www.visualcinnamon.com/2015/07/voronoi.html).
This is most often accomplished by overlaying an invisible voronoi grid on top of the visualization
to increase the target area of interaction sites such as points on a scatter plot.

The `@visx/delaunay` package provides a wrapper around the existing
[d3-delaunay](https://github.com/d3/d3-delaunay) package with some `react`-specific utilities.

## Installation

```
npm install --save @visx/delaunay
```

## Usage

The `@visx/delaunay` package exports a wrapped version of the d3 `voronoi` and `delaunay` layouts for flexible usage,
as well as a `<Polygon />` component for rendering Voronoi and Delaunay regions.

```js
import { voronoi, Polygon } from '@visx/delaunay';

const points = Array(n).fill(null).map(() => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
}));

// width + height set an extent on the voronoi
// x + y set relevant accessors depending on the shape of your data
const voronoiDiagram = voronoi({
  data: points,
  x: d => d.x,
  y: d => d.y,
  width,
  height,
});

const polygons = Array.from(voronoiDiagram.cellPolygons());

return (
  <svg>
    <Group>
      {polygons.map((polygon) => (
        <Polygon key={...} polygon={polygon} />
      ))}
      {points.map(({ x, y }) => (
        <circle key={...} cx={x} cy={y} />
      )}
    </Group>
  </svg>
)
```

Additional information about the voronoi diagram API can be found in the
[d3-delaunay documentation](https://github.com/d3/d3-delaunay#voronoi).
