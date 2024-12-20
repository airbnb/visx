import { scaleLog } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateLogScale = scaleOperator<'log'>(
  'domain',
  'range',
  'reverse',
  'base',
  'clamp',
  'interpolate',
  'nice',
  'round',
);

export default function createLogScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'log', Output>,
) {
  return updateLogScale(scaleLog<Output>(), config);
}
