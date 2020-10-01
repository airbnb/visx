import { AxisScale } from '@visx/axis';
import findNearestDatumSingleDimension from './findNearestDatumSingleDimension';
import { NearestDatumArgs } from '../types';

export default function findNearestDatumY<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  yScale: scale,
  yAccessor: accessor,
  point,
  data,
}: NearestDatumArgs<XScale, YScale, Datum>): {
  datum: Datum;
  index: number;
  distanceX: number;
  distanceY: number;
} | null {
  if (!point) return null;

  const nearestDatum = findNearestDatumSingleDimension<YScale, Datum>({
    scale,
    accessor,
    scaledValue: point.y,
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
