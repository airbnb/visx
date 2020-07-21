import { scaleOrdinal } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';

export function updateOrdinalScale<
  DiscreteInput extends StringLike = StringLike,
  Output extends Value = Value
>(
  scale: PickD3Scale<'ordinal', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>,
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

export default function createOrdinalScale<
  DiscreteInput extends StringLike = StringLike,
  Output extends Value = Value
>(config: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>) {
  return updateOrdinalScale(scaleOrdinal<DiscreteInput, Output>(), config);
}
