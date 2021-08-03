import React from 'react';
import {
  Annotation as VisxAnnotation,
  EditableAnnotation as VisxEditableAnnotation,
} from '@visx/annotation';
import { AxisScale } from '@visx/axis';
import BaseAnnotation, { BaseAnnotationProps } from './private/BaseAnnotation';

export type AnnotationProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = { editable?: boolean } & Omit<
  BaseAnnotationProps<XScale, YScale, Datum>,
  'AnnotationComponent'
>;

export default function Annotation<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({ editable, ...props }: AnnotationProps<XScale, YScale, Datum>) {
  return (
    <BaseAnnotation
      AnnotationComponent={editable ? VisxEditableAnnotation : VisxAnnotation}
      {...props}
    />
  );
}
