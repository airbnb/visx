import { scaleQuantile } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';

export function updateQuantileScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['quantile'],
  config: PickScaleConfigWithoutType<'quantile', Output>,
) {
  const { domain, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);

  applyInterpolate(scale, config);

  return scale;
}

export default function createQuantileScale<Output = Value>(
  config: PickScaleConfigWithoutType<'quantile', Output>,
) {
  return updateQuantileScale(scaleQuantile<Output>(), config);
}
