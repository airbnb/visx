import { scalePow } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updatePowScale = scaleOperator<'pow'>(
  'domain',
  'range',
  'clamp',
  'exponent',
  'interpolate',
  'nice',
  'round',
  'zero',
);

export default function createPowScale<Output = Value>(
  config: PickScaleConfigWithoutType<'pow', Output>,
) {
  return updatePowScale(scalePow<Output>(), config);
}
