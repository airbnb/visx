import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Line from '@visx/shape/lib/shapes/Line';
import { Group } from '@visx/group';
import { Point } from '@visx/point';
import { getTicks, coerceNumber } from '@visx/scale';
export default function GridColumns(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      scale = _ref.scale,
      height = _ref.height,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#eaf0f6' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      className = _ref.className,
      _ref$numTicks = _ref.numTicks,
      numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
      lineStyle = _ref.lineStyle,
      offset = _ref.offset,
      tickValues = _ref.tickValues,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["top", "left", "scale", "height", "stroke", "strokeWidth", "strokeDasharray", "className", "numTicks", "lineStyle", "offset", "tickValues", "children"]);

  var ticks = tickValues != null ? tickValues : getTicks(scale, numTicks);
  var tickLines = ticks.map(function (d) {
    var x = offset ? (coerceNumber(scale(d)) || 0) + offset : coerceNumber(scale(d)) || 0;
    return {
      from: new Point({
        x: x,
        y: 0
      }),
      to: new Point({
        x: x,
        y: height
      })
    };
  });
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-columns', className),
    top: top,
    left: left
  }, children ? children({
    lines: tickLines
  }) : tickLines.map(function (_ref2, i) {
    var from = _ref2.from,
        to = _ref2.to;
    return /*#__PURE__*/React.createElement(Line, _extends({
      key: "column-line-" + i,
      from: from,
      to: to,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      style: lineStyle
    }, restProps));
  }));
}
GridColumns.propTypes = {
  tickValues: _pt.array,
  height: _pt.number.isRequired
};