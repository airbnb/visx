import React, { useMemo } from 'react';
import type { AxisProps } from '@visx/axis/lib/axis/Axis';
import Axis from '@visx/axis/lib/axis/Axis';
import type { AxisScale, TicksRendererProps } from '@visx/axis/lib/types';
import AnimatedTicks from './AnimatedTicks';
import type { AnimationTrajectory } from '../types';

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
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      function TicksComponent(ticks: TicksRendererProps<Scale>) {
        return (
          <AnimatedTicks
            {...ticks}
            tickComponent={tickComponent}
            animationTrajectory={animationTrajectory}
          />
        );
      },
    [animationTrajectory, tickComponent],
  );
  return <Axis {...axisProps} ticksComponent={ticksComponent} />;
}
