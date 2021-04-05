import _pt from "prop-types";
import React from 'react';
var DEFAULT_LINK = {
  source: {
    x: 0,
    y: 0
  },
  target: {
    x: 0,
    y: 0
  }
};
export default function HierarchyDefaultLink(_ref) {
  var _ref$link = _ref.link,
      link = _ref$link === void 0 ? DEFAULT_LINK : _ref$link;
  return /*#__PURE__*/React.createElement("line", {
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    strokeWidth: 2,
    stroke: "#999",
    strokeOpacity: 0.6
  });
}
HierarchyDefaultLink.propTypes = {
  link: _pt.shape({
    source: _pt.shape({
      x: _pt.number.isRequired,
      y: _pt.number.isRequired
    }).isRequired,
    target: _pt.shape({
      x: _pt.number.isRequired,
      y: _pt.number.isRequired
    }).isRequired
  })
};