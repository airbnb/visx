import type { UseDragOptions } from '../useDrag';
import clampNumber from './clampNumber';
import getClosestPoint from './getClosestPoint';

/** Restrict a point to an area, or samples along a path. */
export default function restrictPoint(
  point: { x: number; y: number },
  samples: DOMPoint[],
  restrict: UseDragOptions['restrict'] = {},
) {
  if (samples.length > 0) {
    return getClosestPoint(point, samples);
  }
  return {
    x: clampNumber(point.x, restrict.xMin ?? -Infinity, restrict.xMax ?? Infinity),
    y: clampNumber(point.y, restrict.yMin ?? -Infinity, restrict.yMax ?? Infinity),
  };
}
