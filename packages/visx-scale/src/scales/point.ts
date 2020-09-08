import { scalePoint } from 'd3-scale';
import { DefaultOutput, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updatePointScale = scaleOperator<'point'>(
  'domain',
  'range',
  'reverse',
  'align',
  'padding',
  'round',
);

export default function createPointScale<DiscreteInput extends StringLike = StringLike>(
  config?: PickScaleConfigWithoutType<'point', DefaultOutput, DiscreteInput>,
) {
  return updatePointScale(scalePoint<DiscreteInput>(), config);
}
