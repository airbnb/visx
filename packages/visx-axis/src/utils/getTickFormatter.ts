import type { ScaleInput } from '@visx/scale';
import { toString } from '@visx/scale';
import type { TickFormatter, AxisScale } from '../types';

/**
 * Returns a tick position for the given tick value
 */
export default function getTickFormatter<Scale extends AxisScale>(scale: Scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  const s = scale as AxisScale;

  // For point or band scales,
  // have to add offset to make the tick centered.
  if ('tickFormat' in s) {
    return s.tickFormat() as TickFormatter<ScaleInput<Scale>>;
  }

  return toString as TickFormatter<ScaleInput<Scale>>;
}
