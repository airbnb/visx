/* eslint-disable no-case-declarations */
export function identityMatrix() {
  return {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
  };
}

export function createMatrix({
  scaleX = 1,
  scaleY = 1,
  translateX = 0,
  translateY = 0,
  skewX = 0,
  skewY = 0,
}) {
  return {
    scaleX,
    scaleY,
    translateX,
    translateY,
    skewX,
    skewY,
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
    skewY: skewY / -denominator,
  };
}

export function applyMatrixToPoint(matrix, { x, y }) {
  return {
    x: matrix.scaleX * x + matrix.skewX * y + matrix.translateX,
    y: matrix.skewY * x + matrix.scaleY * y + matrix.translateY,
  };
}

export function applyInverseMatrixToPoint(matrix, { x, y }) {
  return applyMatrixToPoint(inverseMatrix(matrix), { x, y });
}

export function scaleMatrix(scaleX, maybeScaleY = undefined) {
  const scaleY = maybeScaleY || scaleX;
  return createMatrix({ scaleX, scaleY });
}

export function translateMatrix(translateX, translateY) {
  return createMatrix({ translateX, translateY });
}

export function multiplyMatrices(matrix1, matrix2) {
  return {
    scaleX: matrix1.scaleX * matrix2.scaleX + matrix1.skewX * matrix2.skewY,
    scaleY: matrix1.skewY * matrix2.skewX + matrix1.scaleY * matrix2.scaleY,
    translateX:
      matrix1.scaleX * matrix2.translateX + matrix1.skewX * matrix2.translateY + matrix1.translateX,
    translateY:
      matrix1.skewY * matrix2.translateX + matrix1.scaleY * matrix2.translateY + matrix1.translateY,
    skewX: matrix1.scaleX * matrix2.skewX + matrix1.skewX * matrix2.scaleY,
    skewY: matrix1.skewY * matrix2.scaleX + matrix1.scaleY * matrix2.skewY,
  };
}

export function composeMatrices(...matrices) {
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
