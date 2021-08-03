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
  tickComponent,
  ...axisProps
}: AnimatedAxisProps<Scale>) {
  // wrap the ticksComponent so we can pass animationTrajectory
  const ticksComponent = useMemo(
    () => (ticks: TicksRendererProps<Scale>) =>
      (
        <AnimatedTicks
          {...ticks}
          tickComponent={tickComponent}
          animationTrajectory={animationTrajectory}
        />
      ),
    [animationTrajectory, tickComponent],
  );
  return <Axis {...axisProps} ticksComponent={ticksComponent} />;
}
