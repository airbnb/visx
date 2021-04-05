import React from 'react';
import { AddSVGProps } from '../types';
export declare type BarRoundedProps = {
    /** className to apply to path element. */
    className?: string;
    /** reference to path element. */
    innerRef?: React.Ref<SVGPathElement>;
    /** left position of the bar */
    x: number;
    /** top position of the bar */
    y: number;
    /** width of the bar starting from x */
    width: number;
    /** height of the bar starting from y */
    height: number;
    /** corner radius of the bar. clamped to center of the shorter side of the bar (Math.min(width,height) / 2) */
    radius: number;
    /** apply corner radius to top left corner, top right corner, bottom right corner, and bottom left corner */
    all?: boolean;
    /** apply corner radius to top left corner, and top right corner */
    top?: boolean;
    /** apply corner radius to bottom right corner, and bottom left corner */
    bottom?: boolean;
    /** apply corner radius to top left corner, and bottom left corner */
    left?: boolean;
    /** apply corner radius to top right corner, and bottom right corner */
    right?: boolean;
    /** apply corner radius to top left corner */
    topLeft?: boolean;
    /** apply corner radius to top right corner */
    topRight?: boolean;
    /** apply corner radius to bottom left corner */
    bottomLeft?: boolean;
    /** apply corner radius to bottom right */
    bottomRight?: boolean;
};
export default function BarRounded({ className, innerRef, x, y, width, height, radius, all, top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight, ...restProps }: AddSVGProps<BarRoundedProps, SVGPathElement>): JSX.Element;
//# sourceMappingURL=BarRounded.d.ts.map