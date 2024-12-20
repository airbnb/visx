import type { ScaleInput } from '@visx/scale';
import type { AxisScale, AxisScaleOutput } from '../types';

/**
 * Create a function that returns a tick position for the given tick value
 */
export default function getTickPosition<Scale extends AxisScale>(
  scale: Scale,
  align: 'start' | 'center' | 'end' = 'center',
) {
  // Broaden type before using 'xxx' in s as typeguard.
  const s = scale as AxisScale;

  // For point or band scales,
  // have to add offset to make the tick at center or end.
  if (align !== 'start' && 'bandwidth' in s) {
    let offset = s.bandwidth();
    if (align === 'center') offset /= 2;
    if (s.round()) offset = Math.round(offset);
    return (d: ScaleInput<Scale>) => {
      const scaledValue = s(d);

      return typeof scaledValue === 'number' ? scaledValue + offset : scaledValue;
    };
  }

  return scale as (d: ScaleInput<Scale>) => AxisScaleOutput;
}
