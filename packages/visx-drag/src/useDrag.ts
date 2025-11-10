import type { MouseEvent, TouchEvent, PointerEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Point, subtractPoints, sumPoints } from '@visx/point';
import { localPoint } from '@visx/event';
import useStateWithCallback from './util/useStateWithCallback';
import restrictPoint from './util/restrictPoint';
import useSamplesAlongPath from './util/useSamplesAlongPath';

export type MouseTouchOrPointerEvent = MouseEvent | TouchEvent | PointerEvent;

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
  /** Limit drag to an SVG path. Overrides `restrict` constraints. */
  restrictToPath?: SVGGeometryElement | null;
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
  restrictToPath,
}: UseDragOptions | undefined = {}): UseDrag {
  // use ref to detect prop changes
  const positionPropsRef = useRef({ x, y, dx, dy });

  const [dragState, setDragStateWithCallback] = useStateWithCallback<DragState>({
    x,
    y,
    dx: dx ?? 0,
    dy: dy ?? 0,
    isDragging: false,
  });

  // Track distance between pointer on dragStart and position of element being dragged
  const [dragStartPointerOffset, setDragStartPointerOffset] = useState<Point>(
    new Point({ x: 0, y: 0 }),
  );

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

  const restrictToPathSamples = useSamplesAlongPath(restrictToPath);

  const handleDragStart = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        (currState) => {
          // eslint-disable-next-line no-shadow
          const { x = 0, y = 0, dx, dy } = currState;
          const currentPoint = new Point({
            x: (x || 0) + dx,
            y: (y || 0) + dy,
          });
          const eventPoint = localPoint(event) || new Point({ x: 0, y: 0 });
          const point = snapToPointer ? eventPoint : currentPoint;
          const dragPoint = restrictPoint(point, restrictToPathSamples, restrict);

          setDragStartPointerOffset(subtractPoints(currentPoint, eventPoint));

          return {
            isDragging: true,
            dx: resetOnStart ? 0 : currState.dx,
            dy: resetOnStart ? 0 : currState.dy,
            x: resetOnStart ? dragPoint.x : dragPoint.x - currState.dx,
            y: resetOnStart ? dragPoint.y : dragPoint.y - currState.dy,
          };
        },
        onDragStart &&
          ((currState) => {
            onDragStart({ ...currState, event });
          }),
      );
    },
    [
      onDragStart,
      resetOnStart,
      restrict,
      restrictToPathSamples,
      setDragStateWithCallback,
      snapToPointer,
    ],
  );

  const handleDragMove = useCallback(
    (event: MouseTouchOrPointerEvent) => {
      event.persist();

      setDragStateWithCallback(
        (currState) => {
          if (!currState.isDragging) return currState;
          // eslint-disable-next-line no-shadow
          const { x = 0, y = 0 } = currState;
          const pointerPoint = localPoint(event) || new Point({ x: 0, y: 0 });
          const point = snapToPointer
            ? pointerPoint
            : sumPoints(pointerPoint, dragStartPointerOffset);
          const dragPoint = restrictPoint(point, restrictToPathSamples, restrict);
          return {
            ...currState,
            dx: dragPoint.x - x,
            dy: dragPoint.y - y,
          };
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
      dragStartPointerOffset,
      restrictToPathSamples,
      restrict,
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
