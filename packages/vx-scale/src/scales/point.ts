import { scalePoint } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyRound from '../mixins/applyRound';

export function updatePointScale<DiscreteInput extends StringLike = StringLike>(
  scale: ScaleTypeToD3Scale<Value, DiscreteInput>['point'],
  config: PickScaleConfigWithoutType<'point', Value, DiscreteInput>,
) {
  const { align, domain, padding, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);
  if (typeof padding !== 'undefined') scale.padding(padding);
  if (typeof align !== 'undefined') scale.align(align);
  applyRound(scale, config);

  return scale;
}

export default function createPointScale<DiscreteInput extends StringLike = StringLike>(
  config: PickScaleConfigWithoutType<'point', Value, DiscreteInput>,
) {
  return updatePointScale(scalePoint<DiscreteInput>(), config);
}
