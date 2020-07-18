import { scaleThreshold } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { PickD3Scale } from '../types/Scale';

export function updateThresholdScale<Output extends Value = Value>(
  scale: PickD3Scale<'threshold', Output>,
  config: PickScaleConfigWithoutType<'threshold', Output>,
) {
  const { domain, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);

  // TODO: Remove?
  // @ts-ignore
  scale.type = 'threshold';

  return scale;
}

export default function createThresholdScale<Output extends Value = Value>(
  config: PickScaleConfigWithoutType<'threshold', Output>,
) {
  return updateThresholdScale(scaleThreshold<number | string | Date, Output>(), config);
}
