import React from 'react';
import { AddSVGProps } from '../types';
export declare type BarProps = {
    /** className to apply to rect element. */
    className?: string;
    /** reference to rect element. */
    innerRef?: React.Ref<SVGRectElement>;
};
export default function Bar({ className, innerRef, ...restProps }: AddSVGProps<BarProps, SVGRectElement>): JSX.Element;
//# sourceMappingURL=Bar.d.ts.map