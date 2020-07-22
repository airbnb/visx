import { scaleTime } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateTimeScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['time'],
  config: ScaleTypeToScaleConfig<Output>['time'],
) {
  const { domain, range, clamp = false, nice = false } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyInterpolate(scale, config);
  applyRound(scale, config);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'time';

  return scale;
}

export default function createTimeScale<Output = Value>(
  config: ScaleTypeToScaleConfig<Output>['time'],
) {
  return updateTimeScale(scaleTime<Output>(), config);
}
