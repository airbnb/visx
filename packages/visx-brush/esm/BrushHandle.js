import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/* eslint react/jsx-handler-names: 0 */
import React from 'react';
import Drag from '@visx/drag/lib/Drag';
import { getPageCoordinates } from './utils';
/** BrushHandle's are placed along the bounds of the brush and handle Drag events which update the passed brush. */
var BrushHandle = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BrushHandle, _React$Component);
  function BrushHandle() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.handleDragStart = function (drag) {
      var _this$props = _this.props,
        onBrushHandleChange = _this$props.onBrushHandleChange,
        type = _this$props.type,
        onBrushStart = _this$props.onBrushStart;
      if (onBrushHandleChange) {
        onBrushHandleChange(type, getPageCoordinates(drag.event));
      }
      if (onBrushStart) {
        onBrushStart(drag);
      }
    };
    _this.handleDragMove = function (drag) {
      var _this$props2 = _this.props,
        updateBrush = _this$props2.updateBrush,
        type = _this$props2.type,
        isControlled = _this$props2.isControlled;
      if (!drag.isDragging || isControlled) return;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
          end = prevBrush.end;
        var move = 0;
        var xMax = Math.max(start.x, end.x);
        var xMin = Math.min(start.x, end.x);
        var yMax = Math.max(start.y, end.y);
        var yMin = Math.min(start.y, end.y);
        switch (type) {
          case 'right':
            move = xMax + drag.dx;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.max(Math.min(move, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(move, start.x), prevBrush.bounds.x1)
              })
            });
          case 'left':
            move = xMin + drag.dx;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.min(move, end.x),
                x1: Math.max(move, end.x)
              })
            });
          case 'bottom':
            move = yMax + drag.dy;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                y0: Math.min(move, start.y),
                y1: Math.max(move, start.y)
              })
            });
          case 'top':
            move = yMin + drag.dy;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                y0: Math.min(move, end.y),
                y1: Math.max(move, end.y)
              })
            });
          default:
            return prevBrush;
        }
      });
    };
    _this.handleDragEnd = function () {
      var _this$props3 = _this.props,
        updateBrush = _this$props3.updateBrush,
        onBrushEnd = _this$props3.onBrushEnd,
        onBrushHandleChange = _this$props3.onBrushHandleChange,
        isControlled = _this$props3.isControlled;
      if (!isControlled) {
        updateBrush(function (prevBrush) {
          var start = prevBrush.start,
            end = prevBrush.end,
            extent = prevBrush.extent;
          start.x = Math.min(extent.x0, extent.x1);
          start.y = Math.min(extent.y0, extent.y0);
          end.x = Math.max(extent.x0, extent.x1);
          end.y = Math.max(extent.y0, extent.y1);
          var nextBrush = _extends({}, prevBrush, {
            start: start,
            end: end,
            activeHandle: null,
            isBrushing: false,
            extent: {
              x0: Math.min(start.x, end.x),
              x1: Math.max(start.x, end.x),
              y0: Math.min(start.y, end.y),
              y1: Math.max(start.y, end.y)
            }
          });
          if (onBrushEnd) {
            onBrushEnd(nextBrush);
          }
          return nextBrush;
        });
      }
      if (onBrushHandleChange) {
        onBrushHandleChange();
      }
    };
    return _this;
  }
  var _proto = BrushHandle.prototype;
  _proto.render = function render() {
    var _this2 = this;
    var _this$props4 = this.props,
      stageWidth = _this$props4.stageWidth,
      stageHeight = _this$props4.stageHeight,
      brush = _this$props4.brush,
      type = _this$props4.type,
      handle = _this$props4.handle,
      isControlled = _this$props4.isControlled,
      isDragInProgress = _this$props4.isDragInProgress,
      renderBrushHandle = _this$props4.renderBrushHandle;
    var x = handle.x,
      y = handle.y,
      width = handle.width,
      height = handle.height;
    var cursor = type === 'right' || type === 'left' ? 'ew-resize' : 'ns-resize';
    return /*#__PURE__*/React.createElement(Drag, {
      width: stageWidth,
      height: stageHeight,
      onDragStart: this.handleDragStart,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd,
      resetOnStart: true,
      isDragging: isControlled ? isDragInProgress : undefined
    }, function (_ref) {
      var dragStart = _ref.dragStart,
        dragEnd = _ref.dragEnd,
        dragMove = _ref.dragMove,
        isDragging = _ref.isDragging;
      return /*#__PURE__*/React.createElement("g", null, isDragging && /*#__PURE__*/React.createElement("rect", {
        fill: "transparent",
        width: stageWidth,
        height: stageHeight,
        style: {
          cursor: cursor
        },
        onPointerMove: dragMove,
        onPointerUp: isControlled ? undefined : dragEnd,
        onPointerLeave: isControlled ? undefined : dragEnd
      }), !renderBrushHandle && /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: y,
        width: width,
        height: height,
        fill: "transparent",
        className: "visx-brush-handle-" + type,
        onPointerDown: dragStart,
        onPointerMove: dragMove,
        onPointerUp: isControlled ? undefined : dragEnd,
        style: {
          cursor: cursor,
          pointerEvents: !!brush.activeHandle || !!brush.isBrushing ? 'none' : 'all'
        }
      }), renderBrushHandle && /*#__PURE__*/React.createElement("g", {
        onPointerDown: dragStart,
        onPointerMove: dragMove,
        onPointerUp: isControlled ? undefined : dragEnd
      }, renderBrushHandle(_extends({}, _this2.props.handle, {
        height: stageHeight,
        className: "visx-brush-handle-" + type,
        isBrushActive: brush.extent.x0 !== -1 && brush.extent.x1 !== -1
      }))));
    });
  };
  return BrushHandle;
}(React.Component);
BrushHandle.propTypes = {
  stageWidth: _pt.number.isRequired,
  stageHeight: _pt.number.isRequired,
  updateBrush: _pt.func.isRequired,
  onBrushStart: _pt.func,
  onBrushEnd: _pt.func,
  handle: _pt.shape({
    x: _pt.number.isRequired,
    y: _pt.number.isRequired,
    width: _pt.number.isRequired,
    height: _pt.number.isRequired
  }).isRequired,
  isControlled: _pt.bool,
  isDragInProgress: _pt.bool,
  onBrushHandleChange: _pt.func,
  renderBrushHandle: _pt.func
};
export { BrushHandle as default };