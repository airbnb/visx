import { scaleSymlog } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updateSymlogScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['symlog'],
  config: PickScaleConfigWithoutType<'symlog', Output>,
) {
  const { domain, range, clamp = false, nice = false } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyRound(scale, config);
  applyZero(scale, config);

  return scale;
}

export default function createSymlogScale<Output = Value>(
  config: PickScaleConfigWithoutType<'symlog', Output>,
) {
  return updateSymlogScale(scaleSymlog<Output>(), config);
}
