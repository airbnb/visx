"use strict";

exports.__esModule = true;
exports.default = BarStack;

var _react = _interopRequireDefault(require("react"));

var _BaseBarStack = _interopRequireDefault(require("./private/BaseBarStack"));

var _Bars = _interopRequireDefault(require("./private/Bars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function BarStack(props) {
  return /*#__PURE__*/_react.default.createElement(_BaseBarStack.default, _extends({}, props, {
    BarsComponent: _Bars.default
  }));
}