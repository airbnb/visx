import _pt from "prop-types";
var _excluded = ["className", "x", "y", "stroke", "radius"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import cx from 'classnames';
import AnnotationContext from '../context/AnnotationContext';
export default function CircleSubject(_ref) {
  var className = _ref.className,
    propsX = _ref.x,
    propsY = _ref.y,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#222' : _ref$stroke,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? 16 : _ref$radius,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  // if props are provided, they take precedence over context
  var annotationContext = useContext(AnnotationContext);
  return /*#__PURE__*/React.createElement("circle", _extends({
    className: cx('visx-annotation-subject', 'visx-annotation-subject-circle', className),
    cx: propsX || annotationContext.x,
    cy: propsY || annotationContext.y,
    r: radius,
    fill: "transparent",
    pointerEvents: "none",
    stroke: stroke
  }, restProps));
}
CircleSubject.propTypes = {
  className: _pt.string,
  stroke: _pt.string,
  radius: _pt.number
};