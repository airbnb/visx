import { scaleTime } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateTimeScale = scaleOperator<'time'>(
  'domain',
  'range',
  'clamp',
  'interpolate',
  'nice',
  'round',
);

export default function createTimeScale<Output = Value>(
  config: PickScaleConfigWithoutType<'time', Output>,
) {
  return updateTimeScale(scaleTime<Output>(), config);
}
