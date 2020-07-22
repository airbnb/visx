import { scaleSqrt } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updateSqrtScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['sqrt'],
  config: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  const { domain, range, clamp = false, nice = false } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyInterpolate(scale, config);
  applyRound(scale, config);
  applyZero(scale, config);

  return scale;
}

export default function createSqrtScale<Output = Value>(
  config: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  return updateSqrtScale(scaleSqrt<Output>(), config);
}
