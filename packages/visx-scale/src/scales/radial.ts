import { scaleRadial } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
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
