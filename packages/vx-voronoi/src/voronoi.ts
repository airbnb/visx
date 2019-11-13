import { voronoi as d3Voronoi } from 'd3-voronoi';

const CLIP_PADDING = 1;

interface Config<Datum> {
  width?: number;
  height?: number;
  x?: (d: Datum) => number;
  y?: (d: Datum) => number;
}

/**
 * Returns a configured d3 voronoi `layout`. calling `layout(data)` returns a voronoi *diagram*.
 * Alternatively call `layout.polygons(data)`, `layout.triangles(data)`, `layout.links(data)`
 */
export default function getVoronoi<Datum>({ width = 0, height = 0, x, y }: Config<Datum>) {
  const voronoi = d3Voronoi<Datum>();

  if (x) voronoi.x(x);
  if (y) voronoi.y(y);

  voronoi.extent([
    [-CLIP_PADDING, -CLIP_PADDING],
    [width + CLIP_PADDING, height + CLIP_PADDING],
  ]);

  return voronoi;
}
