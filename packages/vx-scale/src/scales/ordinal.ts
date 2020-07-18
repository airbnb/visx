import { scaleOrdinal } from 'd3-scale';
import { Value, HasToString } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';

export function updateOrdinalScale<Output extends Value = Value>(
  scale: PickD3Scale<'ordinal', Output>,
  config: PickScaleConfigWithoutType<'ordinal', Output>,
) {
  const { domain, range, unknown } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);
  if (unknown) scale.unknown(unknown);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'ordinal';

  return scale;
}

export default function createOrdinalScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'ordinal', Output>,
) {
  return updateOrdinalScale(scaleOrdinal<HasToString, Output>(), config);
}
