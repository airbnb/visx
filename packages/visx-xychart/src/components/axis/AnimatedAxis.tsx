import React from 'react';
import type { AxisScale } from '@visx/axis/lib/types';
import VxAnimatedAxis from '@visx/react-spring/lib/axis/AnimatedAxis';
import type { AnimationTrajectory } from '@visx/react-spring/lib/types';
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
