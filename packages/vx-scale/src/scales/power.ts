import { scalePow } from 'd3-scale';
import { Value } from '../types/Base';
import { PickD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updatePowScale<Output extends Value = Value>(
  scale: PickD3Scale<'pow', Output>,
  config: PickScaleConfigWithoutType<'pow', Output>,
) {
  const { domain, range, clamp = true, exponent, nice = true } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  if (exponent) scale.exponent(exponent);
  applyInterpolate(scale, config);
  applyRound(scale, config);
  applyZero(scale, config);

  // @ts-ignore
  scale.type = 'power';

  return scale;
}

export default function createPowScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'pow', Output>,
) {
  return updatePowScale(scalePow<Output>(), config);
}
