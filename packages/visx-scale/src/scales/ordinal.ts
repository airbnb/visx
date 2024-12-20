import { scaleOrdinal } from '@visx/vendor/d3-scale';
import type { DefaultOutput, StringLike } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateOrdinalScale = scaleOperator<'ordinal'>('domain', 'range', 'reverse', 'unknown');

export default function createOrdinalScale<
  DiscreteInput extends StringLike = StringLike,
  Output = DefaultOutput,
>(config?: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>) {
  return updateOrdinalScale(scaleOrdinal<DiscreteInput, Output>(), config);
}
