import { AnyD3Scale } from '@vx/scale';

export default function getBandwidth(scale: AnyD3Scale) {
  const range = scale.range();
  const domain = scale.domain();
  return 'bandwidth' in scale
    ? scale.bandwidth()
    : Math.abs(range[range.length - 1] - range[0]) / domain.length;
}
