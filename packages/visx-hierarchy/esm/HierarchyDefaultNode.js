import _pt from "prop-types";
import React from 'react';
export default function HierarchyDefaultNode(_ref) {
  var _ref$node = _ref.node,
      node = _ref$node === void 0 ? {
    x: 0,
    y: 0,
    r: 15
  } : _ref$node;
  return /*#__PURE__*/React.createElement("circle", {
    cx: node.x,
    cy: node.y,
    r: node.r || 15,
    fill: "#21D4FD"
  });
}
HierarchyDefaultNode.propTypes = {
  node: _pt.shape({
    x: _pt.number.isRequired,
    y: _pt.number.isRequired,
    r: _pt.number
  })
};