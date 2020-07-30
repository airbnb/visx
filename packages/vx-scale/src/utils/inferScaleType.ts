import { ScaleTime } from 'd3-scale';
import { D3Scale, AnyD3Scale, InferD3ScaleOutput } from '../types/Scale';
import { ScaleType } from '../types/ScaleConfig';
import isUtcScale from './isUtcScale';

export default function inferScaleType<Scale extends AnyD3Scale>(scale: Scale): ScaleType {
  const s = scale as D3Scale;

  // Try a sequence of typeguards to figure out the scale type

  if ('paddingInner' in s) {
    return 'band';
  }

  if ('padding' in s) {
    return 'point';
  }

  if ('quantiles' in s) {
    return 'quantile';
  }

  if ('base' in s) {
    return 'log';
  }

  if ('exponent' in s) {
    return s.exponent() === 0.5 ? 'sqrt' : 'pow';
  }

  if ('constant' in s) {
    return 'symlog';
  }

  if ('clamp' in s) {
    // Linear, Time or Utc scales
    if (s.ticks()[0] instanceof Date) {
      type Output = InferD3ScaleOutput<Scale>;
      return isUtcScale(scale as ScaleTime<Output, Output>) ? 'utc' : 'time';
    }
    return 'linear';
  }

  if ('nice' in s) {
    return 'quantize';
  }

  if ('invertExtent' in s) {
    return 'threshold';
  }

  return 'ordinal';
}
