import { scaleLog } from 'd3-scale';
import { Value } from '../types/Base';
import { PickD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateLogScale<Output extends Value = Value>(
  scale: PickD3Scale<'log', Output>,
  config: PickScaleConfigWithoutType<'log', Output>,
) {
  const { domain, range, base, clamp = true, nice = true } = config;

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
  config: PickScaleConfigWithoutType<'log', Output>,
) {
  return updateLogScale(scaleLog<Output>(), config);
}
