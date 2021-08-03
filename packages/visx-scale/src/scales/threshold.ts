import { scaleThreshold } from 'd3-scale';
import { DefaultOutput, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { DefaultThresholdInput } from '../types/Scale';
import scaleOperator from '../operators/scaleOperator';

export const updateThresholdScale = scaleOperator<'threshold'>('domain', 'range', 'reverse');

export default function createThresholdScale<
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Output = DefaultOutput,
>(config?: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>) {
  return updateThresholdScale(scaleThreshold<ThresholdInput, Output>(), config);
}
