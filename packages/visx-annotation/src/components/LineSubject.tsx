import React, { useContext } from 'react';
import cx from 'classnames';
import AnnotationContext from '../context/AnnotationContext';

export type LineSubjectProps = {
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

export default function LineSubject({
  className,
  x: propsX,
  y: propsY,
  orientation = 'vertical',
  min,
  max,
  stroke = '#222',
  strokeWidth = 2,
  ...restProps
}: LineSubjectProps & Omit<React.SVGProps<SVGLineElement>, keyof LineSubjectProps>) {
  // if props are provided, they take precedence over context
  const annotationContext = useContext(AnnotationContext);
  const lineIsVertical = orientation === 'vertical';

  return (
    <line
      className={cx('visx-annotation-subject', 'visx-annotation-subject-line', className)}
      x1={lineIsVertical ? propsX || annotationContext.x : min}
      x2={lineIsVertical ? propsX || annotationContext.x : max}
      y1={lineIsVertical ? min : propsY || annotationContext.y}
      y2={lineIsVertical ? max : propsY || annotationContext.y}
      fill="transparent"
      pointerEvents="none"
      stroke={stroke}
      {...restProps}
    />
  );
}
