"use strict";

exports.__esModule = true;
exports.default = Bars;
var _shape = require("@visx/shape");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["bars", "horizontal", "xScale", "yScale", "radius", "radiusAll", "radiusTop", "radiusRight", "radiusBottom", "radiusLeft", "BarComponent"],
  _excluded2 = ["key"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Bars(_ref) {
  var bars = _ref.bars,
    horizontal = _ref.horizontal,
    xScale = _ref.xScale,
    yScale = _ref.yScale,
    radius = _ref.radius,
    radiusAll = _ref.radiusAll,
    radiusTop = _ref.radiusTop,
    radiusRight = _ref.radiusRight,
    radiusBottom = _ref.radiusBottom,
    radiusLeft = _ref.radiusLeft,
    BarComponent = _ref.BarComponent,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var isFocusable = Boolean(restProps.onFocus || restProps.onBlur);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, bars.map(function (_ref2) {
    var key = _ref2.key,
      barProps = _objectWithoutPropertiesLoose(_ref2, _excluded2);
    return BarComponent ? /*#__PURE__*/_react.default.createElement(BarComponent, _extends({
      key: key,
      className: "visx-bar",
      tabIndex: isFocusable ? 0 : undefined
    }, barProps, restProps)) : radius == null ? /*#__PURE__*/_react.default.createElement(_shape.Bar, _extends({
      key: key,
      tabIndex: isFocusable ? 0 : undefined
    }, barProps, restProps)) : /*#__PURE__*/_react.default.createElement(_shape.BarRounded, _extends({
      key: key,
      className: "visx-bar",
      tabIndex: isFocusable ? 0 : undefined,
      radius: radius,
      all: radiusAll,
      top: radiusTop,
      right: radiusRight,
      bottom: radiusBottom,
      left: radiusLeft
    }, barProps, restProps));
  }));
}