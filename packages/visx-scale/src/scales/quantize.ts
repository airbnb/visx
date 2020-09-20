import { scaleQuantize } from 'd3-scale';
import { DefaultOutput } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
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
