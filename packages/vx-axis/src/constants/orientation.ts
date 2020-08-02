import { ValueOf } from '@vx/scale';

const Orientation = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
} as const;

type Orientation = ValueOf<typeof Orientation>;

export default Orientation;
