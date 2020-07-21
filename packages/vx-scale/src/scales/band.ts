import { scaleBand } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyRound from '../mixins/applyRound';

export function updateBandScale<DiscreteInput extends StringLike = StringLike>(
  scale: ScaleTypeToD3Scale<Value, DiscreteInput>['band'],
  config: ScaleTypeToScaleConfig<Value, DiscreteInput>['band'],
) {
  const { align, domain, padding, paddingInner, paddingOuter, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);
  if (typeof padding !== 'undefined') scale.padding(padding);
  if (typeof paddingInner !== 'undefined') scale.paddingInner(paddingInner);
  if (typeof paddingOuter !== 'undefined') scale.paddingOuter(paddingOuter);
  if (typeof align !== 'undefined') scale.align(align);
  applyRound(scale, config);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'band';

  return scale;
}

export default function createBandScale<DiscreteInput extends StringLike = StringLike>(
  config: ScaleTypeToScaleConfig<Value, DiscreteInput>['band'],
) {
  return updateBandScale(scaleBand<DiscreteInput>(), config);
}
