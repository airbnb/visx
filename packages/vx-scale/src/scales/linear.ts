import { scaleLinear } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updateLinearScale<Output extends Value = Value>(
  scale: PickD3Scale<'linear', Output>,
  config: PickScaleConfigWithoutType<'linear', Output>,
) {
  const { domain, range, clamp = true, nice = true } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyInterpolate(scale, config);
  applyRound(scale, config);
  applyZero(scale, config);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'linear';

  return scale;
}

export default function createLinearScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'linear', Output>,
) {
  return updateLinearScale(scaleLinear<Output>(), config);
}
