import { scaleSymlog } from 'd3-scale';
import { Value } from '../types/Base';
import { PickD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updateSymlogScale<Output extends Value = Value>(
  scale: PickD3Scale<'symlog', Output>,
  config: PickScaleConfigWithoutType<'symlog', Output>,
) {
  const { domain, range, clamp = true, nice = true } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyRound(scale, config);
  applyZero(scale, config);

  // @ts-ignore
  scale.type = 'symlog';

  return scale;
}

export default function createSymlogScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'symlog', Output>,
) {
  return updateSymlogScale(scaleSymlog<Output>(), config);
}
