"use strict";

exports.__esModule = true;
exports.default = AreaStack;

var _react = _interopRequireDefault(require("react"));

var _BaseAreaStack = _interopRequireDefault(require("./private/BaseAreaStack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AreaStack(props) {
  return /*#__PURE__*/_react.default.createElement(_BaseAreaStack.default, props);
}