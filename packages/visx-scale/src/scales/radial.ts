import { scaleRadial } from 'd3-scale';
import { DefaultOutput } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateRadialScale = scaleOperator<'radial'>(
  'domain',
  'range',
  'clamp',
  'nice',
  'round',
  'unknown',
);

export default function createRadialScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'radial', Output>,
) {
  return updateRadialScale(scaleRadial<Output>(), config);
}
