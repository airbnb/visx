"use strict";

exports.__esModule = true;
exports.default = LineSeries;

var _react = _interopRequireDefault(require("react"));

var _BaseLineSeries = _interopRequireDefault(require("./private/BaseLineSeries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LineSeries(props) {
  return /*#__PURE__*/_react.default.createElement(_BaseLineSeries.default, props);
}