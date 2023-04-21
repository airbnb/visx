import _pt from "prop-types";
var _excluded = ["x", "y", "AnnotationComponent"],
  _excluded2 = ["editable"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { Annotation as VisxAnnotation, EditableAnnotation as VisxEditableAnnotation } from '@visx/annotation';
import BaseAnnotation from './private/BaseAnnotation';
function BaseAnimatedAnnotation(_ref) {
  var _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y,
    AnnotationComponent = _ref.AnnotationComponent,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var lastXY = useRef({
    x: x,
    y: y
  });

  // in order to keep x/y/dx/dy accurate in AnnotationComponent, animate the delta
  // between positions, to an x + y transform of zero from the previous value
  var animatedXY = useSpring({
    from: {
      x: lastXY.current.x - x,
      y: lastXY.current.y - y
    },
    to: {
      x: 0,
      y: 0
    },
    reset: true
  });
  useEffect(function () {
    lastXY.current = {
      x: x,
      y: y
    };
  }, [x, y]);
  return /*#__PURE__*/React.createElement(animated.g, {
    // for perf animate a group element not the Annotation itself
    transform: to([animatedXY.x, animatedXY.y], function (xVal, yVal) {
      return "translate(" + xVal + ", " + yVal + ")";
    })
  }, /*#__PURE__*/React.createElement(AnnotationComponent, _extends({
    x: x,
    y: y
  }, props)));
}
export default function AnimatedAnnotation(_ref2) {
  var editable = _ref2.editable,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var AnnotationComponent = useCallback(function (annotationProps) {
    return /*#__PURE__*/React.createElement(BaseAnimatedAnnotation, _extends({
      AnnotationComponent: editable ? VisxEditableAnnotation : VisxAnnotation
    }, annotationProps));
  }, [editable]);
  return /*#__PURE__*/React.createElement(BaseAnnotation, _extends({
    AnnotationComponent: AnnotationComponent
  }, props));
}
AnimatedAnnotation.propTypes = {
  editable: _pt.bool
};