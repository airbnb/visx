import React from 'react';
import { AnnotationContextType } from '../types';
export declare type AnnotationProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
    /** Annotation children (Subject, Label, Connector) */
    children: React.ReactNode;
};
export default function Annotation({ x, y, dx, dy, children }: AnnotationProps): JSX.Element;
//# sourceMappingURL=Annotation.d.ts.map