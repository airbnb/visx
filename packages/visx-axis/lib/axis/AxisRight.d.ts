/// <reference types="react" />
import { SharedAxisProps, AxisScale } from '../types';
export declare type AxisRightProps<Scale extends AxisScale> = SharedAxisProps<Scale>;
export declare const rightTickLabelProps: () => {
    readonly dx: "0.25em";
    readonly dy: "0.25em";
    readonly fill: "#222";
    readonly fontFamily: "Arial";
    readonly fontSize: 10;
    readonly textAnchor: "start";
};
export default function AxisRight<Scale extends AxisScale>({ axisClassName, labelOffset, tickLabelProps, tickLength, ...restProps }: AxisRightProps<Scale>): JSX.Element;
//# sourceMappingURL=AxisRight.d.ts.map