import { scaleLog } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';

export function updateLogScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['log'],
  config: PickScaleConfigWithoutType<'log', Output>,
) {
  const { domain, range, base, clamp = false, nice = false } = config;

  if (base) scale.base(base);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  applyInterpolate(scale, config);
  applyRound(scale, config);

  return scale;
}

export default function createLogScale<Output = Value>(
  config: PickScaleConfigWithoutType<'log', Output>,
) {
  return updateLogScale(scaleLog<Output>(), config);
}
