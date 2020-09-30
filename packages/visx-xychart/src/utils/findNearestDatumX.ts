import { AxisScale } from '@visx/axis';
import findNearestDatumSingleDimension from './findNearestDatumSingleDimension';
import { NearestDatumArgs } from '../types';

export default function findNearestDatumX<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  xScale: scale,
  xAccessor: accessor,
  svgCoords,
  data,
}: NearestDatumArgs<XScale, YScale, Datum>): {
  datum: Datum;
  index: number;
  distanceX: number;
  distanceY: number;
} | null {
  if (!svgCoords) return null;

  const nearestDatum = findNearestDatumSingleDimension<XScale, Datum>({
    scale,
    accessor,
    svgCoord: svgCoords.x,
    data,
  });

  return nearestDatum
    ? {
        datum: nearestDatum.datum,
        index: nearestDatum.index,
        distanceY: nearestDatum.distance,
        distanceX: 0,
      }
    : null;
}
