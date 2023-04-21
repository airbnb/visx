import clampNumber from './clampNumber';
import getClosestPoint from './getClosestPoint';

/** Restrict a point to an area, or samples along a path. */
export default function restrictPoint(point, samples, restrict) {
  var _restrict$xMin, _restrict$xMax, _restrict$yMin, _restrict$yMax;
  if (restrict === void 0) {
    restrict = {};
  }
  if (samples.length > 0) {
    return getClosestPoint(point, samples);
  }
  return {
    x: clampNumber(point.x, (_restrict$xMin = restrict.xMin) != null ? _restrict$xMin : -Infinity, (_restrict$xMax = restrict.xMax) != null ? _restrict$xMax : Infinity),
    y: clampNumber(point.y, (_restrict$yMin = restrict.yMin) != null ? _restrict$yMin : -Infinity, (_restrict$yMax = restrict.yMax) != null ? _restrict$yMax : Infinity)
  };
}