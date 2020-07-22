import { scaleLinear } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';
import { ScaleTypeToD3Scale } from '../types/Scale';

export function updateLinearScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['linear'],
  config: PickScaleConfigWithoutType<'linear', Output>,
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

export default function createLinearScale<Output = Value>(
  config: PickScaleConfigWithoutType<'linear', Output>,
) {
  return updateLinearScale(scaleLinear<Output>(), config);
}
