import { scaleSymlog } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updateSymlogScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['symlog'],
  config: ScaleTypeToScaleConfig<Output>['symlog'],
) {
  const { domain, range, clamp = false, nice = false } = config;

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

export default function createSymlogScale<Output = Value>(
  config: ScaleTypeToScaleConfig<Output>['symlog'],
) {
  return updateSymlogScale(scaleSymlog<Output>(), config);
}
