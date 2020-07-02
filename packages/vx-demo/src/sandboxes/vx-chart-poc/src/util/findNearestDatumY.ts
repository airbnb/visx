import findNearestDatumSingleDimension from './findNearestDatumSingleDimension';
import { NearestDatumArgs } from '../types';

export default function findNearestDatumY<
  Datum = unknown,
  XScaleInput = unknown,
  YScaleInput = unknown
>({
  yScale: scale,
  yAccessor: accessor,
  svgMouseY: mouseCoord,
  data,
}: NearestDatumArgs<Datum, XScaleInput, YScaleInput>): {
  datum: Datum;
  index: number;
  distanceX: number;
  distanceY: number;
} | null {
  const { datum, distance, index } =
    findNearestDatumSingleDimension<Datum, YScaleInput>({
      scale,
      accessor,
      mouseCoord,
      data,
    }) ?? {};
  return datum ? { datum, index, distanceY: distance, distanceX: 0 } : null;
}
