"use strict";

exports.__esModule = true;
exports.default = createSqrtScale;
exports.updateSqrtScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateSqrtScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round', 'zero');
exports.updateSqrtScale = updateSqrtScale;

function createSqrtScale(config) {
  return updateSqrtScale((0, _d3Scale.scaleSqrt)(), config);
}