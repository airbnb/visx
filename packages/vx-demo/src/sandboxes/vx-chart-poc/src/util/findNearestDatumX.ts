import findNearestDatumSingleDimension from './findNearestDatumSingleDimension';
import { NearestDatumArgs } from '../types';

export default function findNearestDatumX<
  Datum = unknown,
  XScaleInput = unknown,
  YScaleInput = unknown
>({
  xScale: scale,
  xAccessor: accessor,
  svgMouseX: mouseCoord,
  data,
}: NearestDatumArgs<Datum, XScaleInput, YScaleInput>): {
  datum: Datum;
  index: number;
  distanceX: number;
  distanceY: number;
} | null {
  const { datum, distance, index } =
    findNearestDatumSingleDimension<Datum, XScaleInput>({
      scale,
      accessor,
      mouseCoord,
      data,
    }) ?? {};
  return datum ? { datum, index, distanceX: distance, distanceY: 0 } : null;
}
