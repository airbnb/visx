import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/* eslint react/jsx-handler-names: 0 */
import React from 'react';
import Drag from '@visx/drag/lib/Drag';
import { getPageCoordinates } from './utils';
var DRAGGING_OVERLAY_STYLES = {
  cursor: 'move'
};
var BrushSelection = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BrushSelection, _React$Component);
  function BrushSelection() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.selectionDragStart = function (drag) {
      var _this$props = _this.props,
        onMoveSelectionChange = _this$props.onMoveSelectionChange,
        onBrushStart = _this$props.onBrushStart;
      if (onMoveSelectionChange) {
        onMoveSelectionChange('move', getPageCoordinates(drag.event));
      }
      if (onBrushStart) {
        onBrushStart(drag);
      }
    };
    _this.selectionDragMove = function (drag) {
      var _this$props2 = _this.props,
        updateBrush = _this$props2.updateBrush,
        isControlled = _this$props2.isControlled;
      if (isControlled) return;
      updateBrush(function (prevBrush) {
        var _prevBrush$start = prevBrush.start,
          x0 = _prevBrush$start.x,
          y0 = _prevBrush$start.y;
        var _prevBrush$end = prevBrush.end,
          x1 = _prevBrush$end.x,
          y1 = _prevBrush$end.y;
        var validDx = drag.dx > 0 ? Math.min(drag.dx, prevBrush.bounds.x1 - x1) : Math.max(drag.dx, prevBrush.bounds.x0 - x0);
        var validDy = drag.dy > 0 ? Math.min(drag.dy, prevBrush.bounds.y1 - y1) : Math.max(drag.dy, prevBrush.bounds.y0 - y0);
        return _extends({}, prevBrush, {
          isBrushing: true,
          extent: _extends({}, prevBrush.extent, {
            x0: x0 + validDx,
            x1: x1 + validDx,
            y0: y0 + validDy,
            y1: y1 + validDy
          })
        });
      });
    };
    _this.selectionDragEnd = function () {
      var _this$props3 = _this.props,
        updateBrush = _this$props3.updateBrush,
        onBrushEnd = _this$props3.onBrushEnd,
        onMoveSelectionChange = _this$props3.onMoveSelectionChange,
        isControlled = _this$props3.isControlled;
      if (!isControlled) {
        updateBrush(function (prevBrush) {
          var nextBrush = _extends({}, prevBrush, {
            isBrushing: false,
            start: _extends({}, prevBrush.start, {
              x: Math.min(prevBrush.extent.x0, prevBrush.extent.x1),
              y: Math.min(prevBrush.extent.y0, prevBrush.extent.y1)
            }),
            end: _extends({}, prevBrush.end, {
              x: Math.max(prevBrush.extent.x0, prevBrush.extent.x1),
              y: Math.max(prevBrush.extent.y0, prevBrush.extent.y1)
            })
          });
          if (onBrushEnd) {
            onBrushEnd(nextBrush);
          }
          return nextBrush;
        });
      }
      if (onMoveSelectionChange) {
        onMoveSelectionChange();
      }
    };
    return _this;
  }
  var _proto = BrushSelection.prototype;
  _proto.render = function render() {
    var _this$props4 = this.props,
      width = _this$props4.width,
      height = _this$props4.height,
      stageWidth = _this$props4.stageWidth,
      stageHeight = _this$props4.stageHeight,
      brush = _this$props4.brush,
      disableDraggingSelection = _this$props4.disableDraggingSelection,
      onMouseLeave = _this$props4.onMouseLeave,
      onMouseMove = _this$props4.onMouseMove,
      onMouseUp = _this$props4.onMouseUp,
      _onClick = _this$props4.onClick,
      selectedBoxStyle = _this$props4.selectedBoxStyle,
      isControlled = _this$props4.isControlled,
      isDragInProgress = _this$props4.isDragInProgress;
    return /*#__PURE__*/React.createElement(Drag, {
      width: width,
      height: height,
      resetOnStart: true,
      onDragStart: this.selectionDragStart,
      onDragMove: this.selectionDragMove,
      onDragEnd: this.selectionDragEnd,
      isDragging: isControlled ? isDragInProgress : undefined
    }, function (_ref) {
      var isDragging = _ref.isDragging,
        dragStart = _ref.dragStart,
        dragEnd = _ref.dragEnd,
        dragMove = _ref.dragMove;
      return /*#__PURE__*/React.createElement("g", null, isDragging && /*#__PURE__*/React.createElement("rect", {
        width: stageWidth,
        height: stageHeight,
        fill: "transparent",
        onPointerUp: isControlled ? undefined : dragEnd,
        onPointerMove: dragMove,
        onPointerLeave: isControlled ? undefined : dragEnd,
        style: DRAGGING_OVERLAY_STYLES
      }), /*#__PURE__*/React.createElement("rect", _extends({
        x: Math.min(brush.extent.x0, brush.extent.x1),
        y: Math.min(brush.extent.y0, brush.extent.y1),
        width: width,
        height: height,
        className: "visx-brush-selection",
        onPointerDown: disableDraggingSelection ? undefined : dragStart,
        onPointerLeave: function onPointerLeave(event) {
          if (onMouseLeave) onMouseLeave(event);
        },
        onPointerMove: function onPointerMove(event) {
          dragMove(event);
          if (onMouseMove) onMouseMove(event);
        },
        onPointerUp: function onPointerUp(event) {
          if (!isControlled) {
            dragEnd(event);
          }
          if (onMouseUp) onMouseUp(event);
        },
        onClick: function onClick(event) {
          if (_onClick) _onClick(event);
        },
        style: {
          pointerEvents: brush.isBrushing || brush.activeHandle ? 'none' : 'all',
          cursor: disableDraggingSelection ? undefined : 'move'
        }
      }, selectedBoxStyle)));
    });
  };
  return BrushSelection;
}(React.Component);
BrushSelection.propTypes = {
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  stageWidth: _pt.number.isRequired,
  stageHeight: _pt.number.isRequired,
  updateBrush: _pt.func.isRequired,
  onMoveSelectionChange: _pt.func,
  onBrushStart: _pt.func,
  onBrushEnd: _pt.func,
  disableDraggingSelection: _pt.bool.isRequired,
  onMouseLeave: _pt.func,
  onMouseMove: _pt.func,
  onMouseUp: _pt.func,
  onClick: _pt.func,
  isControlled: _pt.bool,
  isDragInProgress: _pt.bool
};
BrushSelection.defaultProps = {
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null
};
export { BrushSelection as default };