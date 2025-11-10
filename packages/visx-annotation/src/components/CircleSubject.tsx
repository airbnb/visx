import { useContext, type SVGProps } from 'react';
import cx from 'classnames';
import type { AnnotationContextType } from '../types';
import AnnotationContext from '../context/AnnotationContext';

export type CircleSubjectProps = Pick<AnnotationContextType, 'x' | 'y'> & {
  /** Optional className to apply to CircleSubject in addition to 'visx-annotation-subject'. */
  className?: string;
  /** Color of CircleSubject. */
  stroke?: string;
  /** Radius of CircleSubject. */
  radius?: number;
};

export default function CircleSubject({
  className,
  x: propsX,
  y: propsY,
  stroke = '#222',
  radius = 16,
  ...restProps
}: CircleSubjectProps & Omit<SVGProps<SVGCircleElement>, keyof CircleSubjectProps>) {
  // if props are provided, they take precedence over context
  const annotationContext = useContext(AnnotationContext);

  return (
    <circle
      className={cx('visx-annotation-subject', 'visx-annotation-subject-circle', className)}
      cx={propsX || annotationContext.x}
      cy={propsY || annotationContext.y}
      r={radius}
      fill="transparent"
      pointerEvents="none"
      stroke={stroke}
      {...restProps}
    />
  );
}
