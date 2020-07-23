import { scaleBand } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateBandScale = scaleOperator<'band'>(
  'domain',
  'range',
  'align',
  'padding',
  'round',
);

export default function createBandScale<DiscreteInput extends StringLike = StringLike>(
  config: PickScaleConfigWithoutType<'band', Value, DiscreteInput>,
) {
  return updateBandScale(scaleBand<DiscreteInput>(), config);
}
