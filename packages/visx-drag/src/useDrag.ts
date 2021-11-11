import React, { useCallback, useEffect, useRef, useState } from 'react';
import { localPoint } from '@visx/event';
import useStateWithCallback from './util/useStateWithCallback';
import clampNumber from './util/clampNumber';

export type MouseTouchOrPointerEvent = React.MouseEvent | React.TouchEvent | React.PointerEvent;

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
  /** Optionally set the initial drag x, or override the current drag x. */
  x?: number;
  /** Optionally set the initial drag y, or override the current drag y. */
  y?: number;
  /** Optionally set the initial drag dx, or override the current drag dx. */
  dx?: number;
  /** Optionally set the initial drag dy, or override the current drag dy. */
  dy?: number;
  /** If defined, parent controls dragging state.  */
  isDragging?: boolean;
  /** Snap element being dragged to middle of pointer. */
  snapToPointer?: boolean;
  /** Options for limiting dragging in the x and y plane. */
  restrict?: {
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
  };
};

export type DragState = {
  /** x position of drag at drag start time, reset to 0 if `resetOnStart=true`. */
  x?: number;
  /** y position of drag at drag start time, reset to 0 if `resetOnStart=true`. */
  y?: number;
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
  snapToPointer = true,
  onDragEnd,
  onDragMove,
  onDragStart,
  x,
  y,
  dx,
  dy,
  isDragging,
  restrict = {},
}: UseDragOptions | undefined = {}): UseDrag {
  // use ref to detect prop changes
  const positionPropsRef = useRef({ x, y, dx, dy });

  const { xMin, xMax, yMin, yMax } = restrict;
  const clampX = useCallback(
    (num: number) => clampNumber(num, xMin ?? -Infinity, xMax ?? Infinity),
    [xMax, xMin],
  );
  const clampY = useCallback(
    (num: number) => clampNumber(num, yMin ?? -Infinity, yMax ?? Infinity),
    [yMax, yMin],
  );

  const [dragState, setDragStateWithCallback] = useStateWithCallback<DragState>({
    x,
    y,
    dx: dx ?? 0,
    dy: dy ?? 0,
    isDragging: false,
  });

  // Track distance between pointer on dragStart and position of element being dragged
  const [dragStartPointerOffset, setDragStartPointerOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // if prop position changes, update state
  useEffect(() => {
    if (
      positionPropsRef.current.x !== x ||
      positionPropsRef.current.y !== y ||
      positionPropsRef.current.dx !== dx ||
      positionPropsRef.current.dy !== dy
    ) {
      positionPropsRef.current = { x, y, dx, dy };
      setDragStateWithCallback((currState) => ({
        ...currState,
        x,
        y,
        dx: dx ?? 0,
        dy: dy ?? 0,
      }));
    }
  });

  useEffect(() => {
    if (isDragging !== undefined && dragState.isDragging !== isDragging) {
      setDragStateWithCallback((currState) => ({ ...currState, isDragging }));
    }
  }, [dragState.isDragging, isDragging, setDragStateWithCallback]);

  const handleDragStart = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        (currState) => {
          const currentPoint = {
            x: (currState.x || 0) + currState.dx,
            y: (currState.y || 0) + currState.dy,
          };
          const eventPoint = localPoint(event) || { x: 0, y: 0 };
          const point = snapToPointer ? eventPoint : currentPoint;

          setDragStartPointerOffset({
            x: currentPoint.x - eventPoint.x,
            y: currentPoint.y - eventPoint.y,
          });

          return {
            isDragging: true,
            dx: resetOnStart ? 0 : currState.dx,
            dy: resetOnStart ? 0 : currState.dy,
            x: resetOnStart ? clampX(point.x) : clampX(point.x) - currState.dx,
            y: resetOnStart ? clampY(point.y) : clampY(point.y) - currState.dy,
          };
        },
        onDragStart &&
          ((currState) => {
            onDragStart({ ...currState, event });
          }),
      );
    },
    [clampX, clampY, onDragStart, resetOnStart, setDragStateWithCallback, snapToPointer],
  );

  const handleDragMove = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        (currState) => {
          const point = localPoint(event) || { x: 0, y: 0 };
          return currState.isDragging
            ? {
                ...currState,
                isDragging: true,
                dx: snapToPointer
                  ? clampX(point.x) - (currState.x || 0)
                  : clampX(point.x + dragStartPointerOffset.x) - (currState.x || 0),
                dy: snapToPointer
                  ? clampY(point.y) - (currState.y || 0)
                  : clampY(point.y + dragStartPointerOffset.y) - (currState.y || 0),
              }
            : currState;
        },
        onDragMove &&
          ((currState) => {
            if (currState.isDragging) onDragMove({ ...currState, event });
          }),
      );
    },
    [
      setDragStateWithCallback,
      onDragMove,
      snapToPointer,
      dragStartPointerOffset.x,
      dragStartPointerOffset.y,
      clampX,
      clampY,
    ],
  );

  const handleDragEnd = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        (currState) => ({ ...currState, isDragging: false }),
        onDragEnd &&
          ((currState) => {
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
