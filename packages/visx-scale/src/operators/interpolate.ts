import { InterpolatorFactory } from 'd3-scale';
import { StringLike } from '../types/Base';
import { D3Scale, DefaultThresholdInput } from '../types/Scale';
import createColorInterpolator from '../utils/createColorInterpolator';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyInterpolate<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if (
    'interpolate' in config &&
    'interpolate' in scale &&
    typeof config.interpolate !== 'undefined'
  ) {
    const interpolator = createColorInterpolator(config.interpolate);
    scale.interpolate(interpolator as unknown as InterpolatorFactory<Output, Output>);
  }
}
