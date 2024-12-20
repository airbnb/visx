import type { DefaultThresholdInput, D3Scale } from '../types/Scale';
import type { StringLike } from '../types/Base';
import type { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyConstant<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if ('constant' in scale && 'constant' in config && typeof config.constant !== 'undefined') {
    scale.constant(config.constant);
  }
}
