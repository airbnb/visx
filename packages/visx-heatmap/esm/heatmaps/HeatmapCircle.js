import _pt from "prop-types";
var _excluded = ["className", "top", "left", "data", "gap", "radius", "xScale", "yScale", "colorScale", "opacityScale", "bins", "count", "children"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
export default function HeatmapCircle(_ref) {
  var className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 1 : _ref$gap,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? 6 : _ref$radius,
    xScale = _ref.xScale,
    yScale = _ref.yScale,
    _ref$colorScale = _ref.colorScale,
    colorScale = _ref$colorScale === void 0 ? function () {
      return undefined;
    } : _ref$colorScale,
    _ref$opacityScale = _ref.opacityScale,
    opacityScale = _ref$opacityScale === void 0 ? function () {
      return 1;
    } : _ref$opacityScale,
    _ref$bins = _ref.bins,
    bins = _ref$bins === void 0 ? function (column) {
      return column == null ? void 0 : column.bins;
    } : _ref$bins,
    _ref$count = _ref.count,
    count = _ref$count === void 0 ? function (cell) {
      return cell == null ? void 0 : cell.count;
    } : _ref$count,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var innerRadius = radius - gap;
  var heatmap = data.map(function (columnDatum, column) {
    var x = xScale(column);
    return bins(columnDatum).map(function (bin, row) {
      var countValue = count(bin);
      return {
        bin: bin,
        row: row,
        column: column,
        datum: columnDatum,
        radius: radius,
        gap: gap,
        count: countValue,
        cx: radius + x,
        cy: yScale(row) + gap + radius,
        r: innerRadius,
        opacity: opacityScale(countValue),
        color: colorScale(countValue)
      };
    });
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(heatmap));
  return /*#__PURE__*/React.createElement(Group, {
    className: "visx-heatmap-circles",
    top: top,
    left: left
  }, heatmap.map(function (columns) {
    return columns.map(function (bin) {
      return /*#__PURE__*/React.createElement("circle", _extends({
        key: "heatmap-tile-circle-" + bin.row + "-" + bin.column,
        className: cx('visx-heatmap-circle', className),
        r: bin.r,
        cx: bin.cx,
        cy: bin.cy,
        fill: bin.color,
        fillOpacity: bin.opacity
      }, restProps));
    });
  }));
}
HeatmapCircle.propTypes = {
  data: _pt.array,
  left: _pt.number,
  top: _pt.number,
  gap: _pt.number,
  radius: _pt.number,
  xScale: _pt.func.isRequired,
  yScale: _pt.func.isRequired,
  bins: _pt.func,
  count: _pt.func,
  className: _pt.string,
  children: _pt.func
};