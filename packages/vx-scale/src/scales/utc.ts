import { scaleUtc } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateUtcScale<Output extends Value = Value>(
  scale: ScaleTypeToD3Scale<Output>['utc'],
  config: ScaleTypeToScaleConfig<Output>['utc'],
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
  scale.type = 'utc';

  return scale;
}

export default function createUtcScale<Output extends Value = Value>(
  config: ScaleTypeToScaleConfig<Output>['utc'],
) {
  return updateUtcScale(scaleUtc<Output>(), config);
}
