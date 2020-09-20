import { scaleBand } from 'd3-scale';
import { DefaultOutput, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateBandScale = scaleOperator<'band'>(
  'domain',
  'range',
  'reverse',
  'align',
  'padding',
  'round',
);

export default function createBandScale<DiscreteInput extends StringLike = StringLike>(
  config?: PickScaleConfigWithoutType<'band', DefaultOutput, DiscreteInput>,
) {
  return updateBandScale(scaleBand<DiscreteInput>(), config);
}
