import { scaleQuantize } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateQuantizeScale = scaleOperator<'quantize'>(
  'domain',
  'range',
  'reverse',
  'nice',
  'zero',
);

export default function createQuantizeScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'quantize', Output>,
) {
  return updateQuantizeScale(scaleQuantize<Output>(), config);
}
