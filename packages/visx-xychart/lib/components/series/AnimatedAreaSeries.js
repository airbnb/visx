"use strict";

exports.__esModule = true;
exports.default = AnimatedAreaSeries;

var _react = _interopRequireDefault(require("react"));

var _AnimatedPath = _interopRequireDefault(require("./private/AnimatedPath"));

var _BaseAreaSeries = _interopRequireDefault(require("./private/BaseAreaSeries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AnimatedAreaSeries(props) {
  // @TODO currently generics for non-SeriesProps are not passed correctly in withRegisteredData HOC
  // @ts-expect-error
  return /*#__PURE__*/_react.default.createElement(_BaseAreaSeries.default, _extends({}, props, {
    PathComponent: _AnimatedPath.default
  }));
}