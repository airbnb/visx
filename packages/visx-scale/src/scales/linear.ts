import { scaleLinear } from 'd3-scale';
import { DefaultOutput } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
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
