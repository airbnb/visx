import { voronoi as d3Voronoi } from 'd3-voronoi';

const CLIP_PADDING = 1;

interface Config<Datum> {
  /** The total width of the voronoi layout. */
  width?: number;
  /** The total width of the voronoi layout. */
  height?: number;
  /** Set the x-value accessor function for the voronoi layout. */
  x?: (d: Datum) => number;
  /** Set the y-value accessor function for the voronoi layout. */
  y?: (d: Datum) => number;
}

/**
 * Returns a configured d3 voronoi `layout`. calling `layout(data)` returns a voronoi *diagram*.
 * Alternatively call `layout.polygons(data)`, `layout.triangles(data)`, `layout.links(data)`
 */
export default function voronoi<Datum>({ width = 0, height = 0, x, y }: Config<Datum>) {
  const voronoiGenerator = d3Voronoi<Datum>();

  if (x) voronoiGenerator.x(x);
  if (y) voronoiGenerator.y(y);

  voronoiGenerator.extent([
    [-CLIP_PADDING, -CLIP_PADDING],
    [width + CLIP_PADDING, height + CLIP_PADDING],
  ]);

  return voronoiGenerator;
}
