import React, { useContext, useMemo } from 'react';
import { AnnotationProps } from '@visx/annotation/lib/components/Annotation';
import { EditableAnnotationProps } from '@visx/annotation/lib/components/EditableAnnotation';
import { coerceNumber, ScaleInput } from '@visx/scale';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
import isValidNumber from '../../../typeguards/isValidNumber';

export type BaseAnnotationProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = Pick<
  EditableAnnotationProps,
  | 'canEditLabel'
  | 'canEditSubject'
  | 'children'
  | 'dx'
  | 'dy'
  | 'onDragEnd'
  | 'onDragMove'
  | 'onDragStart'
> & {
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

// used for auto-positioning
const minimumLabelDimension = 16;

export default function BaseAnnotation<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  AnnotationComponent,
  children,
  datum,
  dataKey,
  xAccessor: propsXAccessor,
  yAccessor: propsYAccessor,
  dx: propsDx = 0,
  dy: propsDy = 0,
  ...annotationProps
}: BaseAnnotationProps<XScale, YScale, Datum>) {
  const { innerHeight, innerWidth, margin, xScale, yScale, dataRegistry } =
    useContext(DataContext) || {};

  const xBandWidth = useMemo(() => (xScale ? getScaleBandwidth(xScale) : 0), [xScale]);
  const yBandWidth = useMemo(() => (yScale ? getScaleBandwidth(yScale) : 0), [yScale]);

  if ((!propsXAccessor || !propsYAccessor) && !dataKey) {
    console.warn('[@visx/xychart/BaseAnnotation]: dataKey or x/yAccessors must be specified.');
    return null;
  }

  const registryEntry =
    (propsXAccessor && propsYAccessor) || dataKey == null ? null : dataRegistry?.get(dataKey);
  const xAccessor = propsXAccessor || registryEntry?.xAccessor;
  const yAccessor = propsYAccessor || registryEntry?.yAccessor;

  if (!xScale || !yScale || !innerWidth || !innerHeight || !xAccessor || !yAccessor || !margin) {
    return null;
  }

  const x = (coerceNumber(xScale(xAccessor(datum))) ?? NaN) + xBandWidth / 2;
  const y = (coerceNumber(yScale(yAccessor(datum))) ?? NaN) + yBandWidth / 2;
  const dx = x + propsDx + minimumLabelDimension > margin.left + innerWidth ? -propsDx : propsDx;
  const dy = y + propsDy + minimumLabelDimension > margin.top + innerHeight ? -propsDy : propsDy;

  return isValidNumber(x) && isValidNumber(y) ? (
    <AnnotationComponent
      width={innerWidth}
      height={innerHeight}
      {...annotationProps}
      x={x}
      y={y}
      dx={dx}
      dy={dy}
    >
      {children}
    </AnnotationComponent>
  ) : null;
}
