import _pt from "prop-types";
import React, { useMemo } from 'react';
import AnnotationContext from '../context/AnnotationContext';
export default function Annotation(_ref) {
  var x = _ref.x,
    y = _ref.y,
    dx = _ref.dx,
    dy = _ref.dy,
    children = _ref.children;
  var value = useMemo(function () {
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }, [x, y, dx, dy]);
  return /*#__PURE__*/React.createElement(AnnotationContext.Provider, {
    value: value
  }, children);
}
Annotation.propTypes = {
  children: _pt.node.isRequired
};