import { scaleQuantile } from 'd3-scale';
import { Value } from '../types/Base';
import { PickD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';

export function updateQuantileScale<Output extends Value = Value>(
  scale: PickD3Scale<'quantile', Output>,
  config: PickScaleConfigWithoutType<'quantile', Output>,
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
  config: PickScaleConfigWithoutType<'quantile', Output>,
) {
  return updateQuantileScale(scaleQuantile<Output>(), config);
}
