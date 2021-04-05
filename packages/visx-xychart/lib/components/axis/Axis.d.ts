/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { BaseAxisProps } from './BaseAxis';
export declare type AxisProps<Scale extends AxisScale = AxisScale> = Omit<BaseAxisProps<Scale>, 'AxisComponent'>;
export default function Axis<Scale extends AxisScale = AxisScale>(props: AxisProps<Scale>): JSX.Element;
//# sourceMappingURL=Axis.d.ts.map