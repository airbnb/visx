import React from 'react';
import { AxisScale } from '@vx/axis/lib/types';
import VxAnimatedAxis from '@vx/react-spring/lib/axis/AnimatedAxis';
import BaseAxis, { BaseAxisProps } from './BaseAxis;

export default function AnimatedAxis<Scale extends AxisScale>(
  props: Omit<BaseAxisProps<Scale>, 'AxisComponent'>,
) {
  return <BaseAxis<Scale> AxisComponent={VxAnimatedAxis} {...props} />;
}
