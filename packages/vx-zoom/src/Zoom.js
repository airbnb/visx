/* eslint-disable no-trailing-spaces */
/* eslint-disable no-case-declarations */
import React from 'react';
import PropTypes from 'prop-types';
import { localPoint } from '@vx/event';

export function identityMatrix() {
  return {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  };
}

export function createMatrix({
  scaleX = 1,
  scaleY = 1,
  translateX = 0,
  translateY = 0,
  skewX = 0,
  skewY = 0
}) {
  return {
    scaleX,
    scaleY,
    translateX,
    translateY,
    skewX,
    skewY
  };
}

export function inverseMatrix({ scaleX, scaleY, translateX, translateY, skewX, skewY }) {
  const denominator = scaleX * scaleY - skewY * skewX;
  return {
    scaleX: scaleY / denominator,
    scaleY: scaleX / denominator,
    translateX: (scaleY * translateX - skewX * translateY) / -denominator,
    translateY: (skewY * translateX - scaleX * translateY) / denominator,
    skewX: skewX / -denominator,
    skewY: skewY / -denominator
  };
}

export function applyMatrixToPoint(matrix, { x, y }) {
  return {
    x: matrix.scaleX * x + matrix.skewX * y + matrix.translateX,
    y: matrix.skewY * x + matrix.scaleY * y + matrix.translateY
  };
}

export function applyInverseMatrixToPoint(matrix, { x, y }) {
  return applyMatrixToPoint(inverseMatrix(matrix), { x, y });
}

export function scaleMatrix(scaleX, scaleY = undefined) {
  if (!scaleY) scaleY = scaleX;
  return createMatrix({ scaleX, scaleY });
}

export function translateMatrix(translateX, translateY = undefined) {
  if (!translateY) translateY = translateX;
  return createMatrix({ translateX, translateY });
}

function multiplyMatrices(matrix1, matrix2) {
  return {
    scaleX: matrix1.scaleX * matrix2.scaleX + matrix1.skewX * matrix2.skewY,
    scaleY: matrix1.skewY * matrix2.skewX + matrix1.scaleY * matrix2.scaleY,
    translateX:
      matrix1.scaleX * matrix2.translateX + matrix1.skewX * matrix2.translateY + matrix1.translateX,
    translateY:
      matrix1.skewY * matrix2.translateX + matrix1.scaleY * matrix2.translateY + matrix1.translateY,
    skewX: matrix1.scaleX * matrix2.skewX + matrix1.skewX * matrix2.scaleY,
    skewY: matrix1.skewY * matrix2.scaleX + matrix1.scaleY * matrix2.skewY
  };
}

function composeMatrices(...matrices) {
  switch (matrices.length) {
    case 0:
      throw new Error('composeMatrices() requires arguments: was called with no args');
    case 1:
      return matrices[0];
    case 2:
      return multiplyMatrices(matrices[0], matrices[1]);
    default:
      const [matrix1, matrix2, ...restMatrices] = matrices;
      const matrix = multiplyMatrices(matrix1, matrix2);
      return composeMatrices(matrix, ...restMatrices);
  }
}

class Zoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialTransformMatrix: props.transformMatrix,
      transformMatrix: props.transformMatrix,
      isDragging: false
    };

    this.toString = this.toString.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.reset = this.reset.bind(this);
    this.constrain = props.constrain || this.constrain.bind(this);
    this.scale = this.scale.bind(this);
    this.translate = this.translate.bind(this);
    this.translateTo = this.translateTo.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.setTransformMatrix = this.setTransformMatrix.bind(this);
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
    if (!translateY) translateY = translateX;
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

  constrain(transformMatrix, prevTransformMatrix) {
    const {
      scaleXMin,
      scaleXMax,
      scaleYMin,
      scaleYMax,
      translateXMin,
      translateXMax,
      translateYMin,
      translateYMax,
      skewXMin,
      skewXMax,
      skewYMin,
      skewYMax
    } = this.props;
    const { scaleX, scaleY, translateX, translateY, skewX, skewY } = transformMatrix;
    const nextScaleX = Math.min(scaleXMax, Math.max(scaleXMin, scaleX));
    const nextScaleY = Math.min(scaleYMax, Math.max(scaleYMin, scaleY));
    const nextTranslateX = Math.min(translateXMax, Math.max(translateXMin, translateX));
    const nextTranslateY = Math.min(translateYMax, Math.max(translateYMin, translateY));
    const nextSkewX = Math.min(skewXMax, Math.max(skewXMin, skewX));
    const nextSkewY = Math.min(skewYMax, Math.max(skewYMin, skewY));
    return {
      scaleX: nextScaleX,
      scaleY: nextScaleY,
      translateX: nextTranslateX,
      translateY: nextTranslateY,
      skewX: nextSkewX,
      skewY: nextSkewY
    };
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
    const { scaleX, scaleY } = wheelDelta(event.deltaY);
    this.scale({ scaleX, scaleY, point });
  }

  toString() {
    const { transformMatrix } = this.state;
    const { translateX, translateY, scaleX, scaleY, skewX, skewY } = transformMatrix;
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  }

  render() {
    const { children } = this.props;
    const zoom = {
      ...this.state,
      center: this.center,
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
      toString: this.toString
    };
    return children(zoom);
  }
}

Zoom.propTypes = {
  children: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  /**
   * ```js
   *  wheelDelta(event.deltaY)
   * ```
   *
   * A function that returns {scaleX,scaleY} to scale the matrix by.
   */
  wheelDelta: PropTypes.func,
  scaleXMin: PropTypes.number,
  scaleXMax: PropTypes.number,
  scaleYMin: PropTypes.number,
  scaleYMax: PropTypes.number,
  translateXMin: PropTypes.number,
  translateXMax: PropTypes.number,
  translateYMin: PropTypes.number,
  translateYMax: PropTypes.number,
  skewXMin: PropTypes.number,
  skewXMax: PropTypes.number,
  skewYMin: PropTypes.number,
  skewYMax: PropTypes.number,
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
  translateXMin: -Infinity,
  translateXMax: Infinity,
  translateYMin: -Infinity,
  translateYMax: Infinity,
  skewXMin: -Infinity,
  skewXMax: Infinity,
  skewYMin: -Infinity,
  skewYMax: Infinity,
  transformMatrix: {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  },
  wheelDelta: deltaY => {
    return deltaY > 0 ? { scaleX: 1.1, scaleY: 1.1 } : { scaleX: 0.9, scaleY: 0.9 };
  }
};

export default Zoom;
