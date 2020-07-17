import { InterpolatorFactory } from 'd3-scale';
import { Value } from '../types/Base';
import { D3Scale } from '../types/Scale';
import { ScaleInterpolate, ScaleInterpolateParams } from '../types/ScaleInterpolate';
import createColorInterpolator from '../util/createColorInterpolator';

export default function applyInterpolate<Output extends Value>(
  scale: D3Scale<Output>,
  config: { interpolate?: ScaleInterpolate | ScaleInterpolateParams },
) {
  if (config.interpolate && 'interpolate' in scale) {
    const interpolator = createColorInterpolator(config.interpolate);
    scale.interpolate((interpolator as unknown) as InterpolatorFactory<Output, Output>);
  }
}
