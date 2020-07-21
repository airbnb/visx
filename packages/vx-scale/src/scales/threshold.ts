import { scaleThreshold } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { ScaleTypeToScaleConfig } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';

export function updateThresholdScale<
  ThresholdInput extends number | string | Date = number | string | Date,
  Output extends Value = Value
>(
  scale: ScaleTypeToD3Scale<Output, StringLike, ThresholdInput>['threshold'],
  config: ScaleTypeToScaleConfig<Output, StringLike, ThresholdInput>['threshold'],
) {
  const { domain, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'threshold';

  return scale;
}

export default function createThresholdScale<
  ThresholdInput extends number | string | Date = number | string | Date,
  Output extends Value = Value
>(config: ScaleTypeToScaleConfig<Output, StringLike, ThresholdInput>['threshold']) {
  return updateThresholdScale(scaleThreshold<ThresholdInput, Output>(), config);
}
