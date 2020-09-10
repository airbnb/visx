import React from 'react';
import { AxisScale } from '@vx/axis/lib/types';
import VxAnimatedAxis from '@vx/react-spring/lib/axis/AnimatedAxis';
import { AnimationTrajectory } from '@vx/react-spring/lib/types';
import BaseAxis, { BaseAxisProps } from './BaseAxis';

export type AnimatedAxisProps<Scale extends AxisScale> = Omit<
  BaseAxisProps<Scale>,
  'AxisComponent'
> & { animationTrajectory?: AnimationTrajectory };

export default function AnimatedAxis<Scale extends AxisScale>(props: AnimatedAxisProps<Scale>) {
  return <BaseAxis<Scale> AxisComponent={VxAnimatedAxis} {...props} />;
}
