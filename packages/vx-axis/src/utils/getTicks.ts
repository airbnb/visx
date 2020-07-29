import { D3Scale, StringLike, DefaultThresholdInput } from '@vx/scale';

export default function getTicks<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput
>(scale: D3Scale<Output, DiscreteInput, ThresholdInput>, numTicks?: number) {
  if ('ticks' in scale) {
    return scale.ticks(numTicks);
  }
  if ('quantiles' in scale) {
    return scale.quantiles();
  }
  if ('padding' in scale || 'unknown' in scale) {
    return scale
      .domain()
      .filter(
        (_, index, arr) =>
          numTicks == null ||
          arr.length <= numTicks ||
          index % Math.round((arr.length - 1) / numTicks) === 0,
      );
  }

  return scale
    .domain()
    .filter(
      (_, index, arr) =>
        numTicks == null ||
        arr.length <= numTicks ||
        index % Math.round((arr.length - 1) / numTicks) === 0,
    );
}
