"use strict";

exports.__esModule = true;
exports.default = createPowScale;
exports.updatePowScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updatePowScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'clamp', 'exponent', 'interpolate', 'nice', 'round', 'zero');
exports.updatePowScale = updatePowScale;

function createPowScale(config) {
  return updatePowScale((0, _d3Scale.scalePow)(), config);
}