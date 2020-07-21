import { scalePoint } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyRound from '../mixins/applyRound';

export function updatePointScale<DiscreteInput extends StringLike = StringLike>(
  scale: ScaleTypeToD3Scale<Value, DiscreteInput>['point'],
  config: ScaleTypeToScaleConfig<Value, DiscreteInput>['point'],
) {
  const { align, domain, padding, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);
  if (typeof padding !== 'undefined') scale.padding(padding);
  if (typeof align !== 'undefined') scale.align(align);
  applyRound(scale, config);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'point';

  return scale;
}

export default function createPointScale<DiscreteInput extends StringLike = StringLike>(
  config: ScaleTypeToScaleConfig<Value, DiscreteInput>['point'],
) {
  return updatePointScale(scalePoint<DiscreteInput>(), config);
}
