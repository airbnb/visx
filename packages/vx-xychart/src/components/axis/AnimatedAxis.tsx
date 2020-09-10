import React from 'react';
import { AxisScale } from '@vx/axis/lib/types';
import VxAnimatedAxis, {
  AnimatedAxisProps as VxAnimatedAxisProps,
} from '@vx/react-spring/lib/axis/AnimatedAxis';
import BaseAxis, { BaseAxisProps } from './BaseAxis';

export type AnimatedAxisProps<Scale extends AxisScale> = Omit<
  BaseAxisProps<Scale>,
  'AxisComponent'
> &
  Pick<VxAnimatedAxisProps<Scale>, 'animationTrajectory'>;

export default function AnimatedAxis<Scale extends AxisScale>(props: AnimatedAxisProps<Scale>) {
  return <BaseAxis<Scale> AxisComponent={VxAnimatedAxis} {...props} />;
}
