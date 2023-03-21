import { Delaunay } from 'd3-delaunay';

interface Config<Datum> {
  /** The data for the voronoi layout */
  data?: Datum[];
  /** Set the x-value accessor function for the delaunay layout. */
  x: (d: Datum) => number;
  /** Set the y-value accessor function for the delaunay layout. */
  y: (d: Datum) => number;
}

/**
 * Returns a configured d3 voronoi `layout`. calling `layout(data)` returns a voronoi *diagram*.
 * Alternatively call `layout.polygons(data)`, `layout.triangles(data)`, `layout.links(data)`
 */
export default function delaunay<Datum>({ data = [], x, y }: Config<Datum>) {
  return Delaunay.from(data, x, y);
}
