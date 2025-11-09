import type { AxisScale } from '@visx/axis';
import { Axis as VisxAxis } from '@visx/axis';
import type { BaseAxisProps } from './BaseAxis';
import BaseAxis from './BaseAxis';

export type AxisProps<Scale extends AxisScale = AxisScale> = Omit<
  BaseAxisProps<Scale>,
  'AxisComponent'
>;

export default function Axis<Scale extends AxisScale = AxisScale>(props: AxisProps<Scale>) {
  return <BaseAxis<Scale> AxisComponent={VisxAxis} {...props} />;
}
