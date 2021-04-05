"use strict";

exports.__esModule = true;
exports.default = createRadialScale;
exports.updateRadialScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateRadialScale = (0, _scaleOperator.default)('domain', 'range', 'clamp', 'nice', 'round', 'unknown');
exports.updateRadialScale = updateRadialScale;

function createRadialScale(config) {
  return updateRadialScale((0, _d3Scale.scaleRadial)(), config);
}