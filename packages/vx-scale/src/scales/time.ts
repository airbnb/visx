import { scaleTime } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateTimeScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['time'],
  config: PickScaleConfigWithoutType<'time', Output>,
) {
  const { domain, range, clamp = false, nice = false } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyInterpolate(scale, config);
  applyRound(scale, config);

  return scale;
}

export default function createTimeScale<Output = Value>(
  config: PickScaleConfigWithoutType<'time', Output>,
) {
  return updateTimeScale(scaleTime<Output>(), config);
}
