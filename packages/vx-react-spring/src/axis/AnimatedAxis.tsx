import React from 'react';
import Axis, { AxisProps } from '@vx/axis/lib/axis/Axis';
import { AxisScale } from '@vx/axis/lib/types';
import AnimatedTicksRenderer from './AnimatedTicksRenderer';

export default function AnimatedAxis<Scale extends AxisScale>(
  axisProps: Omit<AxisProps<Scale>, 'ticksComponent'>,
) {
  return <Axis {...axisProps} ticksComponent={AnimatedTicksRenderer} />;
}
