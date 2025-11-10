import { useContext } from 'react';
import { CircleSubject as BaseCircleSubject } from '@visx/annotation';
import type { CircleSubjectProps } from '@visx/annotation';
import DataContext from '../../context/DataContext';

export type AnnotationSubjectCircleProps = CircleSubjectProps;

/** AnnotationSubjectCircle which provides color from theme. */
export default function AnnotationCircleSubject(props: AnnotationSubjectCircleProps) {
  const { theme } = useContext(DataContext);
  return <BaseCircleSubject stroke={theme?.axisStyles.x.bottom.axisLine.stroke} {...props} />;
}
