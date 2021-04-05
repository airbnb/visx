"use strict";

exports.__esModule = true;
exports.default = createPointScale;
exports.updatePointScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updatePointScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'align', 'padding', 'round');
exports.updatePointScale = updatePointScale;

function createPointScale(config) {
  return updatePointScale((0, _d3Scale.scalePoint)(), config);
}