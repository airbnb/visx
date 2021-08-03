import { DefaultThresholdInput, D3Scale } from '../types/Scale';
import { StringLike } from '../types/Base';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyPadding<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if ('padding' in scale && 'padding' in config && typeof config.padding !== 'undefined') {
    scale.padding(config.padding);
  }
  if (
    'paddingInner' in scale &&
    'paddingInner' in config &&
    typeof config.paddingInner !== 'undefined'
  ) {
    scale.paddingInner(config.paddingInner);
  }
  if (
    'paddingOuter' in scale &&
    'paddingOuter' in config &&
    typeof config.paddingOuter !== 'undefined'
  ) {
    scale.paddingOuter(config.paddingOuter);
  }
}
