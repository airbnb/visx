import React from 'react';
import { Axis as VisxAxis, AxisScale } from '@visx/axis';
import BaseAxis, { BaseAxisProps } from './BaseAxis';

export type AxisProps<Scale extends AxisScale = AxisScale> = Omit<
  BaseAxisProps<Scale>,
  'AxisComponent'
>;

export default function Axis<Scale extends AxisScale = AxisScale>(props: AxisProps<Scale>) {
  return <BaseAxis<Scale> AxisComponent={VisxAxis} {...props} />;
}
