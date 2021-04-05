/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { BaseAnnotationProps } from './private/BaseAnnotation';
export declare type AnnotationProps<XScale extends AxisScale, YScale extends AxisScale, Datum extends object> = {
    editable?: boolean;
} & Omit<BaseAnnotationProps<XScale, YScale, Datum>, 'AnnotationComponent'>;
export default function AnimatedAnnotation<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ editable, ...props }: AnnotationProps<XScale, YScale, Datum>): JSX.Element;
//# sourceMappingURL=AnimatedAnnotation.d.ts.map