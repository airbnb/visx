import { scaleQuantile } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateQuantileScale = scaleOperator<'quantile'>('domain', 'range');

export default function createQuantileScale<Output = Value>(
  config: PickScaleConfigWithoutType<'quantile', Output>,
) {
  return updateQuantileScale(scaleQuantile<Output>(), config);
}
