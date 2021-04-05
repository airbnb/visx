import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint react/jsx-handler-names: 0 */
import React from "react";
import Drag from "@visx/drag/lib/Drag";
var DRAGGING_OVERLAY_STYLES = {
  cursor: "move"
};

var BrushSelection = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BrushSelection, _React$Component);

  function BrushSelection() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "selectionDragMove", function (drag) {
      var updateBrush = _this.props.updateBrush;
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
    });

    _defineProperty(_assertThisInitialized(_this), "selectionDragEnd", function () {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          onBrushEnd = _this$props.onBrushEnd;
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
    });

    return _this;
  }

  var _proto = BrushSelection.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        width = _this$props2.width,
        height = _this$props2.height,
        stageWidth = _this$props2.stageWidth,
        stageHeight = _this$props2.stageHeight,
        brush = _this$props2.brush,
        disableDraggingSelection = _this$props2.disableDraggingSelection,
        _onMouseLeave = _this$props2.onMouseLeave,
        _onMouseMove = _this$props2.onMouseMove,
        _onMouseUp = _this$props2.onMouseUp,
        _onClick = _this$props2.onClick,
        selectedBoxStyle = _this$props2.selectedBoxStyle;
    return /*#__PURE__*/React.createElement(Drag, {
      width: width,
      height: height,
      resetOnStart: true,
      onDragMove: this.selectionDragMove,
      onDragEnd: this.selectionDragEnd
    }, function (_ref) {
      var isDragging = _ref.isDragging,
          dragStart = _ref.dragStart,
          dragEnd = _ref.dragEnd,
          dragMove = _ref.dragMove;
      return /*#__PURE__*/React.createElement("g", null, isDragging && /*#__PURE__*/React.createElement("rect", {
        width: stageWidth,
        height: stageHeight,
        fill: "transparent",
        onMouseUp: dragEnd,
        onMouseMove: dragMove,
        onMouseLeave: dragEnd,
        onTouchMove: dragMove,
        onTouchEnd: dragEnd,
        style: DRAGGING_OVERLAY_STYLES
      }), /*#__PURE__*/React.createElement("rect", _extends({
        x: Math.min(brush.extent.x0, brush.extent.x1),
        y: Math.min(brush.extent.y0, brush.extent.y1),
        width: width,
        height: height,
        className: "visx-brush-selection",
        onMouseDown: disableDraggingSelection ? undefined : dragStart,
        onMouseLeave: function onMouseLeave(event) {
          if (_onMouseLeave) _onMouseLeave(event);
        },
        onMouseMove: function onMouseMove(event) {
          dragMove(event);
          if (_onMouseMove) _onMouseMove(event);
        },
        onMouseUp: function onMouseUp(event) {
          dragEnd(event);
          if (_onMouseUp) _onMouseUp(event);
        },
        onClick: function onClick(event) {
          if (_onClick) _onClick(event);
        },
        onTouchStart: disableDraggingSelection ? undefined : dragStart,
        onTouchMove: function onTouchMove(event) {
          dragMove(event);
          if (_onMouseMove) _onMouseMove(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          dragEnd(event);
          if (_onMouseUp) _onMouseUp(event);
        },
        style: {
          pointerEvents: brush.isBrushing || brush.activeHandle ? "none" : "all",
          cursor: disableDraggingSelection ? undefined : "move"
        }
      }, selectedBoxStyle)));
    });
  };

  return BrushSelection;
}(React.Component);

_defineProperty(BrushSelection, "propTypes", {
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  stageWidth: _pt.number.isRequired,
  stageHeight: _pt.number.isRequired,
  updateBrush: _pt.func.isRequired,
  onBrushEnd: _pt.func,
  disableDraggingSelection: _pt.bool.isRequired,
  onMouseLeave: _pt.func,
  onMouseMove: _pt.func,
  onMouseUp: _pt.func,
  onClick: _pt.func
});

_defineProperty(BrushSelection, "defaultProps", {
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null
});

export { BrushSelection as default };