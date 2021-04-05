import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import Drag from "@visx/drag/lib/Drag";
import BrushHandle from "./BrushHandle";
import BrushCorner from "./BrushCorner";
import BrushSelection from "./BrushSelection";
var BRUSH_OVERLAY_STYLES = {
  cursor: "crosshair"
};

var BaseBrush = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BaseBrush, _React$Component);

  function BaseBrush(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "mouseUpTime", 0);

    _defineProperty(_assertThisInitialized(_this), "mouseDownTime", 0);

    _defineProperty(_assertThisInitialized(_this), "getExtent", function (start, end) {
      var _this$props = _this.props,
          brushDirection = _this$props.brushDirection,
          width = _this$props.width,
          height = _this$props.height;
      var x0 = brushDirection === "vertical" ? 0 : Math.min(start.x || 0, end.x || 0);
      var x1 = brushDirection === "vertical" ? width : Math.max(start.x || 0, end.x || 0);
      var y0 = brushDirection === "horizontal" ? 0 : Math.min(start.y || 0, end.y || 0);
      var y1 = brushDirection === "horizontal" ? height : Math.max(start.y || 0, end.y || 0);
      return {
        x0: x0,
        x1: x1,
        y0: y0,
        y1: y1
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragStart", function (draw) {
      var _this$props2 = _this.props,
          onBrushStart = _this$props2.onBrushStart,
          left = _this$props2.left,
          top = _this$props2.top,
          inheritedMargin = _this$props2.inheritedMargin;
      var marginLeft = inheritedMargin && inheritedMargin.left ? inheritedMargin.left : 0;
      var marginTop = inheritedMargin && inheritedMargin.top ? inheritedMargin.top : 0;
      var start = {
        x: (draw.x || 0) + draw.dx - left - marginLeft,
        y: (draw.y || 0) + draw.dy - top - marginTop
      };

      var end = _extends({}, start);

      if (onBrushStart) {
        onBrushStart(start);
      }

      _this.updateBrush(function (prevBrush) {
        return _extends({}, prevBrush, {
          start: start,
          end: end,
          extent: {
            x0: -1,
            x1: -1,
            y0: -1,
            y1: -1
          },
          isBrushing: true
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragMove", function (drag) {
      var _this$props3 = _this.props,
          left = _this$props3.left,
          top = _this$props3.top,
          inheritedMargin = _this$props3.inheritedMargin;
      if (!drag.isDragging) return;
      var marginLeft = inheritedMargin && inheritedMargin.left || 0;
      var marginTop = inheritedMargin && inheritedMargin.top || 0;
      var end = {
        x: (drag.x || 0) + drag.dx - left - marginLeft,
        y: (drag.y || 0) + drag.dy - top - marginTop
      };

      _this.updateBrush(function (prevBrush) {
        var start = prevBrush.start;

        var extent = _this.getExtent(start, end);

        return _extends({}, prevBrush, {
          end: end,
          extent: extent
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragEnd", function () {
      var _this$props4 = _this.props,
          onBrushEnd = _this$props4.onBrushEnd,
          resetOnEnd = _this$props4.resetOnEnd;

      _this.updateBrush(function (prevBrush) {
        var extent = prevBrush.extent;

        var newState = _extends({}, prevBrush, {
          start: {
            x: extent.x0,
            y: extent.y0
          },
          end: {
            x: extent.x1,
            y: extent.y1
          },
          isBrushing: false,
          activeHandle: null
        });

        if (onBrushEnd) {
          onBrushEnd(newState);
        }

        if (resetOnEnd) {
          _this.reset();
        }

        return newState;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getBrushWidth", function () {
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1;
      return Math.max(Math.max(x0, x1) - Math.min(x0, x1), 0);
    });

    _defineProperty(_assertThisInitialized(_this), "getBrushHeight", function () {
      var extent = _this.state.extent;
      var y1 = extent.y1,
          y0 = extent.y0;
      return Math.max(Math.max(y0, y1) - Math.min(y0, y1), 0);
    });

    _defineProperty(_assertThisInitialized(_this), "handles", function () {
      var handleSize = _this.props.handleSize;
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1,
          y0 = extent.y0,
          y1 = extent.y1;
      var offset = handleSize / 2;

      var width = _this.getBrushWidth();

      var height = _this.getBrushHeight();

      return {
        top: {
          x: x0 - offset,
          y: y0 - offset,
          height: handleSize,
          width: width + handleSize
        },
        bottom: {
          x: x0 - offset,
          y: y1 - offset,
          height: handleSize,
          width: width + handleSize
        },
        right: {
          x: x1 - offset,
          y: y0 - offset,
          height: height + handleSize,
          width: handleSize
        },
        left: {
          x: x0 - offset,
          y: y0 - offset,
          height: height + handleSize,
          width: handleSize
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "corners", function () {
      var handleSize = _this.props.handleSize;
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1,
          y0 = extent.y0,
          y1 = extent.y1;
      var offset = handleSize / 2;
      var width = handleSize;
      var height = handleSize;
      return {
        topLeft: {
          x: Math.min(x0, x1) - offset,
          y: Math.min(y0, y1) - offset,
          width: width,
          height: height
        },
        topRight: {
          x: Math.max(x0, x1) - offset,
          y: Math.min(y0, y1) - offset,
          width: width,
          height: height
        },
        bottomLeft: {
          x: Math.min(x0, x1) - offset,
          y: Math.max(y0, y1) - offset,
          width: width,
          height: height
        },
        bottomRight: {
          x: Math.max(x0, x1) - offset,
          y: Math.max(y0, y1) - offset,
          width: width,
          height: height
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "updateBrush", function (updater) {
      var onChange = _this.props.onChange;

      _this.setState(updater, function () {
        if (onChange) {
          onChange(_this.state);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      var _this$props5 = _this.props,
          width = _this$props5.width,
          height = _this$props5.height;

      _this.updateBrush(function () {
        return {
          start: {
            x: 0,
            y: 0
          },
          end: {
            x: 0,
            y: 0
          },
          extent: {
            x0: -1,
            x1: -1,
            y0: -1,
            y1: -1
          },
          bounds: {
            x0: 0,
            x1: width,
            y0: 0,
            y1: height
          },
          isBrushing: false,
          activeHandle: null
        };
      });
    });

    var initialBrushPosition = props.initialBrushPosition;

    var _extent = initialBrushPosition ? _this.getExtent(initialBrushPosition.start, initialBrushPosition.end) : {
      x0: -1,
      x1: -1,
      y0: -1,
      y1: -1
    };

    _this.state = {
      start: {
        x: Math.max(0, _extent.x0),
        y: Math.max(0, _extent.y0)
      },
      end: {
        x: Math.max(0, _extent.x1),
        y: Math.max(0, _extent.y1)
      },
      extent: _extent,
      bounds: {
        x0: 0,
        x1: _this.props.width,
        y0: 0,
        y1: _this.props.height
      },
      isBrushing: false,
      activeHandle: null
    };
    return _this;
  }

  var _proto = BaseBrush.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(function () {
        return {
          bounds: {
            x0: 0,
            x1: _this2.props.width,
            y0: 0,
            y1: _this2.props.height
          }
        };
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        start = _this$state.start,
        end = _this$state.end;
    var _this$props6 = this.props,
        top = _this$props6.top,
        left = _this$props6.left,
        stageWidth = _this$props6.width,
        stageHeight = _this$props6.height,
        _onMouseLeave = _this$props6.onMouseLeave,
        _onMouseUp = _this$props6.onMouseUp,
        _onMouseMove = _this$props6.onMouseMove,
        onBrushEnd = _this$props6.onBrushEnd,
        _onClick = _this$props6.onClick,
        resizeTriggerAreas = _this$props6.resizeTriggerAreas,
        selectedBoxStyle = _this$props6.selectedBoxStyle,
        disableDraggingSelection = _this$props6.disableDraggingSelection,
        clickSensitivity = _this$props6.clickSensitivity;
    var handles = this.handles();
    var corners = this.corners();
    var width = this.getBrushWidth();
    var height = this.getBrushHeight();
    var resizeTriggerAreaSet = new Set(resizeTriggerAreas);
    return /*#__PURE__*/React.createElement(Group, {
      className: "visx-brush",
      top: top,
      left: left
    }, /*#__PURE__*/React.createElement(Drag, {
      width: stageWidth,
      height: stageHeight,
      resetOnStart: true,
      onDragStart: this.handleDragStart,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd
    }, function (_ref) {
      var dragStart = _ref.dragStart,
          isDragging = _ref.isDragging,
          dragMove = _ref.dragMove,
          dragEnd = _ref.dragEnd;
      return /*#__PURE__*/React.createElement(Bar, {
        className: "visx-brush-overlay",
        fill: "transparent",
        x: 0,
        y: 0,
        width: stageWidth,
        height: stageHeight,
        onDoubleClick: function onDoubleClick() {
          return _this3.reset();
        },
        onClick: function onClick(event) {
          var duration = _this3.mouseUpTime - _this3.mouseDownTime;
          if (_onClick && duration < clickSensitivity) _onClick(event);
        },
        onMouseDown: function onMouseDown(event) {
          _this3.mouseDownTime = Date.now();
          dragStart(event);
        },
        onMouseLeave: function onMouseLeave(event) {
          if (_onMouseLeave) _onMouseLeave(event);
        },
        onMouseMove: function onMouseMove(event) {
          if (!isDragging && _onMouseMove) _onMouseMove(event);
          if (isDragging) dragMove(event);
        },
        onMouseUp: function onMouseUp(event) {
          _this3.mouseUpTime = Date.now();
          if (_onMouseUp) _onMouseUp(event);
          dragEnd(event);
        },
        onTouchStart: function onTouchStart(event) {
          _this3.mouseDownTime = Date.now();
          dragStart(event);
        },
        onTouchMove: function onTouchMove(event) {
          if (!isDragging && _onMouseMove) _onMouseMove(event);
          if (isDragging) dragMove(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          _this3.mouseUpTime = Date.now();
          if (_onMouseUp) _onMouseUp(event);
          dragEnd(event);
        },
        style: BRUSH_OVERLAY_STYLES
      });
    }), start && end && /*#__PURE__*/React.createElement(BrushSelection, {
      updateBrush: this.updateBrush,
      width: width,
      height: height,
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      brush: _extends({}, this.state),
      disableDraggingSelection: disableDraggingSelection,
      onBrushEnd: onBrushEnd,
      onMouseLeave: _onMouseLeave,
      onMouseMove: _onMouseMove,
      onMouseUp: _onMouseUp,
      onClick: _onClick,
      selectedBoxStyle: selectedBoxStyle
    }), start && end && Object.keys(handles).filter(function (handleKey) {
      return resizeTriggerAreaSet.has(handleKey);
    }).map(function (handleKey) {
      var handle = handles[handleKey];
      return handle && /*#__PURE__*/React.createElement(BrushHandle, {
        key: "handle-" + handleKey,
        type: handleKey,
        handle: handle,
        stageWidth: stageWidth,
        stageHeight: stageHeight,
        updateBrush: _this3.updateBrush,
        brush: _this3.state,
        onBrushEnd: onBrushEnd
      });
    }), start && end && Object.keys(corners).filter(function (cornerKey) {
      return resizeTriggerAreaSet.has(cornerKey);
    }).map(function (cornerKey) {
      var corner = corners[cornerKey];
      return corner && /*#__PURE__*/React.createElement(BrushCorner, {
        key: "corner-" + cornerKey,
        type: cornerKey,
        brush: _this3.state,
        updateBrush: _this3.updateBrush,
        stageWidth: stageWidth,
        stageHeight: stageHeight,
        corner: corner,
        onBrushEnd: onBrushEnd
      });
    }));
  };

  return BaseBrush;
}(React.Component);

_defineProperty(BaseBrush, "propTypes", {
  brushDirection: _pt.oneOf(["horizontal", "vertical", "both"]),
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  left: _pt.number.isRequired,
  top: _pt.number.isRequired,
  onChange: _pt.func,
  handleSize: _pt.number,
  resizeTriggerAreas: _pt.array,
  onBrushStart: _pt.func,
  onBrushEnd: _pt.func,
  onMouseLeave: _pt.func,
  onMouseUp: _pt.func,
  onMouseMove: _pt.func,
  onClick: _pt.func,
  clickSensitivity: _pt.number,
  disableDraggingSelection: _pt.bool,
  resetOnEnd: _pt.bool
});

_defineProperty(BaseBrush, "defaultProps", {
  brushDirection: "both",
  inheritedMargin: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  onChange: null,
  handleSize: 4,
  resizeTriggerAreas: ["left", "right"],
  onBrushStart: null,
  onBrushEnd: null,
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null,
  disableDraggingSelection: false,
  clickSensitivity: 200,
  resetOnEnd: false,
  initialBrushPosition: null
});

export { BaseBrush as default };