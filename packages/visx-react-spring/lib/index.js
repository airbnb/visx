"use strict";

exports.__esModule = true;
var _exportNames = {
  AnimatedTicks: true,
  AnimatedAxis: true,
  AnimatedGridRows: true,
  AnimatedGridColumns: true
};
exports.AnimatedTicks = exports.AnimatedGridRows = exports.AnimatedGridColumns = exports.AnimatedAxis = void 0;
var _AnimatedTicks = _interopRequireDefault(require("./axis/AnimatedTicks"));
exports.AnimatedTicks = _AnimatedTicks.default;
var _AnimatedAxis = _interopRequireDefault(require("./axis/AnimatedAxis"));
exports.AnimatedAxis = _AnimatedAxis.default;
var _AnimatedGridRows = _interopRequireDefault(require("./grid/AnimatedGridRows"));
exports.AnimatedGridRows = _AnimatedGridRows.default;
var _AnimatedGridColumns = _interopRequireDefault(require("./grid/AnimatedGridColumns"));
exports.AnimatedGridColumns = _AnimatedGridColumns.default;
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }