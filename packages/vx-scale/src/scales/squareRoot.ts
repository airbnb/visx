import { scaleSqrt } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateSqrtScale = scaleOperator<'sqrt'>(
  'domain',
  'range',
  'clamp',
  'interpolate',
  'nice',
  'round',
  'zero',
);

export default function createSqrtScale<Output = Value>(
  config: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  return updateSqrtScale(scaleSqrt<Output>(), config);
}
