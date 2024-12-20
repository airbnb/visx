import { scaleLinear } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateLinearScale = scaleOperator<'linear'>(
  'domain',
  'range',
  'reverse',
  'clamp',
  'interpolate',
  'nice',
  'round',
  'zero',
);

export default function createLinearScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'linear', Output>,
) {
  return updateLinearScale(scaleLinear<Output>(), config);
}
