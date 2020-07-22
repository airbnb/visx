import { interpolateRound } from 'd3-interpolate';
import { InterpolatorFactory } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { D3Scale, DefaultThresholdInput } from '../types/Scale';

export default function applyRound<
  Output = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(scale: D3Scale<Output, DiscreteInput, ThresholdInput>, config: { round?: boolean }) {
  if (typeof config.round !== 'undefined') {
    if ('round' in scale) {
      scale.round(config.round);
    } else if ('interpolate' in scale && config.round) {
      scale.interpolate((interpolateRound as unknown) as InterpolatorFactory<Output, Output>);
    }
  }
}
