import { StringLike, DefaultThresholdInput } from '@vx/scale';
import { AxisScale, AxisScaleOutput } from '../types';

/**
 * Create a function that returns a tick position for the given tick value
 */
export default function getTickPosition<
  Output extends AxisScaleOutput,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
  Scale extends AxisScale<Output, DiscreteInput, ThresholdInput>
>(scale: Scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  const s = scale as AxisScale;

  // For point or band scales,
  // have to add offset to make the tick centered.
  if ('bandwidth' in s) {
    let offset = s.bandwidth() / 2;
    if (s.round()) offset = Math.round(offset);
    return (d: Parameters<Scale>[0]) => {
      const scaledValue = s(d);

      return typeof scaledValue === 'number' ? scaledValue + offset : scaledValue;
    };
  }

  return scale as (d: Parameters<Scale>[0]) => AxisScaleOutput;
}
