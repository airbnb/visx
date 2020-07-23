import { scaleQuantize } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateQuantizeScale = scaleOperator<'quantize'>('domain', 'range', 'nice', 'zero');

export default function createQuantizeScale<Output = Value>(
  config: PickScaleConfigWithoutType<'quantize', Output>,
) {
  return updateQuantizeScale(scaleQuantize<Output>(), config);
}
