import { scaleUtc } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { updateTimeScale } from './time';

export const updateUtcScale = updateTimeScale;

export default function createUtcScale<Output = Value>(
  config: PickScaleConfigWithoutType<'utc', Output>,
) {
  return updateUtcScale(scaleUtc<Output>(), config);
}
