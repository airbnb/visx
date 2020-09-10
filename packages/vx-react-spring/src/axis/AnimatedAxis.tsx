import React, { useMemo } from 'react';
import Axis, { AxisProps } from '@vx/axis/lib/axis/Axis';
import { AxisScale, TicksRendererProps } from '@vx/axis/lib/types';
import AnimatedTicks from './AnimatedTicks';
import { TransitionConfig } from '../spring-configs/useLineTransitionConfig';

export type AnimatedAxisProps<Scale extends AxisScale> = Omit<AxisProps<Scale>, 'ticksComponent'> &
  Pick<TransitionConfig<Scale>, 'animationTrajectory'>;

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
