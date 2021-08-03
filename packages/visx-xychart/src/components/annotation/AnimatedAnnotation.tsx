import React, { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated, to } from 'react-spring';
import {
  Annotation as VisxAnnotation,
  EditableAnnotation as VisxEditableAnnotation,
} from '@visx/annotation';
import { AnnotationProps as VisxAnnotationProps } from '@visx/annotation/lib/components/Annotation';
import {
  EditableAnnotationProps,
  EditableAnnotationProps as VisxEditableAnnotationProps,
} from '@visx/annotation/lib/components/EditableAnnotation';
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

export default function AnimatedAnnotation<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({ editable, ...props }: AnnotationProps<XScale, YScale, Datum>) {
  const AnnotationComponent: BaseAnnotationProps<XScale, YScale, Datum>['AnnotationComponent'] =
    useCallback(
      (annotationProps: VisxAnnotationProps & VisxEditableAnnotationProps) => (
        <BaseAnimatedAnnotation
          AnnotationComponent={editable ? VisxEditableAnnotation : VisxAnnotation}
          {...annotationProps}
        />
      ),
      [editable],
    );
  return <BaseAnnotation AnnotationComponent={AnnotationComponent} {...props} />;
}

function BaseAnimatedAnnotation<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  x = 0,
  y = 0,
  AnnotationComponent,
  ...props
}: {
  AnnotationComponent: React.FC<VisxAnnotationProps> | React.FC<VisxEditableAnnotationProps>;
} & VisxAnnotationProps &
  EditableAnnotationProps) {
  const lastXY = useRef({ x, y });

  // in order to keep x/y/dx/dy accurate in AnnotationComponent, animate the delta
  // between positions, to an x + y transform of zero from the previous value
  const animatedXY = useSpring({
    from: { x: lastXY.current.x - x, y: lastXY.current.y - y },
    to: { x: 0, y: 0 },
    reset: true,
  });

  useEffect(() => {
    lastXY.current = { x, y };
  }, [x, y]);

  return (
    <animated.g // for perf animate a group element not the Annotation itself
      transform={to([animatedXY.x, animatedXY.y], (xVal, yVal) => `translate(${xVal}, ${yVal})`)}
    >
      <AnnotationComponent x={x} y={y} {...props} />
    </animated.g>
  );
}
