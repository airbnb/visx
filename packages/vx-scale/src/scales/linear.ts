import { scaleLinear } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updateLinearScale<Output extends Value = Value>(
  scale: ScaleTypeToD3Scale<Output>['linear'],
  config: ScaleTypeToScaleConfig<Output>['linear'],
) {
  const { domain, range, clamp = false, nice = false } = config;

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
  config: ScaleTypeToScaleConfig<Output>['linear'],
) {
  return updateLinearScale(scaleLinear<Output>(), config);
}
