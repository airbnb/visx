import React, { useCallback } from 'react';
import { localPoint } from '@visx/event';
import useStateWithCallback from './util/useStateWithCallback';

type MouseTouchOrPointerEvent = React.MouseEvent | React.TouchEvent | React.PointerEvent;

export type HandlerArgs = DragState & {
  /** Drag event. */
  event: MouseTouchOrPointerEvent;
};

export type UseDragOptions = {
  /** Whether to reset drag state upon the start of a new drag. */
  resetOnStart?: boolean;
  /** Optional callback invoked upon drag end. */
  onDragEnd?: (args: HandlerArgs) => void;
  /** Optional callback invoked upon drag movement. */
  onDragMove?: (args: HandlerArgs) => void;
  /** Optional callback invoked upon drag start. */
  onDragStart?: (args: HandlerArgs) => void;
};

export type DragState = {
  /** x position of drag at drag start time, reset to 0 if `resetOnStart=true`. */
  x: number | undefined;
  /** y position of drag at drag start time, reset to 0 if `resetOnStart=true`. */
  y: number | undefined;
  /** Change in x position since drag start, reset to 0 on drag start if `resetOnStart=true`. */
  dx: number;
  /** Change in y position since drag start, reset to 0 on drag start if `resetOnStart=true`. */
  dy: number;
  /** Whether a drag is currently in progress. */
  isDragging: boolean;
};

export type UseDrag = DragState & {
  /** Callback to be be invoked on drag end. */
  dragEnd: (event: MouseTouchOrPointerEvent) => void;
  /** Callback to be be invoked on drag move. */
  dragMove: (event: MouseTouchOrPointerEvent) => void;
  /** Callback to be be invoked on drag start. */
  dragStart: (event: MouseTouchOrPointerEvent) => void;
};

/** Hook for dragging, returns a `UseDrag` object. */
export default function useDrag({
  resetOnStart = false,
  onDragEnd,
  onDragMove,
  onDragStart,
}: UseDragOptions | undefined = {}): UseDrag {
  const [dragState, setDragStateWithCallback] = useStateWithCallback<DragState>({
    x: undefined,
    y: undefined,
    dx: 0,
    dy: 0,
    isDragging: false,
  });

  const handleDragStart = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        ({ dx, dy }) => {
          const point = localPoint(event) || { x: 0, y: 0 };
          return {
            isDragging: true,
            dx: resetOnStart ? 0 : dx,
            dy: resetOnStart ? 0 : dy,
            x: resetOnStart ? point.x : point.x - dx,
            y: resetOnStart ? point.y : point.y - dy,
          };
        },
        onDragStart &&
          (currState => {
            onDragStart({ ...currState, event });
          }),
      );
    },
    [onDragStart, resetOnStart, setDragStateWithCallback],
  );

  const handleDragMove = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        currState => {
          const { x, y, isDragging } = currState;
          const point = localPoint(event) || { x: 0, y: 0 };
          return isDragging
            ? {
                ...currState,
                isDragging: true,
                dx: point.x - (x || 0),
                dy: point.y - (y || 0),
              }
            : currState;
        },
        onDragMove &&
          (currState => {
            if (currState.isDragging) onDragMove({ ...currState, event });
          }),
      );
    },
    [onDragMove, setDragStateWithCallback],
  );

  const handleDragEnd = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        currState => ({ ...currState, isDragging: false }),
        onDragEnd &&
          (currState => {
            onDragEnd({ ...currState, event });
          }),
      );
    },
    [onDragEnd, setDragStateWithCallback],
  );

  return {
    ...dragState,
    dragEnd: handleDragEnd,
    dragMove: handleDragMove,
    dragStart: handleDragStart,
  };
}
