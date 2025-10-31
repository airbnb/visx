import type { ValueOf } from '@visx/scale';

const Orientation = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
} as const;

export type OrientationType = ValueOf<typeof Orientation>;

export default Orientation;
