import _pt from "prop-types";
import React from 'react';
export default function Pattern(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: id,
    width: width,
    height: height,
    patternUnits: "userSpaceOnUse"
  }, children));
}
Pattern.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  children: _pt.node.isRequired
};