import _pt from "prop-types";
var _excluded = ["className", "x", "y", "orientation", "min", "max", "stroke"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import cx from 'classnames';
import AnnotationContext from '../context/AnnotationContext';
export default function LineSubject(_ref) {
  var className = _ref.className,
    propsX = _ref.x,
    propsY = _ref.y,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? 'vertical' : _ref$orientation,
    min = _ref.min,
    max = _ref.max,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#222' : _ref$stroke,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  // if props are provided, they take precedence over context
  var annotationContext = useContext(AnnotationContext);
  var lineIsVertical = orientation === 'vertical';
  return /*#__PURE__*/React.createElement("line", _extends({
    className: cx('visx-annotation-subject', 'visx-annotation-subject-line', className),
    x1: lineIsVertical ? propsX || annotationContext.x : min,
    x2: lineIsVertical ? propsX || annotationContext.x : max,
    y1: lineIsVertical ? min : propsY || annotationContext.y,
    y2: lineIsVertical ? max : propsY || annotationContext.y,
    fill: "transparent",
    pointerEvents: "none",
    stroke: stroke
  }, restProps));
}
LineSubject.propTypes = {
  className: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.number,
  orientation: _pt.oneOf(['vertical', 'horizontal']),
  x: _pt.number,
  y: _pt.number,
  min: _pt.number.isRequired,
  max: _pt.number.isRequired
};