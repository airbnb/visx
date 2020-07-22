import { scaleQuantile } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';

export function updateQuantileScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['quantile'],
  config: PickScaleConfigWithoutType<'quantile', Output>,
) {
  const { domain, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);

  return scale;
}

export default function createQuantileScale<Output = Value>(
  config: PickScaleConfigWithoutType<'quantile', Output>,
) {
  return updateQuantileScale(scaleQuantile<Output>(), config);
}
