import React from 'react';
import { AddSVGProps } from '../types';
interface Point {
    x?: number;
    y?: number;
}
export declare type LineProps = {
    /** className to apply to line element. */
    className?: string;
    /** reference to line element. */
    innerRef?: React.Ref<SVGLineElement>;
    /** fill color applied to line element. */
    fill?: string;
    /** Starting x,y point of the line. */
    from?: Point;
    /** Ending x,y point of the line. */
    to?: Point;
};
export default function Line({ from, to, fill, className, innerRef, ...restProps }: AddSVGProps<LineProps, SVGLineElement>): JSX.Element;
export {};
//# sourceMappingURL=Line.d.ts.map