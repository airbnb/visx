import { AnyD3Scale } from '@vx/scale';

export default function getBandwidth(scale: AnyD3Scale) {
  if ('bandwidth' in scale) {
    return scale.bandwidth();
  }

  const range = scale.range();
  const domain = scale.domain();
  return Math.abs(range[range.length - 1] - range[0]) / domain.length;
}
