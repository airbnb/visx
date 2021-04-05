import React from 'react';
import { AnnotationContextType } from '../types';
export declare type EditableAnnotationProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
    /** Width of the possible drag canvas (e.g., SVG container). */
    width: number;
    /** Height of the possible drag canvas (e.g., SVG container). */
    height: number;
    /** Annotation children (Subject, Label, Connector) */
    children: React.ReactNode;
    /** Whether the Label position (dx, dy) is editable. */
    canEditLabel?: boolean;
    /** Whether the Subject position (x, y) is editable. */
    canEditSubject?: boolean;
    /** Optional circle props to set on the subject drag handle. */
    subjectDragHandleProps?: React.SVGProps<SVGCircleElement>;
    /** Optional circle props to set on the label drag handle. */
    labelDragHandleProps?: React.SVGProps<SVGCircleElement>;
    /** Callback invoked on drag start. */
    onDragStart?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
    /** Callback invoked on drag move. */
    onDragMove?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
    /** Callback invoked on drag end. */
    onDragEnd?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
};
export declare type HandlerArgs = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    event: React.MouseEvent | React.TouchEvent;
};
export default function EditableAnnotation({ canEditLabel, canEditSubject, children, dx: labelDx, dy: labelDy, height, labelDragHandleProps, onDragEnd, onDragMove, onDragStart, subjectDragHandleProps, width, x: subjectX, y: subjectY, }: EditableAnnotationProps): JSX.Element;
//# sourceMappingURL=EditableAnnotation.d.ts.map