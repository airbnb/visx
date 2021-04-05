import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import Pattern from './Pattern';
import { PatternOrientation } from '../constants';
export function pathForOrientation(_ref) {
  var height = _ref.height,
      orientation = _ref.orientation;

  switch (orientation) {
    case PatternOrientation.horizontal:
      return "M 0," + height / 2 + " l " + height + ",0";

    case PatternOrientation.diagonal:
      return "M 0," + height + " l " + height + "," + -height + " M " + -height / 4 + "," + height / 4 + " l " + height / 2 + "," + -height / 2 + "\n             M " + 3 / 4 * height + "," + 5 / 4 * height + " l " + height / 2 + "," + -height / 2;

    case PatternOrientation.diagonalRightToLeft:
      return "M 0,0 l " + height + "," + height + "\n        M " + -height / 4 + "," + 3 / 4 * height + " l " + height / 2 + "," + height / 2 + "\n        M " + 3 / 4 * height + "," + -height / 4 + " l " + height / 2 + "," + height / 2;

    case PatternOrientation.vertical:
    default:
      return "M " + height / 2 + ", 0 l 0, " + height;
  }
}
export default function Lines(_ref2) {
  var id = _ref2.id,
      width = _ref2.width,
      height = _ref2.height,
      stroke = _ref2.stroke,
      strokeWidth = _ref2.strokeWidth,
      strokeDasharray = _ref2.strokeDasharray,
      _ref2$strokeLinecap = _ref2.strokeLinecap,
      strokeLinecap = _ref2$strokeLinecap === void 0 ? 'square' : _ref2$strokeLinecap,
      _ref2$shapeRendering = _ref2.shapeRendering,
      shapeRendering = _ref2$shapeRendering === void 0 ? 'auto' : _ref2$shapeRendering,
      _ref2$orientation = _ref2.orientation,
      orientation = _ref2$orientation === void 0 ? ['vertical'] : _ref2$orientation,
      background = _ref2.background,
      className = _ref2.className;
  var orientations = Array.isArray(orientation) ? orientation : [orientation];
  return /*#__PURE__*/React.createElement(Pattern, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/React.createElement("rect", {
    className: cx('visx-pattern-line-background'),
    width: width,
    height: height,
    fill: background
  }), orientations.map(function (o, i) {
    return /*#__PURE__*/React.createElement("path", {
      key: "visx-" + id + "-line-" + o + "-" + i,
      className: cx('visx-pattern-line', className),
      d: pathForOrientation({
        orientation: o,
        height: height
      }),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      strokeLinecap: strokeLinecap,
      shapeRendering: shapeRendering
    });
  }));
}
Lines.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number]),
  orientation: _pt.array
};