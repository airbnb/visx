import React from 'react';
import { AnnotationProps } from '@visx/annotation/lib/components/Annotation';
import { EditableAnnotationProps } from '@visx/annotation/lib/components/EditableAnnotation';
import { ScaleInput } from '@visx/scale';
import { AxisScale } from '@visx/axis';
export declare type BaseAnnotationProps<XScale extends AxisScale, YScale extends AxisScale, Datum extends object> = Pick<EditableAnnotationProps, 'canEditLabel' | 'canEditSubject' | 'children' | 'dx' | 'dy' | 'onDragEnd' | 'onDragMove' | 'onDragStart'> & {
    /** Annotation component to render. */
    AnnotationComponent: React.FC<AnnotationProps> | React.FC<EditableAnnotationProps>;
    /** Key for series to which datum belongs (used for x/yAccessors). Alternatively xAccessor + yAccessor may be specified. */
    dataKey?: string;
    /** Datum to annotate, used for Annotation positioning. */
    datum: Datum;
    /** If dataKey is not specified, you must specify an xAccessor for datum. */
    xAccessor?: (d: Datum) => ScaleInput<XScale>;
    /** If dataKey is not specified, you must specify an yAccessor for datum. */
    yAccessor?: (d: Datum) => ScaleInput<YScale>;
};
export default function BaseAnnotation<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ AnnotationComponent, children, datum, dataKey, xAccessor: propsXAccessor, yAccessor: propsYAccessor, dx: propsDx, dy: propsDy, ...annotationProps }: BaseAnnotationProps<XScale, YScale, Datum>): JSX.Element | null;
//# sourceMappingURL=BaseAnnotation.d.ts.map