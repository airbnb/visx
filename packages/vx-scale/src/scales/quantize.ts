import { scaleQuantize } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';
import applyZero from '../mixins/applyZero';

export function updateQuantizeScale<Output extends Value = Value>(
  scale: PickD3Scale<'quantize', Output>,
  config: PickScaleConfigWithoutType<'quantize', Output>,
) {
  const { domain, range, nice = true } = config;

  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (range) scale.range(range);

  applyZero(scale, config);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'quantize';

  return scale;
}

export default function createQuantizeScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'quantize', Output>,
) {
  return updateQuantizeScale(scaleQuantize<Output>(), config);
}
