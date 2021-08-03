import { DefaultThresholdInput, D3Scale } from '../types/Scale';
import { StringLike } from '../types/Base';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyReverse<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if (config.reverse) {
    const reversedRange = scale.range().slice().reverse();
    if ('padding' in scale) {
      // point and band scales
      scale.range(reversedRange as [number, number]);
    } else {
      // the rest
      scale.range(reversedRange as Output[]);
    }
  }
}
