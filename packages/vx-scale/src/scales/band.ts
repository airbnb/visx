import { scaleBand } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import applyRound from '../mixins/applyRound';

export function updateBandScale<DiscreteInput extends StringLike = StringLike>(
  scale: ScaleTypeToD3Scale<Value, DiscreteInput>['band'],
  config: PickScaleConfigWithoutType<'band', Value, DiscreteInput>,
) {
  const { align, domain, padding, paddingInner, paddingOuter, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);
  if (typeof padding !== 'undefined') scale.padding(padding);
  if (typeof paddingInner !== 'undefined') scale.paddingInner(paddingInner);
  if (typeof paddingOuter !== 'undefined') scale.paddingOuter(paddingOuter);
  if (typeof align !== 'undefined') scale.align(align);
  applyRound(scale, config);

  return scale;
}

export default function createBandScale<DiscreteInput extends StringLike = StringLike>(
  config: PickScaleConfigWithoutType<'band', Value, DiscreteInput>,
) {
  return updateBandScale(scaleBand<DiscreteInput>(), config);
}
