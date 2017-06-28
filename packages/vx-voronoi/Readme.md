# @vx/voronoi

## Overview
A Voronoi diagram partitions a two-dimensional plane into regions based on a set of input points.
Each unique input point maps to a corresponding region, where each region represents _all points
that are closer to the input point than to any other input point_.

Not only are Voronoi diagrams :heart_eyes:, but they can be used to [improve the interactive experience
of a visualization](https://www.visualcinnamon.com/2015/07/voronoi.html). This is most often
accomplished by overlaying an invisible voronoi grid on top of the visualization to increase the
target area of interaction sites such as points on a scatter plot.

The `@vx/voronoi` package provides a wrapper around the existing [d3-voronoi](https://github.com/d3/d3-voronoi)
package.


## Usage
The `@vx/voronoi` package exports a wrapped version of the d3 `voronoi` layout for flexible usage,
as well as a `<VoronoiPolygon />` component for rendering Voronoi regions.


```js
import { voronoi, VoronoiPolygon } from '@vx/voronoi';

const points = Array(n).fill(null).map(() => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
}));

// width + height set an extent on the voronoi
// x + y set relevant accessors depending on the shape of your data
const voronoiLayout = voronoi({
  x: d => d.x, // maybe pass a scale here?
  y: d => d.y,
  width,
  height,
});

const voronoiDiagram = voronoiLayout(data);
const polygons = voronoiLayout.polygons(points); // equivalent to voronoiDiagram.polygons()

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

For more advanced usage with events, see [this example](https://vx-demo.now.sh/voronoi). Additional
information about the voronoi layout + diagram can be found in the
[d3-voronoi documentation](https://github.com/d3/d3-voronoi).


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
- [@vx/scale](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
- [@vx/shape](https://github.com/hshoff/vx/tree/master/packages/vx-shape)
- @vx/voronoi
