"use strict";

exports.__esModule = true;
exports.default = createUtcScale;
exports.updateUtcScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateUtcScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round');
exports.updateUtcScale = updateUtcScale;

function createUtcScale(config) {
  return updateUtcScale((0, _d3Scale.scaleUtc)(), config);
}