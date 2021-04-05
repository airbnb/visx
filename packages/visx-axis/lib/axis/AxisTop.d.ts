/// <reference types="react" />
import { SharedAxisProps, AxisScale } from '../types';
export declare type AxisTopProps<Scale extends AxisScale> = SharedAxisProps<Scale>;
export declare const topTickLabelProps: () => {
    readonly dy: "-0.75em";
    readonly fill: "#222";
    readonly fontFamily: "Arial";
    readonly fontSize: 10;
    readonly textAnchor: "middle";
};
export default function AxisTop<Scale extends AxisScale>({ axisClassName, labelOffset, tickLabelProps, tickLength, ...restProps }: AxisTopProps<Scale>): JSX.Element;
//# sourceMappingURL=AxisTop.d.ts.map