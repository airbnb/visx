import _pt from "prop-types";
import React from 'react';
import AnnotationContext from '../context/AnnotationContext';
export default function Annotation(_ref) {
  var x = _ref.x,
      y = _ref.y,
      dx = _ref.dx,
      dy = _ref.dy,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(AnnotationContext.Provider, {
    value: {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    }
  }, children);
}
Annotation.propTypes = {
  children: _pt.node.isRequired
};