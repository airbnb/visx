"use strict";

exports.__esModule = true;
exports.default = AnimatedAxis;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _AnimatedAxis = _interopRequireDefault(require("@visx/react-spring/lib/axis/AnimatedAxis"));

var _BaseAxis = _interopRequireDefault(require("./BaseAxis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AnimatedAxis(props) {
  return /*#__PURE__*/_react.default.createElement(_BaseAxis.default, _extends({
    AxisComponent: _AnimatedAxis.default
  }, props));
}