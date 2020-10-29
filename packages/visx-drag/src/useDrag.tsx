import React, { useCallback } from 'react';
import { localPoint } from '@visx/event';
import useStateWithCallback from './util/useStateWithCallback';

type MouseOrTouchEvent = React.MouseEvent | React.TouchEvent;

export type HandlerArgs = DragState & { event: MouseOrTouchEvent };

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
  x: number | undefined;
  y: number | undefined;
  dx: number;
  dy: number;
  isDragging: boolean;
};

export type UseDrag = DragState & {
  dragEnd: (event: MouseOrTouchEvent) => void;
  dragMove: (event: MouseOrTouchEvent) => void;
  dragStart: (event: MouseOrTouchEvent) => void;
};

export default function useDrag({
  resetOnStart,
  onDragEnd,
  onDragMove,
  onDragStart,
}: UseDragOptions): UseDrag {
  const [dragState, setDragStateWithCallback] = useStateWithCallback<DragState>({
    x: undefined,
    y: undefined,
    dx: 0,
    dy: 0,
    isDragging: false,
  });

  const handleDragStart = useCallback(
    (event: MouseOrTouchEvent) => {
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
    (event: MouseOrTouchEvent) => {
      event.persist();

      setDragStateWithCallback(
        currState => {
          const { x, y, isDragging } = currState;
          const point = localPoint(event) || { x: 0, y: 0 };
          return isDragging
            ? {
                isDragging: true,
                dx: point.x - (x || 0),
                dy: point.y - (y || 0),
                x,
                y,
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
    (event: MouseOrTouchEvent) => {
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
