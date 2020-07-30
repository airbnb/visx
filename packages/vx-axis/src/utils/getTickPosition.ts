import { AxisScale, AxisScaleOutput, TickValue } from '../types';

/**
 * Create a function that returns a tick position for the given tick value
 */
export default function getTickPosition<Scale extends AxisScale>(scale: Scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  const s = scale as AxisScale;

  // For point or band scales,
  // have to add offset to make the tick centered.
  if ('bandwidth' in s) {
    let offset = s.bandwidth() / 2;
    if (s.round()) offset = Math.round(offset);
    return (d: TickValue<Scale>) => {
      const scaledValue = s(d);

      return typeof scaledValue === 'number' ? scaledValue + offset : scaledValue;
    };
  }

  return scale as (d: TickValue<Scale>) => AxisScaleOutput;
}
