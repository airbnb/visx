import _pt from "prop-types";
var _excluded = ["top", "left", "xScale", "yScale", "width", "height", "className", "stroke", "strokeWidth", "strokeDasharray", "numTicksRows", "numTicksColumns", "rowLineStyle", "columnLineStyle", "xOffset", "yOffset", "rowTickValues", "columnTickValues"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import GridRows from './GridRows';
import GridColumns from './GridColumns';
export default function Grid(_ref) {
  var top = _ref.top,
    left = _ref.left,
    xScale = _ref.xScale,
    yScale = _ref.yScale,
    width = _ref.width,
    height = _ref.height,
    className = _ref.className,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    numTicksRows = _ref.numTicksRows,
    numTicksColumns = _ref.numTicksColumns,
    rowLineStyle = _ref.rowLineStyle,
    columnLineStyle = _ref.columnLineStyle,
    xOffset = _ref.xOffset,
    yOffset = _ref.yOffset,
    rowTickValues = _ref.rowTickValues,
    columnTickValues = _ref.columnTickValues,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-grid', className),
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(GridRows, _extends({
    className: className,
    scale: yScale,
    width: width,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    numTicks: numTicksRows,
    lineStyle: rowLineStyle,
    offset: yOffset,
    tickValues: rowTickValues
  }, restProps)), /*#__PURE__*/React.createElement(GridColumns, _extends({
    className: className,
    scale: xScale,
    height: height,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    numTicks: numTicksColumns,
    lineStyle: columnLineStyle,
    offset: xOffset,
    tickValues: columnTickValues
  }, restProps)));
}
Grid.propTypes = {
  rowTickValues: _pt.array,
  columnTickValues: _pt.array
};