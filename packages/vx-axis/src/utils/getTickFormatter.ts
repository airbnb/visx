import { StringLike, DefaultThresholdInput, D3Scale, DefaultOutput } from '@vx/scale';
import { TickFormatter } from '../types';

/**
 * Returns a tick position for the given tick value
 */
export default function getTickFormatter<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Scale extends D3Scale<Output, DiscreteInput, ThresholdInput> = D3Scale<
    Output,
    DiscreteInput,
    ThresholdInput
  >
>(scale: Scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  const s = scale as D3Scale<Output>;

  // For point or band scales,
  // have to add offset to make the tick centered.
  if ('tickFormat' in s) {
    return s.tickFormat() as TickFormatter<Parameters<Scale>[0]>;
  }

  return toString as TickFormatter<Parameters<Scale>[0]>;
}

// import { StringLike, DefaultThresholdInput } from '@vx/scale';
// import { AxisScale, TickFormatter, AxisScaleOutput } from '../types';

// /**
//  * Returns a tick position for the given tick value
//  */
// export default function getTickFormatter<
//   Output extends AxisScaleOutput,
//   DiscreteInput extends StringLike,
//   ThresholdInput extends DefaultThresholdInput
// >(scale: AxisScale<Output, DiscreteInput, ThresholdInput>) {
//   type Scale = AxisScale<Output, DiscreteInput, ThresholdInput>;

//   // For point or band scales,
//   // have to add offset to make the tick centered.
//   if ('tickFormat' in scale) {
//     return scale.tickFormat() as TickFormatter<Parameters<Scale>[0]>;
//   }

//   return toString as TickFormatter<Parameters<Scale>[0]>;
// }
