import React from 'react';
import AnnotationContext from '../context/AnnotationContext';
import { AnnotationContextType } from '../types';

export type AnnotationProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
  /** Annotation children (Subject, Label, Connector) */
  children: React.ReactNode;
};

export default function Annotation({ x, y, dx, dy, children }: AnnotationProps) {
  return (
    <AnnotationContext.Provider value={{ x, y, dx, dy }}>{children}</AnnotationContext.Provider>
  );
}
