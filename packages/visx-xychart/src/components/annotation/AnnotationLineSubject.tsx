import React, { useContext } from 'react';
import { LineSubject as BaseLineSubject } from '@visx/annotation';
import { LineSubjectProps } from '@visx/annotation/lib/components/LineSubject';
import DataContext from '../../context/DataContext';

export type AnnotationLineSubjectProps = Omit<LineSubjectProps, 'min' | 'max'> & {
  min?: number;
  max?: number;
};

/** AnnotationLineSubject which provides color and dimensions from context. */
export default function AnnotationLineSubject({
  min,
  max,
  ...props
}: AnnotationLineSubjectProps &
  Omit<React.SVGProps<SVGLineElement>, keyof AnnotationLineSubjectProps>) {
  const { theme, margin, innerHeight = 0, innerWidth = 0 } = useContext(DataContext);
  return (
    <BaseLineSubject
      stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
      min={min ?? (props.orientation === 'horizontal' ? margin?.left : margin?.top) ?? 0}
      max={
        max ??
        (props.orientation === 'horizontal'
          ? (margin?.left ?? 0) + innerWidth
          : (margin?.top ?? 0) + innerHeight)
      }
      {...props}
    />
  );
}
