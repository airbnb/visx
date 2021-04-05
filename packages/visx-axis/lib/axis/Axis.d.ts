/// <reference types="react" />
import { SharedAxisProps, AxisScale } from '../types';
import Orientation from '../constants/orientation';
export declare type AxisProps<Scale extends AxisScale> = SharedAxisProps<Scale> & {
    orientation?: Orientation;
};
export default function Axis<Scale extends AxisScale>({ children, axisClassName, hideAxisLine, hideTicks, hideZero, left, numTicks, orientation, rangePadding, scale, tickFormat, tickLength, tickValues, top, ...restProps }: AxisProps<Scale>): JSX.Element;
//# sourceMappingURL=Axis.d.ts.map