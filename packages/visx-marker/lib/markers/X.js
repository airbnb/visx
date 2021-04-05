"use strict";

exports.__esModule = true;
exports.default = MarkerX;

var _react = _interopRequireDefault(require("react"));

var _Cross = _interopRequireDefault(require("./Cross"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function MarkerX(props) {
  return /*#__PURE__*/_react.default.createElement(_Cross.default, _extends({
    orient: 45
  }, props));
}