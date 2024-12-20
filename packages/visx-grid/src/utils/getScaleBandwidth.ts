import type { GridScale } from '../types';

export default function getScaleBandwidth(scale: GridScale) {
  return 'bandwidth' in scale ? scale.bandwidth() : 0;
}
