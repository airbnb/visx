import _pt from "prop-types";
var _excluded = ["className", "innerRadius", "left", "lineClassName", "lineStyle", "numTicks", "outerRadius", "scale", "stroke", "strokeDasharray", "strokeWidth", "tickValues", "top"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import Line from '@visx/shape/lib/shapes/Line';
import { Group } from '@visx/group';
import { getTicks, coerceNumber } from '@visx/scale';
import { Point } from '@visx/point';
import polarToCartesian from '../utils/polarToCartesian';
export default function GridAngle(_ref) {
  var className = _ref.className,
    _ref$innerRadius = _ref.innerRadius,
    innerRadius = _ref$innerRadius === void 0 ? 0 : _ref$innerRadius,
    _ref$left = _ref.left,
    left = _ref$left === void 0 ? 0 : _ref$left,
    lineClassName = _ref.lineClassName,
    lineStyle = _ref.lineStyle,
    _ref$numTicks = _ref.numTicks,
    numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
    _ref$outerRadius = _ref.outerRadius,
    outerRadius = _ref$outerRadius === void 0 ? 0 : _ref$outerRadius,
    scale = _ref.scale,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#eaf0f6' : _ref$stroke,
    strokeDasharray = _ref.strokeDasharray,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
    tickValues = _ref.tickValues,
    _ref$top = _ref.top,
    top = _ref$top === void 0 ? 0 : _ref$top,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var ticks = tickValues != null ? tickValues : getTicks(scale, numTicks);
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-grid-angle', className),
    top: top,
    left: left
  }, ticks.map(function (tick, i) {
    var _coerceNumber;
    var angle = ((_coerceNumber = coerceNumber(scale(tick))) != null ? _coerceNumber : Math.PI / 2) - Math.PI / 2;
    return /*#__PURE__*/React.createElement(Line, _extends({
      key: "polar-grid-" + tick + "-" + i,
      className: lineClassName,
      from: new Point(polarToCartesian({
        angle: angle,
        radius: innerRadius
      })),
      to: new Point(polarToCartesian({
        angle: angle,
        radius: outerRadius
      })),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      style: lineStyle
    }, restProps));
  }));
}
GridAngle.propTypes = {
  tickValues: _pt.array,
  innerRadius: _pt.number,
  outerRadius: _pt.number.isRequired,
  lineClassName: _pt.string
};