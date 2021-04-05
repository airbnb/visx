"use strict";

exports.__esModule = true;
exports.default = createTimeScale;
exports.updateTimeScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateTimeScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round');
exports.updateTimeScale = updateTimeScale;

function createTimeScale(config) {
  return updateTimeScale((0, _d3Scale.scaleTime)(), config);
}