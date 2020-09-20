import { scaleSqrt } from 'd3-scale';
import { DefaultOutput } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateSqrtScale = scaleOperator<'sqrt'>(
  'domain',
  'range',
  'reverse',
  'clamp',
  'interpolate',
  'nice',
  'round',
  'zero',
);

export default function createSqrtScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  return updateSqrtScale(scaleSqrt<Output>(), config);
}
