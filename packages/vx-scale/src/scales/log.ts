import { scaleLog } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateLogScale<Output extends Value = Value>(
  scale: ScaleTypeToD3Scale<Output>['log'],
  config: ScaleTypeToScaleConfig<Output>['log'],
) {
  const { domain, range, base, clamp = false, nice = false } = config;

  if (base) scale.base(base);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyInterpolate(scale, config);
  applyRound(scale, config);

  // @ts-ignore
  scale.type = 'log';

  return scale;
}

export default function createLogScale<Output extends Value = Value>(
  config: ScaleTypeToScaleConfig<Output>['log'],
) {
  return updateLogScale(scaleLog<Output>(), config);
}
