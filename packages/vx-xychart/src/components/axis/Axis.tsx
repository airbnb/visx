import React from 'react';
import { Axis as VxAxis, AxisScale } from '@vx/axis';
import BaseAxis, { BaseAxisProps } from './BaseAxis';

export default function Axis<Scale extends AxisScale>(
  props: Omit<BaseAxisProps<Scale>, 'AxisComponent'>,
) {
  return <BaseAxis<Scale> AxisComponent={VxAxis} {...props} />;
}
