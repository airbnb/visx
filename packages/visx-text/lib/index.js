"use strict";

exports.__esModule = true;
var _exportNames = {
  Text: true,
  getStringWidth: true,
  useText: true
};
exports.useText = exports.getStringWidth = exports.Text = void 0;
var _Text = _interopRequireDefault(require("./Text"));
exports.Text = _Text.default;
var _getStringWidth = _interopRequireDefault(require("./util/getStringWidth"));
exports.getStringWidth = _getStringWidth.default;
var _useText = _interopRequireDefault(require("./hooks/useText"));
exports.useText = _useText.default;
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }