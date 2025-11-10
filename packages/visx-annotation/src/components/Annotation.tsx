import { useMemo, type ReactNode } from 'react';
import AnnotationContext from '../context/AnnotationContext';
import type { AnnotationContextType } from '../types';

export type AnnotationProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
  /** Annotation children (Subject, Label, Connector) */
  children: ReactNode;
};

export default function Annotation({ x, y, dx, dy, children }: AnnotationProps) {
  const value = useMemo(() => ({ x, y, dx, dy }), [x, y, dx, dy]);
  return <AnnotationContext.Provider value={value}>{children}</AnnotationContext.Provider>;
}
