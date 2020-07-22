import { scaleOrdinal } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';

export function updateOrdinalScale<DiscreteInput extends StringLike = StringLike, Output = Value>(
  scale: ScaleTypeToD3Scale<Output, DiscreteInput>['ordinal'],
  config: ScaleTypeToScaleConfig<Output, DiscreteInput>['ordinal'],
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
  Output = Value
>(config: ScaleTypeToScaleConfig<Output, DiscreteInput>['ordinal']) {
  return updateOrdinalScale(scaleOrdinal<DiscreteInput, Output>(), config);
}
