var _excluded = ["bars", "horizontal", "xScale", "yScale", "radius", "radiusAll", "radiusTop", "radiusRight", "radiusBottom", "radiusLeft", "BarComponent"],
  _excluded2 = ["key"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { Bar, BarRounded } from '@visx/shape';
import React from 'react';
export default function Bars(_ref) {
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
  console.log('BarComponent', BarComponent);
  return /*#__PURE__*/React.createElement(React.Fragment, null, bars.map(function (_ref2) {
    var key = _ref2.key,
      barProps = _objectWithoutPropertiesLoose(_ref2, _excluded2);
    return BarComponent ? /*#__PURE__*/React.createElement(BarComponent, _extends({
      key: key,
      className: "visx-bar",
      tabIndex: isFocusable ? 0 : undefined
    }, barProps, restProps)) : radius == null ? /*#__PURE__*/React.createElement(Bar, _extends({
      key: key,
      tabIndex: isFocusable ? 0 : undefined
    }, barProps, restProps)) : /*#__PURE__*/React.createElement(BarRounded, _extends({
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