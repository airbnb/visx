import React from 'react';
import { AxisScale } from '@visx/axis/lib/types';
import VxAnimatedAxis from '@visx/react-spring/lib/axis/AnimatedAxis';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import BaseAxis, { BaseAxisProps } from './BaseAxis';

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
