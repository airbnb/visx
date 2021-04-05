"use strict";

exports.__esModule = true;
exports.default = createThresholdScale;
exports.updateThresholdScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateThresholdScale = (0, _scaleOperator.default)('domain', 'range', 'reverse');
exports.updateThresholdScale = updateThresholdScale;

function createThresholdScale(config) {
  return updateThresholdScale((0, _d3Scale.scaleThreshold)(), config);
}