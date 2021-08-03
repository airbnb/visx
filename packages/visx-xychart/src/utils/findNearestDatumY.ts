import { AxisScale } from '@visx/axis';
import findNearestDatumSingleDimension from './findNearestDatumSingleDimension';
import { NearestDatumArgs, NearestDatumReturnType } from '../types';

export default function findNearestDatumY<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  yScale: scale,
  yAccessor: accessor,
  xScale,
  xAccessor,
  point,
  data,
}: NearestDatumArgs<XScale, YScale, Datum>): NearestDatumReturnType<Datum> {
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
        distanceX: Math.abs(Number(xScale(xAccessor(nearestDatum.datum))) - point.x),
      }
    : null;
}
