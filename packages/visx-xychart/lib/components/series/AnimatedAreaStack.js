"use strict";

exports.__esModule = true;
exports.default = AnimatedAreaStack;

var _react = _interopRequireDefault(require("react"));

var _BaseAreaStack = _interopRequireDefault(require("./private/BaseAreaStack"));

var _AnimatedPath = _interopRequireDefault(require("./private/AnimatedPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AnimatedAreaStack(props) {
  return /*#__PURE__*/_react.default.createElement(_BaseAreaStack.default, _extends({}, props, {
    PathComponent: _AnimatedPath.default
  }));
}