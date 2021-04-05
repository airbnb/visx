import React from 'react';
import { AddSVGProps } from '../types';
export declare type CircleProps = {
    /** className to apply to circle element. */
    className?: string;
    /** reference to circle element. */
    innerRef?: React.Ref<SVGCircleElement>;
};
export default function Circle({ className, innerRef, ...restProps }: AddSVGProps<CircleProps, SVGCircleElement>): JSX.Element;
//# sourceMappingURL=Circle.d.ts.map