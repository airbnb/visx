import { scaleThreshold } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';

export function updateThresholdScale<
  ThresholdInput extends number | string | Date = number | string | Date,
  Output extends Value = Value
>(
  scale: PickD3Scale<'threshold', Output, StringLike, ThresholdInput>,
  config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>,
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
>(config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>) {
  return updateThresholdScale(scaleThreshold<ThresholdInput, Output>(), config);
}
