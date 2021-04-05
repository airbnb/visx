import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import GridAngle from './GridAngle';
import GridRadial from './GridRadial';
export default function GridPolar(_ref) {
  var arcThickness = _ref.arcThickness,
      className = _ref.className,
      classNameAngle = _ref.classNameAngle,
      classNameRadial = _ref.classNameRadial,
      endAngle = _ref.endAngle,
      fillRadial = _ref.fillRadial,
      innerRadius = _ref.innerRadius,
      left = _ref.left,
      lineClassNameAngle = _ref.lineClassNameAngle,
      lineClassNameRadial = _ref.lineClassNameRadial,
      lineStyleAngle = _ref.lineStyleAngle,
      lineStyleRadial = _ref.lineStyleRadial,
      numTicksAngle = _ref.numTicksAngle,
      numTicksRadial = _ref.numTicksRadial,
      outerRadius = _ref.outerRadius,
      scaleAngle = _ref.scaleAngle,
      scaleRadial = _ref.scaleRadial,
      startAngle = _ref.startAngle,
      strokeAngle = _ref.strokeAngle,
      strokeRadial = _ref.strokeRadial,
      strokeWidthAngle = _ref.strokeWidthAngle,
      strokeWidthRadial = _ref.strokeWidthRadial,
      strokeDasharrayAngle = _ref.strokeDasharrayAngle,
      strokeDasharrayRadial = _ref.strokeDasharrayRadial,
      tickValuesAngle = _ref.tickValuesAngle,
      tickValuesRadial = _ref.tickValuesRadial,
      top = _ref.top;
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-grid-polar', className),
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(GridAngle, {
    className: classNameAngle,
    innerRadius: innerRadius,
    lineClassName: lineClassNameAngle,
    lineStyle: lineStyleAngle,
    numTicks: numTicksAngle,
    outerRadius: outerRadius,
    scale: scaleAngle,
    stroke: strokeAngle,
    strokeWidth: strokeWidthAngle,
    strokeDasharray: strokeDasharrayAngle,
    tickValues: tickValuesAngle
  }), /*#__PURE__*/React.createElement(GridRadial, {
    arcThickness: arcThickness,
    className: classNameRadial,
    endAngle: endAngle,
    fill: fillRadial,
    lineClassName: lineClassNameRadial,
    lineStyle: lineStyleRadial,
    numTicks: numTicksRadial,
    scale: scaleRadial,
    startAngle: startAngle,
    stroke: strokeRadial,
    strokeWidth: strokeWidthRadial,
    strokeDasharray: strokeDasharrayRadial,
    tickValues: tickValuesRadial
  }));
}
GridPolar.propTypes = {
  arcThickness: _pt.number,
  classNameAngle: _pt.string,
  classNameRadial: _pt.string,
  endAngle: _pt.number,
  fillRadial: _pt.string,
  innerRadius: _pt.number,
  lineClassNameAngle: _pt.string,
  lineClassNameRadial: _pt.string,
  numTicksAngle: _pt.number,
  numTicksRadial: _pt.number,
  outerRadius: _pt.number.isRequired,
  startAngle: _pt.number,
  strokeAngle: _pt.string,
  strokeRadial: _pt.string,
  strokeDasharrayAngle: _pt.string,
  strokeDasharrayRadial: _pt.string,
  strokeWidthAngle: _pt.oneOfType([_pt.string, _pt.number]),
  strokeWidthRadial: _pt.oneOfType([_pt.string, _pt.number]),
  tickValuesAngle: _pt.array,
  tickValuesRadial: _pt.array,
  top: _pt.number
};