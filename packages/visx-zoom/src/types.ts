import type { UserHandlers, WebKitGestureEvent, Handler } from '@use-gesture/react';
import type {
  RefObject,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';

export type GenericWheelEvent = ReactWheelEvent | WheelEvent;

export type InteractionEvent =
  | ReactMouseEvent
  | ReactTouchEvent
  | ReactPointerEvent
  | MouseEvent
  | TouchEvent
  | PointerEvent;

export interface TransformMatrix {
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
  skewX: number;
  skewY: number;
}

export interface Point {
  x: number;
  y: number;
}

export type Translate = Pick<TransformMatrix, 'translateX' | 'translateY'>;

export type Scale = Pick<TransformMatrix, 'scaleX' | 'scaleY'>;

export type PinchDelta = (
  params: Parameters<
    Handler<
      'pinch',
      | TouchEvent
      | ReactTouchEvent
      | PointerEvent
      | ReactPointerEvent
      | WheelEvent
      | ReactWheelEvent
      | WebKitGestureEvent
    >
  >[0],
) => Scale;

export interface ScaleSignature {
  scaleX: TransformMatrix['scaleX'];
  scaleY?: TransformMatrix['scaleY'];
  point?: Point;
}

export interface ProvidedZoom<ElementType> {
  /** Sets translateX/Y to the center defined by width and height. */
  center: () => void;
  /** Sets the transform matrix to the identity matrix. */
  clear: () => void;
  /** Applies the specified scaleX + optional scaleY transform relative to the specified point (or center of canvas if unspecified). */
  scale: (scale: ScaleSignature) => void;
  /** Multiplies the current transform matrix by the specified translation. */
  translate: (translate: Translate) => void;
  /** Translates to a specific x,y point. */
  translateTo: (point: Point) => void;
  /** Sets the translation of the current transform matrix to the specified translation. */
  setTranslate: (translate: Translate) => void;
  /**
   * Sets the transform matrix to the specified matrix, constraining the transform
   * scale by default (or applying props.constrain if provided).
   */
  setTransformMatrix: (matrix: TransformMatrix) => void;
  /** Resets the transform to the initial transform specified by props. */
  reset: () => void;
  /** Callback for a wheel event, updating scale based on props.wheelDelta, relative to the mouse position. */
  handleWheel: (event: ReactWheelEvent | WheelEvent) => void;
  /** Callback for a @use-gesture/react on pinch event, updating scale based on props.pinchDelta, relative to the pinch position. */
  handlePinch: UserHandlers['onPinch'];
  /** Callback for dragEnd, sets isDragging to false. */
  dragEnd: () => void;
  /** Callback for dragMove, results in a scale transform. */
  dragMove: (event: InteractionEvent, options?: { offsetX?: number; offsetY?: number }) => void;
  /** Callback for dragStart, sets isDragging to true.  */
  dragStart: (event: InteractionEvent) => void;
  /**
   * Returns a string representation of the matrix transform:
   * matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})
   */
  toString: () => string;
  /** Returns the inverse of the current transform matrix. */
  invert: () => TransformMatrix;
  /**
   * Returns the string representation of the inverse of the current transform matrix:
   * matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})
   */
  toStringInvert: () => string;
  /** Applies the current transform matrix to the specified point. */
  applyToPoint: ({ x, y }: Point) => Point;
  /** Applies the inverse of the current transform matrix to the specified point. */
  applyInverseToPoint: ({ x, y }: Point) => Point;
  /** Ref to stick on element to attach all handlers automatically. */
  containerRef: RefObject<ElementType | null>;
}

/** Internal state properties exposed by the Zoom component. */
export interface ZoomState {
  /** The initial transform matrix specified by props. */
  initialTransformMatrix: TransformMatrix;
  /** The current transform matrix. */
  transformMatrix: TransformMatrix;
  /** Whether the user is currently dragging. */
  isDragging: boolean;
}

/** Complete Zoom API including methods and state, passed to children render prop. */
export type Zoom<ElementType> = ProvidedZoom<ElementType> & ZoomState;
