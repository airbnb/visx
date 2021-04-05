import React from 'react';
export declare type LineSubjectProps = {
    /** Optional className to apply to LineSubject in addition to 'visx-annotation-subject'. */
    className?: string;
    /** Color of LineSubject. */
    stroke?: string;
    /** strokeWidth of LineSubject. */
    strokeWidth?: number;
    /** Orientation of line. */
    orientation?: 'vertical' | 'horizontal';
    /** x position of LineSubject (for vertical LineSubjects). */
    x?: number;
    /** y position of LineSubject (for horizontal LineSubjects). */
    y?: number;
    /** The minimum coordinate of the line. */
    min: number;
    /** The maximum coordinate of the line. */
    max: number;
};
export default function LineSubject({ className, x: propsX, y: propsY, orientation, min, max, stroke, ...restProps }: LineSubjectProps & Omit<React.SVGProps<SVGLineElement>, keyof LineSubjectProps>): JSX.Element;
//# sourceMappingURL=LineSubject.d.ts.map