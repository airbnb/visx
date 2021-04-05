import _pt from "prop-types";

/* eslint-disable react/jsx-handler-names */
import React from "react";
import useDrag from "./useDrag";
export default function Drag(_ref) {
  var _ref$captureDragArea = _ref.captureDragArea,
      captureDragArea = _ref$captureDragArea === void 0 ? true : _ref$captureDragArea,
      children = _ref.children,
      dx = _ref.dx,
      dy = _ref.dy,
      height = _ref.height,
      onDragEnd = _ref.onDragEnd,
      onDragMove = _ref.onDragMove,
      onDragStart = _ref.onDragStart,
      resetOnStart = _ref.resetOnStart,
      width = _ref.width,
      x = _ref.x,
      y = _ref.y;
  var drag = useDrag({
    resetOnStart: resetOnStart,
    onDragEnd: onDragEnd,
    onDragMove: onDragMove,
    onDragStart: onDragStart,
    x: x,
    y: y,
    dx: dx,
    dy: dy
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, drag.isDragging && captureDragArea && /*#__PURE__*/React.createElement("rect", {
    width: width,
    height: height,
    onMouseMove: drag.dragMove,
    onMouseUp: drag.dragEnd,
    onTouchMove: drag.dragMove,
    onTouchEnd: drag.dragEnd,
    fill: "transparent"
  }), children(drag));
}
Drag.propTypes = {
  children: _pt.func.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  captureDragArea: _pt.bool
};