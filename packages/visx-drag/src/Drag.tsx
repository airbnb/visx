/* eslint-disable react/jsx-handler-names */
import type { ReactNode } from 'react';
import type { UseDrag, UseDragOptions, HandlerArgs as HandlerArgsType } from './useDrag';
import useDrag from './useDrag';

export type HandlerArgs = HandlerArgsType;

export type DragProps = UseDragOptions & {
  /** Children render function which is passed the state of dragging and callbacks for drag start/end/move. */
  children: (args: UseDrag) => ReactNode;
  /** Width of the drag container. */
  width: number;
  /** Height of the drag container. */
  height: number;
  /** Whether to render an invisible rect below children to capture the drag area as defined by width and height. */
  captureDragArea?: boolean;
  /** If defined, parent controls dragging state. */
  isDragging?: boolean;
};

export default function Drag({
  captureDragArea = true,
  snapToPointer = true,
  children,
  dx,
  dy,
  height,
  onDragEnd,
  onDragMove,
  onDragStart,
  resetOnStart,
  width,
  x,
  y,
  isDragging,
  restrict,
  restrictToPath,
}: DragProps) {
  const drag = useDrag({
    resetOnStart,
    snapToPointer,
    onDragEnd,
    onDragMove,
    onDragStart,
    x,
    y,
    dx,
    dy,
    isDragging,
    restrict,
    restrictToPath,
  });

  return (
    <>
      {drag.isDragging && captureDragArea && (
        <rect
          width={width}
          height={height}
          onPointerDown={drag.dragStart}
          onPointerMove={drag.dragMove}
          onPointerUp={drag.dragEnd}
          fill="transparent"
        />
      )}
      {children(drag)}
    </>
  );
}
