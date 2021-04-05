import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import Path from './Path';
export default function Hexagons(_ref) {
  var id = _ref.id,
      height = _ref.height,
      fill = _ref.fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      shapeRendering = _ref.shapeRendering,
      background = _ref.background,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 3 : _ref$size;
  var sqrtSize = Math.sqrt(size);
  return /*#__PURE__*/React.createElement(Path, {
    className: cx('visx-pattern-hexagon', className),
    path: "M " + height + ",0 l " + height + ",0 l " + height / 2 + "," + height * sqrtSize / 2 + " l " + -height / 2 + "," + height * sqrtSize / 2 + " l " + -height + ",0 l " + -height / 2 + "," + -height * sqrtSize / 2 + " Z M 0," + height * sqrtSize / 2 + " l " + height / 2 + ",0 M " + 3 * height + "," + height * sqrtSize / 2 + " l " + -height / 2 + ",0",
    id: id,
    width: size,
    height: sqrtSize,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering,
    background: background
  });
}
Hexagons.propTypes = {
  id: _pt.string.isRequired,
  height: _pt.number.isRequired,
  size: _pt.number,
  fill: _pt.string,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number])
};