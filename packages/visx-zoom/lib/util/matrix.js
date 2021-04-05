"use strict";

exports.__esModule = true;
exports.identityMatrix = identityMatrix;
exports.createMatrix = createMatrix;
exports.inverseMatrix = inverseMatrix;
exports.applyMatrixToPoint = applyMatrixToPoint;
exports.applyInverseMatrixToPoint = applyInverseMatrixToPoint;
exports.scaleMatrix = scaleMatrix;
exports.translateMatrix = translateMatrix;
exports.multiplyMatrices = multiplyMatrices;
exports.composeMatrices = composeMatrices;

function identityMatrix() {
  return {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  };
}

function createMatrix(_ref) {
  var _ref$scaleX = _ref.scaleX,
      scaleX = _ref$scaleX === void 0 ? 1 : _ref$scaleX,
      _ref$scaleY = _ref.scaleY,
      scaleY = _ref$scaleY === void 0 ? 1 : _ref$scaleY,
      _ref$translateX = _ref.translateX,
      translateX = _ref$translateX === void 0 ? 0 : _ref$translateX,
      _ref$translateY = _ref.translateY,
      translateY = _ref$translateY === void 0 ? 0 : _ref$translateY,
      _ref$skewX = _ref.skewX,
      skewX = _ref$skewX === void 0 ? 0 : _ref$skewX,
      _ref$skewY = _ref.skewY,
      skewY = _ref$skewY === void 0 ? 0 : _ref$skewY;
  return {
    scaleX: scaleX,
    scaleY: scaleY,
    translateX: translateX,
    translateY: translateY,
    skewX: skewX,
    skewY: skewY
  };
}

function inverseMatrix(_ref2) {
  var scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      translateX = _ref2.translateX,
      translateY = _ref2.translateY,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY;
  var denominator = scaleX * scaleY - skewY * skewX;
  return {
    scaleX: scaleY / denominator,
    scaleY: scaleX / denominator,
    translateX: (scaleY * translateX - skewX * translateY) / -denominator,
    translateY: (skewY * translateX - scaleX * translateY) / denominator,
    skewX: skewX / -denominator,
    skewY: skewY / -denominator
  };
}

function applyMatrixToPoint(matrix, _ref3) {
  var x = _ref3.x,
      y = _ref3.y;
  return {
    x: matrix.scaleX * x + matrix.skewX * y + matrix.translateX,
    y: matrix.skewY * x + matrix.scaleY * y + matrix.translateY
  };
}

function applyInverseMatrixToPoint(matrix, _ref4) {
  var x = _ref4.x,
      y = _ref4.y;
  return applyMatrixToPoint(inverseMatrix(matrix), {
    x: x,
    y: y
  });
}

function scaleMatrix(scaleX, maybeScaleY) {
  if (maybeScaleY === void 0) {
    maybeScaleY = undefined;
  }

  var scaleY = maybeScaleY || scaleX;
  return createMatrix({
    scaleX: scaleX,
    scaleY: scaleY
  });
}

function translateMatrix(translateX, translateY) {
  return createMatrix({
    translateX: translateX,
    translateY: translateY
  });
}

function multiplyMatrices(matrix1, matrix2) {
  return {
    scaleX: matrix1.scaleX * matrix2.scaleX + matrix1.skewX * matrix2.skewY,
    scaleY: matrix1.skewY * matrix2.skewX + matrix1.scaleY * matrix2.scaleY,
    translateX: matrix1.scaleX * matrix2.translateX + matrix1.skewX * matrix2.translateY + matrix1.translateX,
    translateY: matrix1.skewY * matrix2.translateX + matrix1.scaleY * matrix2.translateY + matrix1.translateY,
    skewX: matrix1.scaleX * matrix2.skewX + matrix1.skewX * matrix2.scaleY,
    skewY: matrix1.skewY * matrix2.scaleX + matrix1.scaleY * matrix2.skewY
  };
}

function composeMatrices() {
  for (var _len = arguments.length, matrices = new Array(_len), _key = 0; _key < _len; _key++) {
    matrices[_key] = arguments[_key];
  }

  switch (matrices.length) {
    case 0:
      throw new Error('composeMatrices() requires arguments: was called with no args');

    case 1:
      return matrices[0];

    case 2:
      return multiplyMatrices(matrices[0], matrices[1]);

    default:
      {
        var matrix1 = matrices[0],
            matrix2 = matrices[1],
            restMatrices = matrices.slice(2);
        var matrix = multiplyMatrices(matrix1, matrix2);
        return composeMatrices.apply(void 0, [matrix].concat(restMatrices));
      }
  }
}