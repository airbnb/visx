import { scaleQuantize } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyZero from '../mixins/applyZero';

export function updateQuantizeScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['quantize'],
  config: ScaleTypeToScaleConfig<Output>['quantize'],
) {
  const { domain, range, nice = false } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  applyZero(scale, config);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'quantize';

  return scale;
}

export default function createQuantizeScale<Output = Value>(
  config: ScaleTypeToScaleConfig<Output>['quantize'],
) {
  return updateQuantizeScale(scaleQuantize<Output>(), config);
}
