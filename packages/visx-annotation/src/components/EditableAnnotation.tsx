/* eslint-disable react/jsx-handler-names */
import React, { useCallback, useRef } from 'react';
import useDrag, { UseDrag, HandlerArgs as DragHandlerArgs } from '@visx/drag/lib/useDrag';
import { AnnotationContextType } from '../types';
import Annotation from './Annotation';

export type EditableAnnotationProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
  /** Width of the possible drag canvas (e.g., SVG container). */
  width: number;
  /** Height of the possible drag canvas (e.g., SVG container). */
  height: number;
  /** Annotation children (Subject, Label, Connector) */
  children: React.ReactNode;
  /** Optional circle props to set on the subject drag handle. */
  subjectDragHandleProps?: React.SVGProps<SVGCircleElement>;
  /** Optional circle props to set on the label drag handle. */
  labelDragHandleProps?: React.SVGProps<SVGCircleElement>;
  /** Callback invoked on drag start. */
  onDragStart?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
  /** Callback invoked on drag move. */
  onDragMove?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
  /** Callback invoked on drag end. */
  onDragEnd?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
};

export type HandlerArgs = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  event: React.MouseEvent | React.TouchEvent;
};

const defaultDragHandleProps = {
  r: 10,
  fill: 'transparent',
  stroke: '#777',
  strokeDasharray: '4,2',
  strokeWidth: 2,
};

export default function EditableAnnotation({
  x: subjectX = 0,
  y: subjectY = 0,
  dx: labelDx = 0,
  dy: labelDy = 0,
  children,
  width,
  height,
  subjectDragHandleProps,
  labelDragHandleProps,
  onDragStart,
  onDragMove,
  onDragEnd,
}: EditableAnnotationProps) {
  // chicken before the egg, we need these to reference drag state
  // in drag callbacks which are defined before useDrag() state is available
  const subjectDragRef = useRef<UseDrag>();
  const labelDragRef = useRef<UseDrag>();

  const handleDragStart = useCallback(
    ({ event }: DragHandlerArgs) => {
      if (onDragStart) {
        onDragStart({
          event,
          x: subjectX + (subjectDragRef.current?.dx ?? 0),
          y: subjectY + (subjectDragRef.current?.dy ?? 0),
          dx: labelDx + (labelDragRef.current?.dx ?? 0),
          dy: labelDy + (labelDragRef.current?.dy ?? 0),
        });
      }
    },
    [labelDx, labelDy, onDragStart, subjectX, subjectY],
  );

  const handleDragMove = useCallback(
    ({ event }: DragHandlerArgs) => {
      if (onDragMove) {
        onDragMove({
          event,
          x: subjectX + (subjectDragRef.current?.dx ?? 0),
          y: subjectY + (subjectDragRef.current?.dy ?? 0),
          dx: labelDx + (labelDragRef.current?.dx ?? 0),
          dy: labelDy + (labelDragRef.current?.dy ?? 0),
        });
      }
    },
    [labelDx, labelDy, onDragMove, subjectX, subjectY],
  );

  const handleDragEnd = useCallback(
    ({ event }: DragHandlerArgs) => {
      if (onDragEnd) {
        onDragEnd({
          event,
          x: subjectX + (subjectDragRef.current?.dx ?? 0),
          y: subjectY + (subjectDragRef.current?.dy ?? 0),
          dx: labelDx + (labelDragRef.current?.dx ?? 0),
          dy: labelDy + (labelDragRef.current?.dy ?? 0),
        });
      }
    },
    [labelDx, labelDy, onDragEnd, subjectX, subjectY],
  );

  const subjectDrag = useDrag({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
    x: subjectX,
    y: subjectY,
  });

  const labelDrag = useDrag({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
    x: labelDx,
    y: labelDy,
  });

  // enable referencing these in the callbacks defined before useDrag is called
  subjectDragRef.current = subjectDrag;
  labelDragRef.current = labelDrag;

  return (
    <>
      <Annotation
        x={subjectX + subjectDrag.dx}
        y={subjectY + subjectDrag.dy}
        dx={labelDx + labelDrag.dx}
        dy={labelDy + labelDrag.dy}
      >
        {children}
      </Annotation>
      {subjectDrag.isDragging && (
        <rect
          width={width}
          height={height}
          onMouseMove={subjectDrag.dragMove}
          onMouseUp={subjectDrag.dragEnd}
          fill="transparent"
        />
      )}
      <circle
        cx={subjectX}
        cy={subjectY}
        transform={`translate(${subjectDrag.dx},${subjectDrag.dy})`}
        onMouseMove={subjectDrag.dragMove}
        onMouseUp={subjectDrag.dragEnd}
        onMouseDown={subjectDrag.dragStart}
        onTouchStart={subjectDrag.dragStart}
        onTouchMove={subjectDrag.dragMove}
        onTouchEnd={subjectDrag.dragEnd}
        cursor={subjectDrag.isDragging ? 'grabbing' : 'grab'}
        {...defaultDragHandleProps}
        {...subjectDragHandleProps}
      />
      {labelDrag.isDragging && (
        <rect
          width={width}
          height={height}
          onMouseMove={labelDrag.dragMove}
          onMouseUp={labelDrag.dragEnd}
          fill="transparent"
        />
      )}
      <circle
        cx={subjectX + subjectDrag.dx + labelDx}
        cy={subjectY + subjectDrag.dy + labelDy}
        transform={`translate(${labelDrag.dx},${labelDrag.dy})`}
        onMouseMove={labelDrag.dragMove}
        onMouseUp={labelDrag.dragEnd}
        onMouseDown={labelDrag.dragStart}
        onTouchStart={labelDrag.dragStart}
        onTouchMove={labelDrag.dragMove}
        onTouchEnd={labelDrag.dragEnd}
        cursor={labelDrag.isDragging ? 'grabbing' : 'grab'}
        {...defaultDragHandleProps}
        {...labelDragHandleProps}
      />
    </>
  );
}
