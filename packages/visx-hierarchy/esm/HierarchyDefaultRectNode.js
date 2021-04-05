import _pt from "prop-types";
import React from 'react';
export default function HierarchyDefaultRectNode(_ref) {
  var _ref$node = _ref.node,
      x0 = _ref$node.x0,
      x1 = _ref$node.x1,
      y0 = _ref$node.y0,
      y1 = _ref$node.y1;
  return /*#__PURE__*/React.createElement("rect", {
    x: x0,
    y: y0,
    width: Math.abs(x1 - x0),
    height: Math.abs(y1 - y0),
    fill: "#21D4FD"
  });
}
HierarchyDefaultRectNode.propTypes = {
  node: _pt.shape({
    x0: _pt.number.isRequired,
    x1: _pt.number.isRequired,
    y0: _pt.number.isRequired,
    y1: _pt.number.isRequired
  }).isRequired
};