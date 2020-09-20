import { scaleUtc } from 'd3-scale';
import { DefaultOutput } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateUtcScale = scaleOperator<'utc'>(
  'domain',
  'range',
  'reverse',
  'clamp',
  'interpolate',
  'nice',
  'round',
);

export default function createUtcScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'utc', Output>,
) {
  return updateUtcScale(scaleUtc<Output>(), config);
}
