import type { DefaultThresholdInput, D3Scale } from '../types/Scale';
import type { StringLike } from '../types/Base';
import type { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyExponent<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if ('exponent' in scale && 'exponent' in config && typeof config.exponent !== 'undefined') {
    scale.exponent(config.exponent);
  }
}
