import React from 'react';
import { LineSubjectProps } from '@visx/annotation/lib/components/LineSubject';
export declare type AnnotationLineSubjectProps = Omit<LineSubjectProps, 'min' | 'max'> & {
    min?: number;
    max?: number;
};
/** AnnotationLineSubject which provides color and dimensions from context. */
export default function AnnotationLineSubject({ min, max, ...props }: AnnotationLineSubjectProps & Omit<React.SVGProps<SVGLineElement>, keyof AnnotationLineSubjectProps>): JSX.Element;
//# sourceMappingURL=AnnotationLineSubject.d.ts.map