import { scaleSqrt } from 'd3-scale';
import { Value } from '../types/Base';
import { PickD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updateSqrtScale<Output extends Value = Value>(
  scale: PickD3Scale<'sqrt', Output>,
  config: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  const { domain, range, clamp = true, nice = true } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyInterpolate(scale, config);
  applyRound(scale, config);
  applyZero(scale, config);

  // @ts-ignore
  scale.type = 'squareRoot';

  return scale;
}

export default function createSqrtScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  return updateSqrtScale(scaleSqrt<Output>(), config);
}
