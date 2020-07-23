import { scaleThreshold } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { DefaultThresholdInput } from '../types/Scale';
import scaleOperator from '../operators/scaleOperator';

export const updateThresholdScale = scaleOperator<'threshold'>('domain', 'range');

export default function createThresholdScale<
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Output = Value
>(config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>) {
  return updateThresholdScale(scaleThreshold<ThresholdInput, Output>(), config);
}
