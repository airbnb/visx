import React from 'react';
export default function defaultRenderGlyph(_ref) {
  var key = _ref.key,
      color = _ref.color,
      x = _ref.x,
      y = _ref.y,
      size = _ref.size,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      onPointerMove = _ref.onPointerMove,
      onPointerOut = _ref.onPointerOut,
      onPointerUp = _ref.onPointerUp;
  return /*#__PURE__*/React.createElement("circle", {
    className: "visx-circle-glyph",
    key: key,
    tabIndex: onBlur || onFocus ? 0 : undefined,
    fill: color,
    r: size / 2,
    cx: x,
    cy: y,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp
  });
}