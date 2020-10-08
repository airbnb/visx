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
  yScale,
  yAccessor,
  point,
  data,
}: NearestDatumArgs<XScale, YScale, Datum>): {
  datum: Datum;
  index: number;
  distanceX: number;
  distanceY: number;
} | null {
  if (!point) return null;

  const nearestDatum = findNearestDatumSingleDimension<XScale, Datum>({
    scale,
    accessor,
    scaledValue: point.x,
    data,
  });

  return nearestDatum
    ? {
        datum: nearestDatum.datum,
        index: nearestDatum.index,
        distanceX: nearestDatum.distance,
        distanceY: Math.abs(Number(yScale(yAccessor(nearestDatum.datum))) - point.y),
      }
    : null;
}
