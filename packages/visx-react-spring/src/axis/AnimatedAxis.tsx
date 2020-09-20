import React, { useMemo } from 'react';
import Axis, { AxisProps } from '@visx/axis/lib/axis/Axis';
import { AxisScale, TicksRendererProps } from '@visx/axis/lib/types';
import AnimatedTicks from './AnimatedTicks';
import { AnimationTrajectory } from '../types';

export type AnimatedAxisProps<Scale extends AxisScale> = Omit<
  AxisProps<Scale>,
  'ticksComponent'
> & { animationTrajectory?: AnimationTrajectory };

export default function AnimatedAxis<Scale extends AxisScale>({
  animationTrajectory,
  ...axisProps
}: AnimatedAxisProps<Scale>) {
  // wrap the ticksComponent so we can pass animationTrajectory
  const ticksComponent = useMemo(
    () => (ticks: TicksRendererProps<Scale>) => (
      <AnimatedTicks {...ticks} animationTrajectory={animationTrajectory} />
    ),
    [animationTrajectory],
  );
  return <Axis {...axisProps} ticksComponent={ticksComponent} />;
}
