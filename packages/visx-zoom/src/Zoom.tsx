import React, { useState, useRef } from 'react';
import { localPoint } from '@visx/event';
import { useGesture, WebKitGestureEvent, Handler } from '@use-gesture/react';
import {
  composeMatrices,
  inverseMatrix,
  applyMatrixToPoint,
  applyInverseMatrixToPoint,
  translateMatrix,
  identityMatrix,
  scaleMatrix,
} from './util/matrix';
import { TransformMatrix, Point, Translate, Scale, ScaleSignature, ProvidedZoom } from './types';

export type ZoomProps<ElementType> = {
  /** Width of the zoom container. */
  width: number;
  /** Height of the zoom container. */
  height: number;
  /**
   * ```js
   *  wheelDelta(event)
   * ```
   *
   * A function that returns { scaleX,scaleY } factors to scale the matrix by.
   * Scale factors greater than 1 will increase (zoom in), less than 1 will descrease (zoom out).
   */
  wheelDelta?: (event: React.WheelEvent | WheelEvent) => Scale;
  /**
   * ```js
   *  pinchDelta(state)
   * ```
   *
   * A function that returns { scaleX, scaleY, point } factors to scale the matrix by.
   * Scale factors greater than 1 will increase (zoom in), less than 1 will descrease (zoom out), the point is used to find where to zoom.
   * The state parameter is from react-use-gestures onPinch handler
   */
  pinchDelta?: (
    params: Parameters<
      Handler<'pinch', TouchEvent | PointerEvent | WheelEvent | WebKitGestureEvent>
    >[0],
  ) => ScaleSignature;
  /** Minimum x scale value for transform. */
  scaleXMin?: number;
  /** Maximum x scale value for transform. */
  scaleXMax?: number;
  /** Minimum y scale value for transform. */
  scaleYMin?: number;
  /** Maximum y scale value for transform. */
  scaleYMax?: number;
  /**
   * By default constrain() will only constrain scale values. To change
   * constraints you can pass in your own constrain function as a prop.
   *
   * For example, if you wanted to constrain your view to within [[0, 0], [width, height]]:
   *
   * ```js
   * function constrain(transformMatrix, prevTransformMatrix) {
   *   const min = applyMatrixToPoint(transformMatrix, { x: 0, y: 0 });
   *   const max = applyMatrixToPoint(transformMatrix, { x: width, y: height });
   *   if (max.x < width || max.y < height) {
   *     return prevTransformMatrix;
   *   }
   *   if (min.x > 0 || min.y > 0) {
   *     return prevTransformMatrix;
   *   }
   *   return transformMatrix;
   * }
   * ```
   */
  constrain?: (transform: TransformMatrix, prevTransform: TransformMatrix) => TransformMatrix;
  /** Initial transform matrix to apply. */
  initialTransformMatrix?: TransformMatrix;
  children: (zoom: ProvidedZoom<ElementType> & ZoomState) => React.ReactNode;
};

type ZoomState = {
  initialTransformMatrix: TransformMatrix;
  transformMatrix: TransformMatrix;
  isDragging: boolean;
};

function Zoom<ElementType extends Element>({
  scaleXMin = 0,
  scaleXMax = Infinity,
  scaleYMin = 0,
  scaleYMax = Infinity,
  initialTransformMatrix = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
  },
  wheelDelta = (event: React.WheelEvent | WheelEvent) =>
    -event.deltaY > 0 ? { scaleX: 1.1, scaleY: 1.1 } : { scaleX: 0.9, scaleY: 0.9 },
  pinchDelta,
  width,
  height,
  constrain,
  children,
}: ZoomProps<ElementType>): JSX.Element {
  const containerRef = useRef<ElementType>(null);
  const matrixStateRef = useRef<TransformMatrix>(initialTransformMatrix);

  const [transformMatrix, setTransformMatrixState] = useState<TransformMatrix>(
    initialTransformMatrix!,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startTranslate, setStartTranslate] = useState<Translate | undefined>(undefined);
  const [startPoint, setStartPoint] = useState<Point | undefined>(undefined);

  const defaultConstrain = (
    newTransformMatrix: TransformMatrix,
    prevTransformMatrix: TransformMatrix,
  ) => {
    if (constrain) return constrain(newTransformMatrix, prevTransformMatrix);
    const { scaleX, scaleY } = newTransformMatrix;
    const shouldConstrainScaleX = scaleX > scaleXMax! || scaleX < scaleXMin!;
    const shouldConstrainScaleY = scaleY > scaleYMax! || scaleY < scaleYMin!;

    if (shouldConstrainScaleX || shouldConstrainScaleY) {
      return prevTransformMatrix;
    }
    return newTransformMatrix;
  };

  const setTransformMatrix = (newTransformMatrix: TransformMatrix) => {
    setTransformMatrixState(prevTransformMatrix => {
      const updatedTransformMatrix = defaultConstrain(newTransformMatrix, prevTransformMatrix);
      matrixStateRef.current = updatedTransformMatrix;
      return updatedTransformMatrix;
    });
  };

  const applyToPoint = ({ x, y }: Point) => {
    return applyMatrixToPoint(transformMatrix, { x, y });
  };

  const applyInverseToPoint = ({ x, y }: Point) => {
    return applyInverseMatrixToPoint(transformMatrix, { x, y });
  };

  const reset = () => {
    setTransformMatrix(initialTransformMatrix);
  };

  const scale = ({ scaleX, scaleY: maybeScaleY, point }: ScaleSignature) => {
    const scaleY = maybeScaleY || scaleX;
    const cleanPoint = point || { x: width / 2, y: height / 2 };
    // need to use ref value instead of state here because wheel listener does not have access to latest state
    const translate = applyInverseMatrixToPoint(matrixStateRef.current, cleanPoint);
    const nextMatrix = composeMatrices(
      matrixStateRef.current,
      translateMatrix(translate.x, translate.y),
      scaleMatrix(scaleX, scaleY),
      translateMatrix(-translate.x, -translate.y),
    );
    setTransformMatrix(nextMatrix);
  };

  const translate = ({ translateX, translateY }: Translate) => {
    const nextMatrix = composeMatrices(transformMatrix, translateMatrix(translateX, translateY));
    setTransformMatrix(nextMatrix);
  };

  const setTranslate = ({ translateX, translateY }: Translate) => {
    const nextMatrix = {
      ...transformMatrix,
      translateX,
      translateY,
    };
    setTransformMatrix(nextMatrix);
  };

  const translateTo = ({ x, y }: Point) => {
    const point = applyInverseMatrixToPoint(transformMatrix, { x, y });
    setTranslate({ translateX: point.x, translateY: point.y });
  };

  const invert = () => inverseMatrix(transformMatrix);

  const toStringInvert = () => {
    const { translateX, translateY, scaleX, scaleY, skewX, skewY } = invert();
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  };

  const dragStart = (
    event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.PointerEvent,
  ) => {
    const { translateX, translateY } = transformMatrix;
    setStartPoint(localPoint(event) || undefined);
    setStartTranslate({ translateX, translateY });
    setIsDragging(true);
  };

  const dragMove = (
    event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.PointerEvent,
    options?: { offsetX?: number; offsetY?: number },
  ) => {
    if (!isDragging || !startPoint || !startTranslate) return;
    const currentPoint = localPoint(event);
    const dx = currentPoint ? -(startPoint.x - currentPoint.x) : -startPoint.x;
    const dy = currentPoint ? -(startPoint.y - currentPoint.y) : -startPoint.y;

    let translateX = startTranslate.translateX + dx;
    if (options?.offsetX) translateX += options?.offsetX;
    let translateY = startTranslate.translateY + dy;
    if (options?.offsetY) translateY += options?.offsetY;
    setTranslate({
      translateX,
      translateY,
    });
  };

  const dragEnd = () => {
    setStartPoint(undefined);
    setStartTranslate(undefined);
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent | WheelEvent) => {
    event.preventDefault();
    const point = localPoint(event) || undefined;
    const { scaleX, scaleY } = wheelDelta!(event);
    scale({ scaleX, scaleY, point });
  };

  const handlePinch: Parameters<typeof useGesture>[0]['onPinch'] = state => {
    if (pinchDelta) {
      return scale(pinchDelta(state));
    }

    const {
      origin: [ox, oy],
      offset: [s],
      lastOffset: [lastS],
    } = state;
    if (containerRef.current) {
      const { top, left } = containerRef.current.getBoundingClientRect();
      scale({
        scaleX: s - lastS < 0 ? 0.9 : 1.1,
        scaleY: s - lastS < 0 ? 0.9 : 1.1,
        point: { x: ox - left, y: oy - top },
      });
    }
  };

  const toString = () => {
    const { translateX, translateY, scaleX, scaleY, skewX, skewY } = transformMatrix;
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  };

  const center = () => {
    const centerPoint = { x: width / 2, y: height / 2 };
    const inverseCentroid = applyInverseToPoint(centerPoint);
    translate({
      translateX: inverseCentroid.x - centerPoint.x,
      translateY: inverseCentroid.y - centerPoint.y,
    });
  };

  const clear = () => {
    setTransformMatrix(identityMatrix());
  };

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (!(event instanceof KeyboardEvent)) dragStart(event);
      },
      onDrag: ({ event, pinching, cancel }) => {
        if (pinching) {
          cancel();
          dragEnd();
        } else if (!(event instanceof KeyboardEvent)) {
          dragMove(event);
        }
      },
      onDragEnd: dragEnd,
      onPinch: handlePinch,
      onWheel: ({ event }) => handleWheel(event),
    },
    { target: containerRef, eventOptions: { passive: false }, drag: { filterTaps: true } },
  );

  const zoom: ProvidedZoom<ElementType> & ZoomState = {
    initialTransformMatrix,
    transformMatrix,
    isDragging,
    center,
    clear,
    scale,
    translate,
    translateTo,
    setTranslate,
    setTransformMatrix,
    reset,
    handleWheel,
    handlePinch,
    dragEnd,
    dragMove,
    dragStart,
    toString,
    invert,
    toStringInvert,
    applyToPoint,
    applyInverseToPoint,
    containerRef,
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children(zoom)}</>;
}

export default Zoom;
