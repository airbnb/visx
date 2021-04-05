"use strict";

exports.__esModule = true;
exports.default = Drag;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _useDrag = _interopRequireDefault(require("./useDrag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/jsx-handler-names */
function Drag(_ref) {
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
  var drag = (0, _useDrag.default)({
    resetOnStart: resetOnStart,
    onDragEnd: onDragEnd,
    onDragMove: onDragMove,
    onDragStart: onDragStart,
    x: x,
    y: y,
    dx: dx,
    dy: dy
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, drag.isDragging && captureDragArea && /*#__PURE__*/_react.default.createElement("rect", {
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
  children: _propTypes.default.func.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  captureDragArea: _propTypes.default.bool
};