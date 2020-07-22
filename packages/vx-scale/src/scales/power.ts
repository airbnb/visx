import { scalePow } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import applyInterpolate from '../mixins/applyInterpolate';
import applyRound from '../mixins/applyRound';
import applyZero from '../mixins/applyZero';

export function updatePowScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['pow'],
  config: ScaleTypeToScaleConfig<Output>['pow'],
) {
  const { domain, range, clamp = false, exponent, nice = false } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  scale.clamp(clamp);
  if (exponent) scale.exponent(exponent);
  applyInterpolate(scale, config);
  applyRound(scale, config);
  applyZero(scale, config);

  // @ts-ignore
  scale.type = 'power';

  return scale;
}

export default function createPowScale<Output = Value>(
  config: ScaleTypeToScaleConfig<Output>['pow'],
) {
  return updatePowScale(scalePow<Output>(), config);
}
