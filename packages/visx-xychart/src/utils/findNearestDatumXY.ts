import { AxisScale } from '@visx/axis';
import { voronoi } from '@visx/voronoi';
import { NearestDatumArgs } from '../types';

/* finds the datum nearest to svgMouseX/Y using a voronoi */
export default function findNearestDatumXY<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  width,
  height,
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  svgCoords,
  data,
}: NearestDatumArgs<XScale, YScale, Datum>) {
  if (!svgCoords) return null;

  const scaledX = (d: Datum) => Number(xScale(xAccessor(d)));
  const scaledY = (d: Datum) => Number(yScale(yAccessor(d)));

  // Create a voronoi for each datum's x,y coordinate
  const voronoiInstance = voronoi({
    x: scaledX,
    y: scaledY,
    width,
    height,
  });

  const nearestDatum = voronoiInstance(data).find(svgCoords.x, svgCoords.y);

  if (!nearestDatum) return null;

  const { data: datum, index } = nearestDatum;
  const distanceX = Math.abs(scaledX(datum) - svgCoords.x);
  const distanceY = Math.abs(scaledY(datum) - svgCoords.y);

  return { datum, index, distanceX, distanceY };
}
