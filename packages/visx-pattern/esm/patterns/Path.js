import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import Pattern from './Pattern';
export default function Path(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      path = _ref.path,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeLinecap = _ref.strokeLinecap,
      strokeLinecap = _ref$strokeLinecap === void 0 ? 'square' : _ref$strokeLinecap,
      _ref$shapeRendering = _ref.shapeRendering,
      shapeRendering = _ref$shapeRendering === void 0 ? 'auto' : _ref$shapeRendering,
      background = _ref.background,
      className = _ref.className;
  return /*#__PURE__*/React.createElement(Pattern, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/React.createElement("rect", {
    width: width,
    height: height,
    fill: background
  }), /*#__PURE__*/React.createElement("path", {
    className: cx('visx-pattern-path', className),
    d: path,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering
  }));
}
Path.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  path: _pt.string,
  fill: _pt.string,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number])
};