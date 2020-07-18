import { scaleBand } from 'd3-scale';
import { Value, HasToString } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';
import applyRound from '../mixins/applyRound';

export function updateBandScale<Output extends Value = Value>(
  scale: PickD3Scale<'band', Output>,
  config: PickScaleConfigWithoutType<'band', Output>,
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

export default function createBandScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'band', Output>,
) {
  return updateBandScale(scaleBand<HasToString>(), config);
}
