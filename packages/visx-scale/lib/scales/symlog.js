"use strict";

exports.__esModule = true;
exports.default = createSymlogScale;
exports.updateSymlogScale = void 0;
var _d3Scale = require("d3-scale");
var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var updateSymlogScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'clamp', 'constant', 'nice', 'zero', 'round');
exports.updateSymlogScale = updateSymlogScale;
function createSymlogScale(config) {
  return updateSymlogScale((0, _d3Scale.scaleSymlog)(), config);
}