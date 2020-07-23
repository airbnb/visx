import { interpolateRound } from 'd3-interpolate';
import { InterpolatorFactory } from 'd3-scale';
import { StringLike } from '../types/Base';
import { D3Scale, DefaultThresholdInput } from '../types/Scale';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyRound<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if ('round' in config && typeof config.round !== 'undefined') {
    if (config.round && 'interpolate' in config && typeof config.interpolate !== 'undefined') {
      console.warn(`can't round and interpolate`);
    } else if ('round' in scale) {
      scale.round(config.round);
    } else if ('interpolate' in scale && config.round) {
      scale.interpolate((interpolateRound as unknown) as InterpolatorFactory<Output, Output>);
    }
  }
}
