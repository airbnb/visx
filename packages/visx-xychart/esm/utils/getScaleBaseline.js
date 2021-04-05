import { coerceNumber } from '@visx/scale';
import isValidNumber from '../typeguards/isValidNumber';
/**
 * Returns the output value of a scale's baseline value, which is either zero
 * or the minimum scale value if its domain doesn't include zero.
 */

export default function getScaleBaseline(scale) {
  var _scale$range$map = scale.range().map(function (rangeBoundary) {
    var _coerceNumber;

    return (_coerceNumber = coerceNumber(rangeBoundary)) != null ? _coerceNumber : 0;
  }),
      a = _scale$range$map[0],
      b = _scale$range$map[1];

  var isDescending = a != null && b != null && b < a;
  var maybeScaleZero = scale(0);

  var _ref = isDescending ? [b, a] : [a, b],
      minOutput = _ref[0],
      maxOutput = _ref[1]; // if maybeScaleZero _is_ a number, but the scale is not clamped and it's outside the domain
  // fallback to the scale's minimum


  return isDescending ? isValidNumber(maybeScaleZero) ? Math.min(Math.max(minOutput, maybeScaleZero), maxOutput) : maxOutput : isValidNumber(maybeScaleZero) ? Math.max(maybeScaleZero, minOutput) : minOutput;
}