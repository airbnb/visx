import React from 'react';
import Axis, { AxisProps } from './Axis';
import AnimatedTicksRenderer from './AnimatedTicksRenderer';
import { AxisScale } from '../types';

export default function AnimatedAxis<Scale extends AxisScale>(
  axisProps: Omit<AxisProps<Scale>, 'ticksComponent'>,
) {
  return <Axis {...axisProps} ticksComponent={AnimatedTicksRenderer} />;
}
