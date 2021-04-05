"use strict";

exports.__esModule = true;
exports.default = createQuantileScale;
exports.updateQuantileScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateQuantileScale = (0, _scaleOperator.default)('domain', 'range', 'reverse');
exports.updateQuantileScale = updateQuantileScale;

function createQuantileScale(config) {
  return updateQuantileScale((0, _d3Scale.scaleQuantile)(), config);
}