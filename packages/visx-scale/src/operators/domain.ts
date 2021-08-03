import { DefaultThresholdInput, D3Scale } from '../types/Scale';
import { StringLike } from '../types/Base';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyDomain<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if (config.domain) {
    if ('nice' in scale || 'quantiles' in scale) {
      // continuous input scales
      scale.domain(config.domain as number[] | Date[]);
    } else if ('padding' in scale) {
      // point and band scales
      scale.domain(config.domain as DiscreteInput[]);
    } else {
      // ordinal and threshold scale
      scale.domain(config.domain as ThresholdInput[]);
    }
  }
}
