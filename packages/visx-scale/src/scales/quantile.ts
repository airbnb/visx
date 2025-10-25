import { scaleQuantile } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateQuantileScale = scaleOperator<'quantile'>('domain', 'range', 'reverse');

export default function createQuantileScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'quantile', Output>,
) {
  return updateQuantileScale(scaleQuantile<Output>(), config);
}
