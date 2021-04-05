import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import Path from './Path';
export default function Waves(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      fill = _ref.fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      shapeRendering = _ref.shapeRendering,
      background = _ref.background,
      className = _ref.className;
  return /*#__PURE__*/React.createElement(Path, {
    className: cx('visx-pattern-wave', className),
    path: "M 0 " + height / 2 + " c " + height / 8 + " " + -height / 4 + " , " + height * 3 / 8 + " " + -height / 4 + " , " + height / 2 + " 0\n             c " + height / 8 + " " + height / 4 + " , " + height * 3 / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + -height / 2 + " " + height / 2 + "\n             c " + height / 8 + " " + height / 4 + " , " + height * 3 / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + height + " " + height / 2 + "\n             c " + height / 8 + " " + -height / 4 + " , " + height * 3 / 8 + " " + -height / 4 + " , " + height / 2 + " 0",
    id: id,
    width: width,
    height: height,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering,
    background: background
  });
}
Waves.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  fill: _pt.string,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number])
};