import { scaleQuantile } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';

export function updateQuantileScale<Output extends Value = Value>(
  scale: ScaleTypeToD3Scale<Output>['quantile'],
  config: ScaleTypeToScaleConfig<Output>['quantile'],
) {
  const { domain, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);

  applyInterpolate(scale, config);

  // @ts-ignore
  scale.type = 'quantile';

  return scale;
}

export default function createQuantileScale<Output extends Value = Value>(
  config: ScaleTypeToScaleConfig<Output>['quantile'],
) {
  return updateQuantileScale(scaleQuantile<Output>(), config);
}
