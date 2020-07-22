import { scaleOrdinal } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';

export function updateOrdinalScale<DiscreteInput extends StringLike = StringLike, Output = Value>(
  scale: ScaleTypeToD3Scale<Output, DiscreteInput>['ordinal'],
  config: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>,
) {
  const { domain, range, unknown } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);
  if (unknown) scale.unknown(unknown);

  return scale;
}

export default function createOrdinalScale<
  DiscreteInput extends StringLike = StringLike,
  Output = Value
>(config: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>) {
  return updateOrdinalScale(scaleOrdinal<DiscreteInput, Output>(), config);
}
