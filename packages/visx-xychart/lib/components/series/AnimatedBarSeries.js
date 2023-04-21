"use strict";

exports.__esModule = true;
exports.default = AnimatedBarSeries;
var _react = _interopRequireDefault(require("react"));
var _BaseBarSeries = _interopRequireDefault(require("./private/BaseBarSeries"));
var _AnimatedBars = _interopRequireDefault(require("./private/AnimatedBars"));
var _excluded = ["colorAccessor"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function AnimatedBarSeries(_ref) {
  var colorAccessor = _ref.colorAccessor,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_BaseBarSeries.default, _extends({}, props, {
    // @TODO currently generics for non-SeriesProps are not passed correctly in
    // withRegisteredData HOC
    colorAccessor: colorAccessor,
    BarsComponent: _AnimatedBars.default
  }));
}