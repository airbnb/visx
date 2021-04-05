/// <reference types="react" />
import { PositionScale, AddSVGProps, BaseAreaProps } from '../types';
export declare type AreaClosedProps<Datum> = BaseAreaProps<Datum> & {
    yScale: PositionScale;
};
export default function AreaClosed<Datum>({ x, x0, x1, y, y1, y0, yScale, data, defined, className, curve, innerRef, children, ...restProps }: AddSVGProps<AreaClosedProps<Datum>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=AreaClosed.d.ts.map