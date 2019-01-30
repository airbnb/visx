import React from 'react';
import PropTypes from 'prop-types';
import { localPoint } from '@vx/event';
import {
  composeMatrices,
  inverseMatrix,
  applyMatrixToPoint,
  applyInverseMatrixToPoint,
  translateMatrix,
  identityMatrix,
  scaleMatrix
} from './util/matrix';

class Zoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialTransformMatrix: props.transformMatrix,
      transformMatrix: props.transformMatrix,
      isDragging: false
    };

    this.toString = this.toString.bind(this);
    this.clear = this.clear.bind(this);
    this.center = this.center.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.reset = this.reset.bind(this);
    this.constrain = props.constrain ? props.constrain.bind(this) : this.constrain.bind(this);
    this.scale = this.scale.bind(this);
    this.translate = this.translate.bind(this);
    this.translateTo = this.translateTo.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.setTransformMatrix = this.setTransformMatrix.bind(this);
    this.invert = this.invert.bind(this);
    this.applyToPoint = this.applyToPoint.bind(this);
    this.applyInverseToPoint = this.applyInverseToPoint.bind(this);
    this.toStringInvert = this.toStringInvert.bind(this);
  }

  applyToPoint({ x, y }) {
    const { transformMatrix } = this.state;
    return applyMatrixToPoint(transformMatrix, { x, y });
  }

  applyInverseToPoint({ x, y }) {
    const { transformMatrix } = this.state;
    return applyInverseMatrixToPoint(transformMatrix, { x, y });
  }

  reset() {
    const { initialTransformMatrix } = this.state;
    this.setTransformMatrix(initialTransformMatrix);
  }

  scale({ scaleX, scaleY, point }) {
    if (!scaleY) scaleY = scaleX;
    const { transformMatrix } = this.state;
    const { width, height } = this.props;
    point = point || { x: width / 2, y: height / 2 };
    const translate = applyInverseMatrixToPoint(transformMatrix, point);
    const nextMatrix = composeMatrices(
      transformMatrix,
      translateMatrix(translate.x, translate.y),
      scaleMatrix(scaleX, scaleY),
      translateMatrix(-translate.x, -translate.y)
    );
    this.setTransformMatrix(nextMatrix);
  }

  translate({ translateX, translateY }) {
    const { transformMatrix } = this.state;
    const nextMatrix = composeMatrices(transformMatrix, translateMatrix(translateX, translateY));
    this.setTransformMatrix(nextMatrix);
  }

  translateTo({ x, y }) {
    const { transformMatrix } = this.state;
    const point = applyInverseMatrixToPoint(transformMatrix, { x, y });
    this.setTranslate({ translateX: point.x, translateY: point.y });
  }

  setTranslate({ translateX, translateY }) {
    const { transformMatrix } = this.state;
    const nextMatrix = {
      ...transformMatrix,
      translateX,
      translateY
    };
    this.setTransformMatrix(nextMatrix);
  }

  setTransformMatrix(transformMatrix) {
    this.setState(prevState => {
      return { transformMatrix: this.constrain(transformMatrix, prevState.transformMatrix) };
    });
  }

  invert() {
    return inverseMatrix(this.state.transformMatrix);
  }

  toStringInvert() {
    const { translateX, translateY, scaleX, scaleY, skewX, skewY } = this.invert();
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  }

  constrain(transformMatrix, prevTransformMatrix) {
    const { scaleXMin, scaleXMax, scaleYMin, scaleYMax, constrain } = this.props;
    const { scaleX, scaleY } = transformMatrix;
    const shouldConstrainScaleX = scaleX > scaleXMax || scaleX < scaleXMin;
    const shouldConstrainScaleY = scaleY > scaleYMax || scaleY < scaleYMin;

    if (shouldConstrainScaleX || shouldConstrainScaleY) {
      return prevTransformMatrix;
    }
    return transformMatrix;
  }

  dragStart(event) {
    const { transformMatrix } = this.state;
    const { translateX, translateY } = transformMatrix;
    this.startPoint = localPoint(event);
    this.startTranslate = { translateX, translateY };
    this.setState({ isDragging: true });
  }

  dragMove(event) {
    if (!this.state.isDragging) return;
    const currentPoint = localPoint(event);
    const dx = -(this.startPoint.x - currentPoint.x);
    const dy = -(this.startPoint.y - currentPoint.y);
    this.setTranslate({
      translateX: this.startTranslate.translateX + dx,
      translateY: this.startTranslate.translateY + dy
    });
  }

  dragEnd(event) {
    this.startPoint = undefined;
    this.startTranslate = undefined;
    this.setState({ isDragging: false });
  }

  handleWheel(event) {
    event.preventDefault();
    const { wheelDelta } = this.props;
    const point = localPoint(event);
    const { scaleX, scaleY } = wheelDelta(event);
    this.scale({ scaleX, scaleY, point });
  }

  toString() {
    const { transformMatrix } = this.state;
    const { translateX, translateY, scaleX, scaleY, skewX, skewY } = transformMatrix;
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  }

  center() {
    const { width, height } = this.props;
    const center = { x: width / 2, y: height / 2 };
    const inverseCentroid = this.applyInverseToPoint(center);
    this.translate({
      translateX: inverseCentroid.x - center.x,
      translateY: inverseCentroid.y - center.y
    });
  }

  clear() {
    this.setTransformMatrix(identityMatrix());
  }

  render() {
    const { children } = this.props;
    const zoom = {
      ...this.state,
      center: this.center,
      clear: this.clear,
      scale: this.scale,
      scaleTo: this.scaleTo,
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
      applyInverseToPoint: this.applyInverseToPoint
    };
    return children(zoom);
  }
}

Zoom.propTypes = {
  children: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  /**
   * ```js
   *  wheelDelta(event.deltaY)
   * ```
   *
   * A function that returns {scaleX,scaleY} factors to scale the matrix by.
   * Scale factors greater than 1 will increase (zoom in), less than 1 will descrease (zoom out).
   */
  wheelDelta: PropTypes.func,
  scaleXMin: PropTypes.number,
  scaleXMax: PropTypes.number,
  scaleYMin: PropTypes.number,
  scaleYMax: PropTypes.number,
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
   *
   * @param {matrix} transformMatrix
   * @param {matrix} prevTransformMatrix
   * @returns {martix}
   */
  constrain: PropTypes.func,
  transformMatrix: PropTypes.shape({
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    skewX: PropTypes.number,
    skewY: PropTypes.number
  })
};

Zoom.defaultProps = {
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
    skewY: 0
  },
  wheelDelta: event => {
    return -event.deltaY > 0 ? { scaleX: 1.1, scaleY: 1.1 } : { scaleX: 0.9, scaleY: 0.9 };
  }
};

export default Zoom;
