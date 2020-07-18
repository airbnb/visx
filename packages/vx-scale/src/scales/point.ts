import { scalePoint } from 'd3-scale';
import { Value, HasToString } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';
import applyRound from '../mixins/applyRound';

export function updatePointScale<Output extends Value = Value>(
  scale: PickD3Scale<'point', Output>,
  config: PickScaleConfigWithoutType<'point', Output>,
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

export default function createPointScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'point', Output>,
) {
  return updatePointScale(scalePoint<HasToString>(), config);
}
