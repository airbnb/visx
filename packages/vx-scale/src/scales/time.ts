import { scaleTime } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateTimeScale<Output extends Value = Value>(
  scale: PickD3Scale<'time', Output>,
  config: PickScaleConfigWithoutType<'time', Output>,
) {
  const { domain, range, clamp = true, nice = true } = config;

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

export default function createTimeScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'time', Output>,
) {
  return updateTimeScale(scaleTime<Output>(), config);
}
