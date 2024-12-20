import type { DefaultThresholdInput, D3Scale } from '../types/Scale';
import type { StringLike } from '../types/Base';
import type { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyRange<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if (config.range) {
    if ('padding' in scale) {
      // point and band scales
      scale.range(config.range as [number, number]);
    } else {
      // the rest
      scale.range(config.range as Output[]);
    }
  }
}
