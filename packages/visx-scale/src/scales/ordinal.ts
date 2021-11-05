import { scaleOrdinal } from 'd3-scale';
import { DefaultOutput, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateOrdinalScale = scaleOperator<'ordinal'>('domain', 'range', 'reverse', 'unknown');

export default function createOrdinalScale<
  DiscreteInput extends StringLike = StringLike,
  Output = DefaultOutput,
>(config?: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>) {
  return updateOrdinalScale(scaleOrdinal<DiscreteInput, Output>(), config);
}
