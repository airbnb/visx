"use strict";

exports.__esModule = true;
exports.default = AnimatedLineSeries;

var _react = _interopRequireDefault(require("react"));

var _BaseLineSeries = _interopRequireDefault(require("./private/BaseLineSeries"));

var _AnimatedPath = _interopRequireDefault(require("./private/AnimatedPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AnimatedLineSeries(props) {
  return /*#__PURE__*/_react.default.createElement(_BaseLineSeries.default, _extends({}, props, {
    PathComponent: _AnimatedPath.default
  }));
}