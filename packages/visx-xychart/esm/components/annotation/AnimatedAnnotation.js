import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import { Annotation as VisxAnnotation, EditableAnnotation as VisxEditableAnnotation } from '@visx/annotation';
import BaseAnnotation from './private/BaseAnnotation';
export default function AnimatedAnnotation(_ref) {
  var editable = _ref.editable,
      props = _objectWithoutPropertiesLoose(_ref, ["editable"]);

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

function BaseAnimatedAnnotation(_ref2) {
  var _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? 0 : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? 0 : _ref2$y,
      AnnotationComponent = _ref2.AnnotationComponent,
      props = _objectWithoutPropertiesLoose(_ref2, ["x", "y", "AnnotationComponent"]);

  var lastXY = useRef({
    x: x,
    y: y
  }); // in order to keep x/y/dx/dy accurate in AnnotationComponent, animate the delta
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
    transform: interpolate( // @ts-expect-error from/to mess up the useSpring types
    [animatedXY.x, animatedXY.y], function (xVal, yVal) {
      return "translate(" + xVal + ", " + yVal + ")";
    })
  }, /*#__PURE__*/React.createElement(AnnotationComponent, _extends({
    x: x,
    y: y
  }, props)));
}