import { voronoi } from '@vx/voronoi';
import { NearestDatumArgs } from '../types';

// default function for finding the datum nearest to svgMouseX/Y, uses voronoi
export default function defaultFindNearestDatum<
  Datum = unknown,
  XScaleInput = unknown,
  YScaleInput = unknown
>({
  width,
  height,
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  svgMouseX,
  svgMouseY,
  data,
}: NearestDatumArgs<Datum, XScaleInput, YScaleInput>) {
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
  const distanceX = Math.abs(scaledX(datum) - svgMouseX);
  const distanceY = Math.abs(scaledY(datum) - svgMouseY);

  return { datum, index, distanceX, distanceY };
}
