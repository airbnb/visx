import { scaleUtc } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateUtcScale<Output extends Value = Value>(
  scale: PickD3Scale<'utc', Output>,
  config: PickScaleConfigWithoutType<'utc', Output>,
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
  scale.type = 'utc';

  return scale;
}

export default function createUtcScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'utc', Output>,
) {
  return updateUtcScale(scaleUtc<Output>(), config);
}
