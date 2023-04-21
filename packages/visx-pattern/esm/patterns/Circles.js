import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import Pattern from './Pattern';
export default function Circles(_ref) {
  var _corners;
  var id = _ref.id,
    width = _ref.width,
    height = _ref.height,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? 2 : _ref$radius,
    fill = _ref.fill,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    background = _ref.background,
    _ref$complement = _ref.complement,
    complement = _ref$complement === void 0 ? false : _ref$complement,
    className = _ref.className;
  var corners;
  if (complement) {
    corners = [[0, 0], [0, height], [width, 0], [width, height]];
  }
  return /*#__PURE__*/React.createElement(Pattern, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/React.createElement("rect", {
    width: width,
    height: height,
    fill: background
  }), /*#__PURE__*/React.createElement("circle", {
    className: cx('visx-pattern-circle', className),
    cx: width / 2,
    cy: height / 2,
    r: radius,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray
  }), (_corners = corners) == null ? void 0 : _corners.map(function (_ref2) {
    var cornerX = _ref2[0],
      cornerY = _ref2[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: id + "-complement-" + cornerX + "-" + cornerY,
      className: cx('visx-pattern-circle visx-pattern-circle-complement', className),
      cx: cornerX,
      cy: cornerY,
      r: radius,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray
    });
  }));
}
Circles.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  radius: _pt.number,
  fill: _pt.string,
  className: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.number, _pt.string]),
  complement: _pt.bool,
  background: _pt.string
};