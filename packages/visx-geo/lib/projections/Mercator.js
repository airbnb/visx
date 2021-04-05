"use strict";

exports.__esModule = true;
exports.default = Mercator;

var _react = _interopRequireDefault(require("react"));

var _Projection = _interopRequireDefault(require("./Projection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * All props pass through to `<Projection projection="mercator" {...props} />`
 */
function Mercator(props) {
  return /*#__PURE__*/_react.default.createElement(_Projection.default, _extends({
    projection: "mercator"
  }, props));
}