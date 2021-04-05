import React from 'react';
import { AnnotationContextType } from '../types';
export declare type CircleSubjectProps = Pick<AnnotationContextType, 'x' | 'y'> & {
    /** Optional className to apply to CircleSubject in addition to 'visx-annotation-subject'. */
    className?: string;
    /** Color of CircleSubject. */
    stroke?: string;
    /** Radius of CircleSubject. */
    radius?: number;
};
export default function CircleSubject({ className, x: propsX, y: propsY, stroke, radius, ...restProps }: CircleSubjectProps & Omit<React.SVGProps<SVGCircleElement>, keyof CircleSubjectProps>): JSX.Element;
//# sourceMappingURL=CircleSubject.d.ts.map