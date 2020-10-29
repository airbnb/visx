/* eslint-disable react/jsx-handler-names */
import React from 'react';
import Drag from '@visx/drag/lib/Drag';
import { Group } from '@visx/group';
import { AnnotationContextType } from '../types';
import Annotation from './Annotation';

export type EditableAnnotationProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
  width: number;
  height: number;
  /** Annotation children (Subject, Label, Connector) */
  children: React.ReactNode;
};

export default function EditableAnnotation({
  x: subjectX = 0,
  y: subjectY = 0,
  dx: labelDx = 0,
  dy: labelDy = 0,
  children,
  width,
  height,
}: EditableAnnotationProps) {
  return (
    <Drag width={width} height={height}>
      {subjectDrag => (
        <>
          <circle
            cx={subjectX}
            cy={subjectY}
            transform={`translate(${subjectDrag.dx},${subjectDrag.dy})`}
            r={10}
            fill="transparent"
            stroke="#777"
            strokeDasharray="4,2"
            strokeWidth={2}
            onMouseMove={subjectDrag.dragMove}
            onMouseUp={subjectDrag.dragEnd}
            onMouseDown={subjectDrag.dragStart}
            onTouchStart={subjectDrag.dragStart}
            onTouchMove={subjectDrag.dragMove}
            onTouchEnd={subjectDrag.dragEnd}
          />
          <Drag width={width} height={height}>
            {labelDrag => (
              <>
                <circle
                  cx={subjectX + labelDx + subjectDrag.dx}
                  cy={subjectY + labelDy + subjectDrag.dy}
                  transform={`translate(${labelDrag.dx},${labelDrag.dy})`}
                  r={10}
                  fill="transparent"
                  stroke="#777"
                  strokeDasharray="4,2"
                  strokeWidth={2}
                  onMouseMove={labelDrag.dragMove}
                  onMouseUp={labelDrag.dragEnd}
                  onMouseDown={labelDrag.dragStart}
                  onTouchStart={labelDrag.dragStart}
                  onTouchMove={labelDrag.dragMove}
                  onTouchEnd={labelDrag.dragEnd}
                />
                <Annotation
                  x={subjectX + subjectDrag.dx}
                  y={subjectY + subjectDrag.dy}
                  dx={labelDx + labelDrag.dx}
                  dy={labelDy + labelDrag.dy}
                >
                  {children}
                </Annotation>
              </>
            )}
          </Drag>
        </>
      )}
    </Drag>
  );
}
