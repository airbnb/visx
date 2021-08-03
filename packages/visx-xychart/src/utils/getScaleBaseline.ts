import { AxisScale } from '@visx/axis';
import { coerceNumber } from '@visx/scale';
import isValidNumber from '../typeguards/isValidNumber';

/**
 * Returns the output value of a scale's baseline value, which is either zero
 * or the minimum scale value if its domain doesn't include zero.
 */
export default function getScaleBaseline<Scale extends AxisScale>(scale: Scale) {
  const [a, b] = scale.range().map((rangeBoundary) => coerceNumber(rangeBoundary) ?? 0);
  const isDescending = a != null && b != null && b < a;
  const maybeScaleZero = scale(0);
  const [minOutput, maxOutput] = isDescending ? [b, a] : [a, b];

  // if maybeScaleZero _is_ a number, but the scale is not clamped and it's outside the domain
  // fallback to the scale's minimum
  return isDescending
    ? isValidNumber(maybeScaleZero)
      ? Math.min(Math.max(minOutput, maybeScaleZero), maxOutput)
      : maxOutput
    : isValidNumber(maybeScaleZero)
    ? Math.max(maybeScaleZero, minOutput)
    : minOutput;
}
