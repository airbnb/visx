import { AxisScale } from '@visx/axis';

export default function getScaleBandwidth<Scale extends AxisScale>(scale: Scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  const s = scale as AxisScale;
  return 'bandwidth' in s ? s?.bandwidth() ?? 0 : 0;
}
