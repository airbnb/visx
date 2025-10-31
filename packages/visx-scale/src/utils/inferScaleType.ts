import type { ScaleTime } from '@visx/vendor/d3-scale';
import type { StringLike } from '../types/Base';
import type { DefaultThresholdInput, D3Scale } from '../types/Scale';
import type { ScaleType } from '../types/ScaleConfig';
import isUtcScale from './isUtcScale';

export default function inferScaleType<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(scale: D3Scale<Output, DiscreteInput, ThresholdInput>): ScaleType {
  // Try a sequence of typeguards to figure out the scale type

  if ('paddingInner' in scale) {
    return 'band';
  }

  if ('padding' in scale) {
    return 'point';
  }

  if ('quantiles' in scale) {
    return 'quantile';
  }

  if ('base' in scale) {
    return 'log';
  }

  if ('exponent' in scale) {
    return scale.exponent() === 0.5 ? 'sqrt' : 'pow';
  }

  if ('constant' in scale) {
    return 'symlog';
  }

  if ('clamp' in scale) {
    // Radial scales don't have interpolate method (unlike linear/time/utc)
    if (!('interpolate' in scale)) {
      return 'radial';
    }
    // Linear, Time or Utc scales
    const ticks = (scale as any).ticks?.();
    if (ticks?.[0] instanceof Date) {
      return isUtcScale(scale as ScaleTime<Output, Output>) ? 'utc' : 'time';
    }
    return 'linear';
  }

  if ('nice' in scale) {
    return 'quantize';
  }

  if ('invertExtent' in scale) {
    return 'threshold';
  }

  return 'ordinal';
}
