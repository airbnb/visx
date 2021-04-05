"use strict";

exports.__esModule = true;
exports.default = createOrdinalScale;
exports.updateOrdinalScale = void 0;

var _d3Scale = require("d3-scale");

var _scaleOperator = _interopRequireDefault(require("../operators/scaleOperator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateOrdinalScale = (0, _scaleOperator.default)('domain', 'range', 'reverse', 'unknown');
exports.updateOrdinalScale = updateOrdinalScale;

function createOrdinalScale(config) {
  return updateOrdinalScale((0, _d3Scale.scaleOrdinal)(), config);
}