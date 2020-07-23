import { scaleLinear } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateLinearScale = scaleOperator<'linear'>(
  'domain',
  'range',
  'clamp',
  'interpolate',
  'nice',
  'round',
  'zero',
);

export default function createLinearScale<Output = Value>(
  config: PickScaleConfigWithoutType<'linear', Output>,
) {
  return updateLinearScale(scaleLinear<Output>(), config);
}
