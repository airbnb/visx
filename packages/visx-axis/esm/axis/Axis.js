import _pt from "prop-types";
var _excluded = ["children", "axisClassName", "hideAxisLine", "hideTicks", "hideZero", "left", "numTicks", "orientation", "rangePadding", "scale", "tickFormat", "tickLength", "tickValues", "top"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { getTicks, coerceNumber } from '@visx/scale';
import AxisRenderer from './AxisRenderer';
import getTickPosition from '../utils/getTickPosition';
import getTickFormatter from '../utils/getTickFormatter';
import createPoint from '../utils/createPoint';
import Orientation from '../constants/orientation';
import getAxisRangePaddingConfig from '../utils/getAxisRangePaddingConfig';
export default function Axis(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? AxisRenderer : _ref$children,
    axisClassName = _ref.axisClassName,
    _ref$hideAxisLine = _ref.hideAxisLine,
    hideAxisLine = _ref$hideAxisLine === void 0 ? false : _ref$hideAxisLine,
    _ref$hideTicks = _ref.hideTicks,
    hideTicks = _ref$hideTicks === void 0 ? false : _ref$hideTicks,
    _ref$hideZero = _ref.hideZero,
    hideZero = _ref$hideZero === void 0 ? false : _ref$hideZero,
    _ref$left = _ref.left,
    left = _ref$left === void 0 ? 0 : _ref$left,
    _ref$numTicks = _ref.numTicks,
    numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? Orientation.bottom : _ref$orientation,
    _ref$rangePadding = _ref.rangePadding,
    rangePadding = _ref$rangePadding === void 0 ? 0 : _ref$rangePadding,
    scale = _ref.scale,
    tickFormat = _ref.tickFormat,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
    tickValues = _ref.tickValues,
    _ref$top = _ref.top,
    top = _ref$top === void 0 ? 0 : _ref$top,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var format = tickFormat != null ? tickFormat : getTickFormatter(scale);
  var isLeft = orientation === Orientation.left;
  var isTop = orientation === Orientation.top;
  var horizontal = isTop || orientation === Orientation.bottom;
  var tickPosition = getTickPosition(scale);
  var tickSign = isLeft || isTop ? -1 : 1;
  var range = scale.range();
  var rangePaddingConfig = getAxisRangePaddingConfig(rangePadding);
  var axisFromPoint = createPoint({
    x: Number(range[0]) + 0.5 - rangePaddingConfig.start,
    y: 0
  }, horizontal);
  var axisToPoint = createPoint({
    x: Number(range[range.length - 1]) + 0.5 + rangePaddingConfig.end,
    y: 0
  }, horizontal);
  var filteredTickValues = (tickValues != null ? tickValues : getTicks(scale, numTicks)).filter(function (value) {
    return !hideZero || value !== 0 && value !== '0';
  }).map(function (value, index) {
    return {
      value: value,
      index: index
    };
  });
  var ticks = filteredTickValues.map(function (_ref2) {
    var value = _ref2.value,
      index = _ref2.index;
    var scaledValue = coerceNumber(tickPosition(value));
    return {
      value: value,
      index: index,
      from: createPoint({
        x: scaledValue,
        y: 0
      }, horizontal),
      to: createPoint({
        x: scaledValue,
        y: tickLength * tickSign
      }, horizontal),
      formattedValue: format(value, index, filteredTickValues)
    };
  });
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-axis', axisClassName),
    top: top,
    left: left
  }, children(_extends({}, restProps, {
    axisFromPoint: axisFromPoint,
    axisToPoint: axisToPoint,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    horizontal: horizontal,
    numTicks: numTicks,
    orientation: orientation,
    rangePadding: rangePadding,
    scale: scale,
    tickFormat: format,
    tickLength: tickLength,
    tickPosition: tickPosition,
    tickSign: tickSign,
    ticks: ticks
  })));
}