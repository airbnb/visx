"use strict";

exports.__esModule = true;
exports.default = createBandScale;
exports.updateBandScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateBandScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'align', 'padding', 'round');
exports.updateBandScale = updateBandScale;

function createBandScale(config) {
  return updateBandScale((0, _d3Scale.scaleBand)(), config);
}