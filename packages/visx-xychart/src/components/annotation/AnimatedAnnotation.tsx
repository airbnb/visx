import { useCallback } from 'react';
import type { FC } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import {
  Annotation as VisxAnnotation,
  EditableAnnotation as VisxEditableAnnotation,
} from '@visx/annotation';
import type {
  AnnotationProps as VisxAnnotationProps,
  EditableAnnotationProps,
  EditableAnnotationProps as VisxEditableAnnotationProps,
} from '@visx/annotation';
import type { AxisScale } from '@visx/axis';
import type { BaseAnnotationProps } from './private/BaseAnnotation';
import BaseAnnotation from './private/BaseAnnotation';

export type AnnotationProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = { editable?: boolean } & Omit<
  BaseAnnotationProps<XScale, YScale, Datum>,
  'AnnotationComponent'
>;

function BaseAnimatedAnnotation({
  x = 0,
  y = 0,
  AnnotationComponent,
  ...props
}: {
  AnnotationComponent: FC<VisxAnnotationProps> | FC<VisxEditableAnnotationProps>;
} & VisxAnnotationProps &
  EditableAnnotationProps) {
  const animatedXY = useSpring({ x, y });

  return (
    <animated.g // for perf animate a group element not the Annotation itself
      // Keep annotation coordinates current while the spring retains its in-flight position.
      transform={to(
        [animatedXY.x, animatedXY.y],
        (xVal, yVal) => `translate(${xVal - x}, ${yVal - y})`,
      )}
    >
      <AnnotationComponent x={x} y={y} {...props} />
    </animated.g>
  );
}

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
