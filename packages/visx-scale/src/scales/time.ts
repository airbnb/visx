import { scaleTime } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateTimeScale = scaleOperator<'time'>(
  'domain',
  'range',
  'reverse',
  'clamp',
  'interpolate',
  'nice',
  'round',
);

export default function createTimeScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'time', Output>,
) {
  return updateTimeScale(scaleTime<Output>(), config);
}
