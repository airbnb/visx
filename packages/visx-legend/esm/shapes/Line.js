import _pt from "prop-types";
import React from 'react';
import { Group } from '@visx/group';
export default function ShapeLine(_ref) {
  var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  var cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 0 : height;
  var lineThickness = typeof (style == null ? void 0 : style.strokeWidth) === 'number' ? style == null ? void 0 : style.strokeWidth : 2;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height
  }, /*#__PURE__*/React.createElement(Group, {
    top: cleanHeight / 2 - lineThickness / 2
  }, /*#__PURE__*/React.createElement("line", {
    x1: 0,
    x2: width,
    y1: 0,
    y2: 0,
    stroke: fill,
    strokeWidth: lineThickness,
    style: style
  })));
}
ShapeLine.propTypes = {
  fill: _pt.string,
  width: _pt.oneOfType([_pt.string, _pt.number]),
  height: _pt.oneOfType([_pt.string, _pt.number])
};