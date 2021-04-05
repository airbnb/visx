import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
export default function LinePathAnnotation(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      _ref$points = _ref.points,
      points = _ref$points === void 0 ? [] : _ref$points,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? 'black' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      className = _ref.className,
      label = _ref.label,
      _ref$labelAnchor = _ref.labelAnchor,
      labelAnchor = _ref$labelAnchor === void 0 ? 'middle' : _ref$labelAnchor,
      _ref$labelDx = _ref.labelDx,
      labelDx = _ref$labelDx === void 0 ? 0 : _ref$labelDx,
      _ref$labelDy = _ref.labelDy,
      labelDy = _ref$labelDy === void 0 ? 0 : _ref$labelDy,
      labelFill = _ref.labelFill,
      _ref$labelFontSize = _ref.labelFontSize,
      labelFontSize = _ref$labelFontSize === void 0 ? 10 : _ref$labelFontSize,
      _ref$labelStroke = _ref.labelStroke,
      labelStroke = _ref$labelStroke === void 0 ? 'white' : _ref$labelStroke,
      _ref$labelStrokeWidth = _ref.labelStrokeWidth,
      labelStrokeWidth = _ref$labelStrokeWidth === void 0 ? 3 : _ref$labelStrokeWidth,
      _ref$labelPaintOrder = _ref.labelPaintOrder,
      labelPaintOrder = _ref$labelPaintOrder === void 0 ? 'stroke' : _ref$labelPaintOrder;
  var endPoint = points[points.length - 1];
  return /*#__PURE__*/React.createElement(Group, {
    className: "visx-line-path-annotation-group",
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(LinePath, {
    className: cx('visx-line-path-annotation', className),
    data: points,
    x: function x(p) {
      return p.x;
    },
    y: function y(p) {
      return p.y;
    },
    stroke: stroke,
    strokeWidth: strokeWidth
  }), label && endPoint && /*#__PURE__*/React.createElement("text", {
    x: endPoint.x,
    y: endPoint.y,
    dx: labelDx,
    dy: labelDy,
    fontSize: labelFontSize,
    fill: labelFill || stroke,
    stroke: labelStroke,
    strokeWidth: labelStrokeWidth,
    textAnchor: labelAnchor,
    paintOrder: labelPaintOrder
  }, label));
}
LinePathAnnotation.propTypes = {
  top: _pt.number,
  left: _pt.number,
  points: _pt.array,
  stroke: _pt.string,
  strokeWidth: _pt.number,
  className: _pt.string,
  label: _pt.string,
  labelAnchor: _pt.oneOf(['start', 'middle', 'end']),
  labelDx: _pt.number,
  labelDy: _pt.number,
  labelFill: _pt.string,
  labelFontSize: _pt.number,
  labelStroke: _pt.string,
  labelStrokeWidth: _pt.number,
  labelPaintOrder: _pt.string
};