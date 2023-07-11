import { Delaunay } from '@visx/vendor/d3-delaunay';

interface Config<Datum> {
  /** The data for the delaunay triangulation */
  data?: Datum[];
  /** Set the x-value accessor function for the delaunay triangulation. */
  x: (d: Datum) => number;
  /** Set the y-value accessor function for the delaunay triangulation. */
  y: (d: Datum) => number;
}

/**
 * Returns a configured d3 delaunay triangulation. See d3-delaunay for the complete API reference.
 */
export default function delaunay<Datum>({ data = [], x, y }: Config<Datum>) {
  return Delaunay.from(data, x, y);
}
