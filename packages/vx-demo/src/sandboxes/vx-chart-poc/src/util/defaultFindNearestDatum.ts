import { voronoi } from '@vx/voronoi';
import { NearestDatumArgs } from '../types';

export default function defaultFindNearestDatum({
  width,
  height,
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  svgMouseX,
  svgMouseY,
  data,
}: NearestDatumArgs) {
  const scaledX = (d: unknown) => xScale(xAccessor(d)) as number;
  const scaledY = (d: unknown) => yScale(yAccessor(d)) as number;

  // Create a voronoi with each node center points
  const voronoiInstance = voronoi({
    x: scaledX,
    y: scaledY,
    width,
    height,
  });

  const nearestDatum = voronoiInstance(data).find(svgMouseX, svgMouseY);

  if (!nearestDatum) return null;

  const { data: datum, index } = nearestDatum;

  const distanceX = nearestDatum ? Math.abs(scaledX(datum) - svgMouseX) : Number.POSITIVE_INFINITY;
  const distanceY = nearestDatum ? Math.abs(scaledY(datum) - svgMouseY) : Number.POSITIVE_INFINITY;
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  return { datum, index, distance };
}
