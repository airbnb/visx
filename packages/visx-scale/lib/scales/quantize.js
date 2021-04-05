"use strict";

exports.__esModule = true;
exports.default = createQuantizeScale;
exports.updateQuantizeScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateQuantizeScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'nice', 'zero');
exports.updateQuantizeScale = updateQuantizeScale;

function createQuantizeScale(config) {
  return updateQuantizeScale((0, _d3Scale.scaleQuantize)(), config);
}