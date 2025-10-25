import { scalePow } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updatePowScale = scaleOperator<'pow'>(
  'domain',
  'range',
  'reverse',
  'clamp',
  'exponent',
  'interpolate',
  'nice',
  'round',
  'zero',
);

export default function createPowScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'pow', Output>,
) {
  return updatePowScale(scalePow<Output>(), config);
}
