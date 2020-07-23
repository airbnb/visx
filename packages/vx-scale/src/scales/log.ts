import { scaleLog } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateLogScale = scaleOperator<'log'>(
  'domain',
  'range',
  'base',
  'clamp',
  'interpolate',
  'nice',
  'round',
);

export default function createLogScale<Output = Value>(
  config: PickScaleConfigWithoutType<'log', Output>,
) {
  return updateLogScale(scaleLog<Output>(), config);
}
