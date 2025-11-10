import type { AxisScale } from '@visx/axis';
import { AnimatedAxis as VxAnimatedAxis } from '@visx/react-spring';
import type { AnimationTrajectory } from '@visx/react-spring';
import type { BaseAxisProps } from './BaseAxis';
import BaseAxis from './BaseAxis';

export type AnimatedAxisProps<Scale extends AxisScale> = Omit<
  BaseAxisProps<Scale>,
  'AxisComponent'
> & {
  /** Animation trjectory of axis ticks. */
  animationTrajectory?: AnimationTrajectory;
};

export default function AnimatedAxis<Scale extends AxisScale>(props: AnimatedAxisProps<Scale>) {
  return <BaseAxis<Scale> AxisComponent={VxAnimatedAxis} {...props} />;
}
