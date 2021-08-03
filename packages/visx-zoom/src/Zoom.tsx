import React from 'react';
import { localPoint } from '@visx/event';
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

export type ZoomProps = {
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
  transformMatrix?: TransformMatrix;
  /**
   * When `false` (default), `<Zoom>` `children` are wrapped in a `<div>` with an active wheel
   * event listener (`handleWheel`). `handleWheel()` will call `event.preventDefault()` before other
   * execution to prevent an outer parent from scrolling when the mouse wheel is used to zoom.
   *
   * When passive is `true` it is **required** to add `<MyComponent onWheel={zoom.handleWheel} />` to handle
   * wheel events. **Note:** By default you do not need to add `<MyComponent onWheel={zoom.handleWheel} />`.
   * This is only necessary when `<Zoom passive={true} />`.
   */
  passive?: boolean;
  /** style object to apply to zoom div container. */
  style?: React.CSSProperties;
  /** className to apply to zoom div container. */
  className?: string;
  children: (zoom: ProvidedZoom & ZoomState) => React.ReactNode;
};

type ZoomState = {
  initialTransformMatrix: TransformMatrix;
  transformMatrix: TransformMatrix;
  isDragging: boolean;
};

class Zoom extends React.Component<ZoomProps, ZoomState> {
  static defaultProps = {
    passive: false,
    scaleXMin: 0,
    scaleXMax: Infinity,
    scaleYMin: 0,
    scaleYMax: Infinity,
    transformMatrix: {
      scaleX: 1,
      scaleY: 1,
      translateX: 0,
      translateY: 0,
      skewX: 0,
      skewY: 0,
    },
    wheelDelta: (event: React.WheelEvent | WheelEvent) =>
      -event.deltaY > 0 ? { scaleX: 1.1, scaleY: 1.1 } : { scaleX: 0.9, scaleY: 0.9 },
    style: undefined,
    className: undefined,
  };

  containerRef: HTMLDivElement | null = null;

  startPoint: Point | undefined = undefined;

  startTranslate: Translate | undefined = undefined;

  state = {
    initialTransformMatrix: this.props.transformMatrix!,
    transformMatrix: this.props.transformMatrix!,
    isDragging: false,
  };

  componentDidMount() {
    const { passive } = this.props;
    if (this.containerRef && !passive) {
      this.containerRef.addEventListener('wheel', this.handleWheel, { passive: false });
    }
  }

  componentWillUnmount() {
    const { passive } = this.props;
    if (this.containerRef && !passive) {
      this.containerRef.removeEventListener('wheel', this.handleWheel);
    }
  }

  applyToPoint = ({ x, y }: Point) => {
    const { transformMatrix } = this.state;
    return applyMatrixToPoint(transformMatrix, { x, y });
  };

  applyInverseToPoint = ({ x, y }: Point) => {
    const { transformMatrix } = this.state;
    return applyInverseMatrixToPoint(transformMatrix, { x, y });
  };

  reset = () => {
    const { initialTransformMatrix } = this.state;
    this.setTransformMatrix(initialTransformMatrix);
  };

  scale = ({ scaleX, scaleY: maybeScaleY, point }: ScaleSignature) => {
    const scaleY = maybeScaleY || scaleX;
    const { transformMatrix } = this.state;
    const { width, height } = this.props;
    const cleanPoint = point || { x: width / 2, y: height / 2 };
    const translate = applyInverseMatrixToPoint(transformMatrix, cleanPoint);
    const nextMatrix = composeMatrices(
      transformMatrix,
      translateMatrix(translate.x, translate.y),
      scaleMatrix(scaleX, scaleY),
      translateMatrix(-translate.x, -translate.y),
    );
    this.setTransformMatrix(nextMatrix);
  };

  translate = ({ translateX, translateY }: Translate) => {
    const { transformMatrix } = this.state;
    const nextMatrix = composeMatrices(transformMatrix, translateMatrix(translateX, translateY));
    this.setTransformMatrix(nextMatrix);
  };

  translateTo = ({ x, y }: Point) => {
    const { transformMatrix } = this.state;
    const point = applyInverseMatrixToPoint(transformMatrix, { x, y });
    this.setTranslate({ translateX: point.x, translateY: point.y });
  };

  setTranslate = ({ translateX, translateY }: Translate) => {
    const { transformMatrix } = this.state;
    const nextMatrix = {
      ...transformMatrix,
      translateX,
      translateY,
    };
    this.setTransformMatrix(nextMatrix);
  };

  setTransformMatrix = (transformMatrix: TransformMatrix) => {
    this.setState((prevState) => ({
      transformMatrix: this.constrain(transformMatrix, prevState.transformMatrix),
    }));
  };

  invert = () => inverseMatrix(this.state.transformMatrix);

  toStringInvert = () => {
    const { translateX, translateY, scaleX, scaleY, skewX, skewY } = this.invert();
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  };

  constrain = (transformMatrix: TransformMatrix, prevTransformMatrix: TransformMatrix) => {
    if (this.props.constrain) return this.props.constrain(transformMatrix, prevTransformMatrix);
    const { scaleXMin, scaleXMax, scaleYMin, scaleYMax } = this.props;
    const { scaleX, scaleY } = transformMatrix;
    const shouldConstrainScaleX = scaleX > scaleXMax! || scaleX < scaleXMin!;
    const shouldConstrainScaleY = scaleY > scaleYMax! || scaleY < scaleYMin!;

    if (shouldConstrainScaleX || shouldConstrainScaleY) {
      return prevTransformMatrix;
    }
    return transformMatrix;
  };

  dragStart = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const { transformMatrix } = this.state;
    const { translateX, translateY } = transformMatrix;
    this.startPoint = localPoint(event) || undefined;
    this.startTranslate = { translateX, translateY };
    this.setState({ isDragging: true });
  };

  dragMove = (
    event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent,
    options?: { offsetX?: number; offsetY?: number },
  ) => {
    if (!this.state.isDragging || !this.startPoint || !this.startTranslate) return;
    const currentPoint = localPoint(event);
    const dx = currentPoint ? -(this.startPoint.x - currentPoint.x) : -this.startPoint.x;
    const dy = currentPoint ? -(this.startPoint.y - currentPoint.y) : -this.startPoint.y;

    let translateX = this.startTranslate.translateX + dx;
    if (options?.offsetX) translateX += options?.offsetX;
    let translateY = this.startTranslate.translateY + dy;
    if (options?.offsetY) translateY += options?.offsetY;
    this.setTranslate({
      translateX,
      translateY,
    });
  };

  dragEnd = () => {
    this.startPoint = undefined;
    this.startTranslate = undefined;
    this.setState({ isDragging: false });
  };

  handleWheel = (event: React.WheelEvent | WheelEvent) => {
    const { passive, wheelDelta } = this.props;
    if (!passive) event.preventDefault();
    const point = localPoint(event) || undefined;
    const { scaleX, scaleY } = wheelDelta!(event);
    this.scale({ scaleX, scaleY, point });
  };

  toString = () => {
    const { transformMatrix } = this.state;
    const { translateX, translateY, scaleX, scaleY, skewX, skewY } = transformMatrix;
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  };

  center = () => {
    const { width, height } = this.props;
    const center = { x: width / 2, y: height / 2 };
    const inverseCentroid = this.applyInverseToPoint(center);
    this.translate({
      translateX: inverseCentroid.x - center.x,
      translateY: inverseCentroid.y - center.y,
    });
  };

  clear = () => {
    this.setTransformMatrix(identityMatrix());
  };

  render() {
    const { passive, children, style, className } = this.props;
    const zoom: ProvidedZoom & ZoomState = {
      ...this.state,
      center: this.center,
      clear: this.clear,
      scale: this.scale,
      translate: this.translate,
      translateTo: this.translateTo,
      setTranslate: this.setTranslate,
      setTransformMatrix: this.setTransformMatrix,
      reset: this.reset,
      handleWheel: this.handleWheel,
      dragEnd: this.dragEnd,
      dragMove: this.dragMove,
      dragStart: this.dragStart,
      toString: this.toString,
      invert: this.invert,
      toStringInvert: this.toStringInvert,
      applyToPoint: this.applyToPoint,
      applyInverseToPoint: this.applyInverseToPoint,
    };
    if (!passive) {
      return (
        <div
          ref={(c) => {
            this.containerRef = c;
          }}
          style={style}
          className={className}
        >
          {children(zoom)}
        </div>
      );
    }
    return children(zoom);
  }
}

export default Zoom;
