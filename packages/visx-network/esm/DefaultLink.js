import React from 'react';
export default function DefaultLink(_ref) {
  var link = _ref.link;
  return link && link.source && link.target ? /*#__PURE__*/React.createElement("line", {
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    strokeWidth: 2,
    stroke: "#999",
    strokeOpacity: 0.6
  }) : null;
}