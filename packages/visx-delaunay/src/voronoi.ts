import { Delaunay } from 'd3-delaunay';

const CLIP_PADDING = 1;

interface Config<Datum> {
  /** The data for the voronoi layout */
  data?: Datum[];
  /** The total width of the voronoi layout. */
  width?: number;
  /** The total width of the voronoi layout. */
  height?: number;
  /** Set the x-value accessor function for the voronoi layout. */
  x: (d: Datum) => number;
  /** Set the y-value accessor function for the voronoi layout. */
  y: (d: Datum) => number;
}

/**
 * Returns a configured d3 voronoi `layout`. calling `layout(data)` returns a voronoi *diagram*.
 * Alternatively call `layout.polygons(data)`, `layout.triangles(data)`, `layout.links(data)`
 */
export default function voronoi<Datum>({ data = [], width = 0, height = 0, x, y }: Config<Datum>) {
  const delaunay = Delaunay.from(data, x, y);
  return delaunay.voronoi([-CLIP_PADDING, -CLIP_PADDING, width + CLIP_PADDING, height + CLIP_PADDING]);
}
