/// <reference types="react" />
import { SharedAxisProps, AxisScale } from '../types';
export declare const leftTickLabelProps: () => {
    readonly dx: "-0.25em";
    readonly dy: "0.25em";
    readonly fill: "#222";
    readonly fontFamily: "Arial";
    readonly fontSize: 10;
    readonly textAnchor: "end";
};
export default function AxisLeft<Scale extends AxisScale>({ axisClassName, labelOffset, tickLabelProps, tickLength, ...restProps }: SharedAxisProps<Scale>): JSX.Element;
//# sourceMappingURL=AxisLeft.d.ts.map