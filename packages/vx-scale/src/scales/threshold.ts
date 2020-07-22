import { scaleThreshold } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale, DefaultThresholdInput } from '../types/Scale';

export function updateThresholdScale<
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Output = Value
>(
  scale: ScaleTypeToD3Scale<Output, StringLike, ThresholdInput>['threshold'],
  config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>,
) {
  const { domain, range } = config;

  if (domain) scale.domain(domain);
  if (range) scale.range(range);

  return scale;
}

export default function createThresholdScale<
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Output = Value
>(config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>) {
  return updateThresholdScale(scaleThreshold<ThresholdInput, Output>(), config);
}
