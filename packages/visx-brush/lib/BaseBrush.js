"use strict";

exports.__esModule = true;
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _group = require("@visx/group");
var _shape = require("@visx/shape");
var _Drag = _interopRequireDefault(require("@visx/drag/lib/Drag"));
var _BrushHandle = _interopRequireDefault(require("./BrushHandle"));
var _BrushCorner = _interopRequireDefault(require("./BrushCorner"));
var _BrushSelection = _interopRequireDefault(require("./BrushSelection"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var BRUSH_OVERLAY_STYLES = {
  cursor: 'crosshair'
};
var BaseBrush = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BaseBrush, _React$Component);
  function BaseBrush(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.mouseUpTime = 0;
    _this.mouseDownTime = 0;
    _this.handleWindowPointerUp = function () {
      var _this$props = _this.props,
        useWindowMoveEvents = _this$props.useWindowMoveEvents,
        onBrushEnd = _this$props.onBrushEnd,
        resetOnEnd = _this$props.resetOnEnd;
      var brushingType = _this.state.brushingType;
      if (useWindowMoveEvents && brushingType) {
        _this.updateBrush(function (prevBrush) {
          var start = prevBrush.start,
            end = prevBrush.end,
            extent = prevBrush.extent;
          start.x = Math.min(extent.x0, extent.x1);
          start.y = Math.min(extent.y0, extent.y0);
          end.x = Math.max(extent.x0, extent.x1);
          end.y = Math.max(extent.y0, extent.y1);
          var newState = _extends({}, prevBrush, {
            activeHandle: null,
            isBrushing: false,
            brushingType: undefined
          });
          if (onBrushEnd) {
            onBrushEnd(newState);
          }
          if (resetOnEnd) {
            _this.reset();
          }
          return newState;
        });
      }
    };
    _this.handleWindowPointerMove = function (event) {
      var useWindowMoveEvents = _this.props.useWindowMoveEvents;
      var _this$state = _this.state,
        brushingType = _this$state.brushingType,
        isBrushing = _this$state.isBrushing,
        brushPageOffset = _this$state.brushPageOffset,
        start = _this$state.start;
      if (!useWindowMoveEvents || !isBrushing) return;

      /* We use event page coordinates to calculate the offset between the initial pointer position and
         the current pointer position so Brush could be resized/moved relatively. */
      var offsetX = event.pageX - ((brushPageOffset == null ? void 0 : brushPageOffset.pageX) || 0);
      var offsetY = event.pageY - ((brushPageOffset == null ? void 0 : brushPageOffset.pageY) || 0);
      if (['left', 'right', 'top', 'bottom'].includes(brushingType != null ? brushingType : '')) {
        _this.updateBrush(function (prevBrush) {
          var _prevBrush$start = prevBrush.start,
            x0 = _prevBrush$start.x,
            y0 = _prevBrush$start.y;
          var _prevBrush$end = prevBrush.end,
            x1 = _prevBrush$end.x,
            y1 = _prevBrush$end.y;
          return _extends({}, prevBrush, {
            isBrushing: true,
            extent: _extends({}, prevBrush.extent, _this.getExtent({
              x: brushingType === 'left' ? Math.min(Math.max(x0 + offsetX, prevBrush.bounds.x0), prevBrush.bounds.x1) : x0,
              y: brushingType === 'top' ? Math.min(Math.max(y0 + offsetY, prevBrush.bounds.y0), prevBrush.bounds.y1) : y0
            }, {
              x: brushingType === 'right' ? Math.min(Math.max(x1 + offsetX, prevBrush.bounds.x0), prevBrush.bounds.x1) : x1,
              y: brushingType === 'bottom' ? Math.min(Math.max(y1 + offsetY, prevBrush.bounds.y0), prevBrush.bounds.y1) : y1
            }))
          });
        });
      }
      if (brushingType === 'move') {
        _this.updateBrush(function (prevBrush) {
          var _prevBrush$start2 = prevBrush.start,
            x0 = _prevBrush$start2.x,
            y0 = _prevBrush$start2.y;
          var _prevBrush$end2 = prevBrush.end,
            x1 = _prevBrush$end2.x,
            y1 = _prevBrush$end2.y;
          var validDx = offsetX > 0 ? Math.min(offsetX, prevBrush.bounds.x1 - x1) : Math.max(offsetX, prevBrush.bounds.x0 - x0);
          var validDy = offsetY > 0 ? Math.min(offsetY, prevBrush.bounds.y1 - y1) : Math.max(offsetY, prevBrush.bounds.y0 - y0);
          return _extends({}, prevBrush, {
            isBrushing: true,
            extent: _extends({}, prevBrush.extent, {
              x0: x0 + validDx,
              y0: y0 + validDy,
              x1: x1 + validDx,
              y1: y1 + validDy
            })
          });
        });
      }
      if (brushingType === 'select') {
        _this.updateBrush(function (prevBrush) {
          var _prevBrush$start3 = prevBrush.start,
            x0 = _prevBrush$start3.x,
            y0 = _prevBrush$start3.y;
          var newEnd = {
            x: Math.min(Math.max(x0 + offsetX, prevBrush.bounds.x0), prevBrush.bounds.x1),
            y: Math.min(Math.max(y0 + offsetY, prevBrush.bounds.y0), prevBrush.bounds.y1)
          };
          var extent = _this.getExtent(start, newEnd);
          var newState = _extends({}, prevBrush, {
            end: newEnd,
            extent: extent
          });
          return newState;
        });
      }
    };
    _this.getExtent = function (start, end) {
      var _this$props2 = _this.props,
        brushDirection = _this$props2.brushDirection,
        width = _this$props2.width,
        height = _this$props2.height;
      var x0 = brushDirection === 'vertical' ? 0 : Math.min(start.x || 0, end.x || 0);
      var x1 = brushDirection === 'vertical' ? width : Math.max(start.x || 0, end.x || 0);
      var y0 = brushDirection === 'horizontal' ? 0 : Math.min(start.y || 0, end.y || 0);
      var y1 = brushDirection === 'horizontal' ? height : Math.max(start.y || 0, end.y || 0);
      return {
        x0: x0,
        x1: x1,
        y0: y0,
        y1: y1
      };
    };
    _this.handleDragStart = function (draw) {
      var _this$props3 = _this.props,
        onBrushStart = _this$props3.onBrushStart,
        left = _this$props3.left,
        top = _this$props3.top,
        inheritedMargin = _this$props3.inheritedMargin,
        useWindowMoveEvents = _this$props3.useWindowMoveEvents;
      var marginLeft = inheritedMargin != null && inheritedMargin.left ? inheritedMargin.left : 0;
      var marginTop = inheritedMargin != null && inheritedMargin.top ? inheritedMargin.top : 0;
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
          isBrushing: true,
          brushingType: 'select',
          brushPageOffset: useWindowMoveEvents ? (0, _utils.getPageCoordinates)(draw.event) : undefined
        });
      });
    };
    _this.handleBrushStart = function (drag) {
      var _this$props4 = _this.props,
        onBrushStart = _this$props4.onBrushStart,
        left = _this$props4.left,
        top = _this$props4.top,
        inheritedMargin = _this$props4.inheritedMargin;
      if (onBrushStart) {
        var marginLeft = inheritedMargin != null && inheritedMargin.left ? inheritedMargin.left : 0;
        var marginTop = inheritedMargin != null && inheritedMargin.top ? inheritedMargin.top : 0;
        var _start = {
          x: (drag.x || 0) + drag.dx - left - marginLeft,
          y: (drag.y || 0) + drag.dy - top - marginTop
        };
        onBrushStart(_start);
      }
    };
    _this.handleDragMove = function (drag) {
      var _this$props5 = _this.props,
        left = _this$props5.left,
        top = _this$props5.top,
        inheritedMargin = _this$props5.inheritedMargin,
        useWindowMoveEvents = _this$props5.useWindowMoveEvents;
      if (!drag.isDragging || useWindowMoveEvents) return;
      var marginLeft = (inheritedMargin == null ? void 0 : inheritedMargin.left) || 0;
      var marginTop = (inheritedMargin == null ? void 0 : inheritedMargin.top) || 0;
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
    };
    _this.handleDragEnd = function () {
      var _this$props6 = _this.props,
        onBrushEnd = _this$props6.onBrushEnd,
        resetOnEnd = _this$props6.resetOnEnd,
        useWindowMoveEvents = _this$props6.useWindowMoveEvents;
      if (!useWindowMoveEvents) {
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
            brushingType: undefined,
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
      }
    };
    _this.getBrushWidth = function () {
      var extent = _this.state.extent;
      var x0 = extent.x0,
        x1 = extent.x1;
      return Math.max(Math.max(x0, x1) - Math.min(x0, x1), 0);
    };
    _this.getBrushHeight = function () {
      var extent = _this.state.extent;
      var y1 = extent.y1,
        y0 = extent.y0;
      return Math.max(Math.max(y0, y1) - Math.min(y0, y1), 0);
    };
    _this.handles = function () {
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
    };
    _this.corners = function () {
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
    };
    _this.updateBrush = function (updater) {
      var onChange = _this.props.onChange;
      _this.setState(updater, function () {
        if (onChange) {
          onChange(_this.state);
        }
      });
    };
    _this.reset = function () {
      var _this$props7 = _this.props,
        width = _this$props7.width,
        height = _this$props7.height;
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
          brushPageOffset: undefined,
          activeHandle: null,
          brushingType: undefined
        };
      });
    };
    _this.handleBrushingTypeChange = function (type, brushPageOffset) {
      _this.updateBrush(function (prevBrush) {
        var next = _extends({}, prevBrush, {
          brushingType: type,
          isBrushing: type !== undefined
        });
        if (brushPageOffset || type === undefined) {
          next.brushPageOffset = brushPageOffset;
        }
        return next;
      });
    };
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
      brushingType: undefined,
      activeHandle: null
    };
    return _this;
  }
  var _proto = BaseBrush.prototype;
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(function (prevBrush) {
        var start = prevBrush.start,
          end = prevBrush.end,
          extent = prevBrush.extent;
        if (!(extent.x0 === -1 && extent.x1 === -1 && extent.y0 === -1 && extent.y1 === -1)) {
          var widthRatio = _this2.props.width / prevProps.width;
          var heightRatio = _this2.props.height / prevProps.height;
          start = {
            x: widthRatio * extent.x0,
            y: heightRatio * extent.y0
          };
          end = {
            x: widthRatio * extent.x1,
            y: heightRatio * extent.y1
          };
          extent = _this2.getExtent(start, end);
        }
        return {
          start: start,
          end: end,
          extent: extent,
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
  _proto.componentDidMount = function componentDidMount() {
    if (this.props.useWindowMoveEvents) {
      window.addEventListener('mouseup', this.handleWindowPointerUp);
      window.addEventListener('mousemove', this.handleWindowPointerMove);
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.useWindowMoveEvents) {
      window.removeEventListener('mouseup', this.handleWindowPointerUp);
      window.removeEventListener('mousemove', this.handleWindowPointerMove);
    }
  };
  _proto.render = function render() {
    var _this3 = this;
    var _this$state2 = this.state,
      start = _this$state2.start,
      end = _this$state2.end;
    var _this$props8 = this.props,
      top = _this$props8.top,
      left = _this$props8.left,
      stageWidth = _this$props8.width,
      stageHeight = _this$props8.height,
      onMouseLeave = _this$props8.onMouseLeave,
      onMouseUp = _this$props8.onMouseUp,
      onMouseMove = _this$props8.onMouseMove,
      onBrushEnd = _this$props8.onBrushEnd,
      _onClick = _this$props8.onClick,
      resizeTriggerAreas = _this$props8.resizeTriggerAreas,
      selectedBoxStyle = _this$props8.selectedBoxStyle,
      disableDraggingSelection = _this$props8.disableDraggingSelection,
      clickSensitivity = _this$props8.clickSensitivity,
      useWindowMoveEvents = _this$props8.useWindowMoveEvents,
      renderBrushHandle = _this$props8.renderBrushHandle;
    var brushingType = this.state.brushingType;
    var handles = this.handles();
    var corners = this.corners();
    var width = this.getBrushWidth();
    var height = this.getBrushHeight();
    var resizeTriggerAreaSet = new Set(resizeTriggerAreas);
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      className: "visx-brush",
      top: top,
      left: left
    }, /*#__PURE__*/_react.default.createElement(_Drag.default, {
      width: stageWidth,
      height: stageHeight,
      resetOnStart: true,
      onDragStart: this.handleDragStart,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd,
      isDragging: useWindowMoveEvents ? brushingType === 'select' : undefined
    }, function (_ref) {
      var dragStart = _ref.dragStart,
        isDragging = _ref.isDragging,
        dragMove = _ref.dragMove,
        dragEnd = _ref.dragEnd;
      return /*#__PURE__*/_react.default.createElement(_shape.Bar, {
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
        onPointerDown: function onPointerDown(event) {
          _this3.mouseDownTime = Date.now();
          dragStart(event);
        },
        onPointerLeave: function onPointerLeave(event) {
          if (onMouseLeave) onMouseLeave(event);
        },
        onPointerMove: function onPointerMove(event) {
          if (!isDragging && onMouseMove) onMouseMove(event);
          if (isDragging) dragMove(event);
        },
        onPointerUp: function onPointerUp(event) {
          _this3.mouseUpTime = Date.now();
          if (onMouseUp) onMouseUp(event);
          dragEnd(event);
        },
        style: BRUSH_OVERLAY_STYLES
      });
    }), start && end && /*#__PURE__*/_react.default.createElement(_BrushSelection.default, {
      updateBrush: this.updateBrush,
      width: width,
      height: height,
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      brush: this.state,
      disableDraggingSelection: disableDraggingSelection,
      onBrushEnd: onBrushEnd,
      onBrushStart: this.handleBrushStart,
      onMouseLeave: onMouseLeave,
      onMouseMove: onMouseMove,
      onMouseUp: onMouseUp,
      onMoveSelectionChange: this.handleBrushingTypeChange,
      onClick: _onClick,
      selectedBoxStyle: selectedBoxStyle,
      isControlled: useWindowMoveEvents,
      isDragInProgress: useWindowMoveEvents ? brushingType === 'move' : undefined
    }), start && end && Object.keys(handles).filter(function (handleKey) {
      return resizeTriggerAreaSet.has(handleKey);
    }).map(function (handleKey) {
      var handle = handles[handleKey];
      return handle && /*#__PURE__*/_react.default.createElement(_BrushHandle.default, {
        key: "handle-" + handleKey,
        type: handleKey,
        handle: handle,
        stageWidth: stageWidth,
        stageHeight: stageHeight,
        updateBrush: _this3.updateBrush,
        brush: _this3.state,
        onBrushStart: _this3.handleBrushStart,
        onBrushEnd: onBrushEnd,
        isControlled: useWindowMoveEvents,
        isDragInProgress: useWindowMoveEvents ? brushingType === handleKey : undefined,
        onBrushHandleChange: _this3.handleBrushingTypeChange,
        renderBrushHandle: renderBrushHandle
      });
    }), start && end && Object.keys(corners).filter(function (cornerKey) {
      return resizeTriggerAreaSet.has(cornerKey);
    }).map(function (cornerKey) {
      var corner = corners[cornerKey];
      return corner && /*#__PURE__*/_react.default.createElement(_BrushCorner.default, {
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
}(_react.default.Component);
exports.default = BaseBrush;
BaseBrush.propTypes = {
  brushDirection: _propTypes.default.oneOf(['horizontal', 'vertical', 'both']),
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  left: _propTypes.default.number.isRequired,
  top: _propTypes.default.number.isRequired,
  onChange: _propTypes.default.func,
  handleSize: _propTypes.default.number,
  resizeTriggerAreas: _propTypes.default.array,
  onBrushStart: _propTypes.default.func,
  onBrushEnd: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onClick: _propTypes.default.func,
  clickSensitivity: _propTypes.default.number,
  disableDraggingSelection: _propTypes.default.bool,
  resetOnEnd: _propTypes.default.bool,
  useWindowMoveEvents: _propTypes.default.bool,
  renderBrushHandle: _propTypes.default.func
};
BaseBrush.defaultProps = {
  brushDirection: 'both',
  inheritedMargin: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  onChange: null,
  handleSize: 4,
  resizeTriggerAreas: ['left', 'right'],
  onBrushStart: null,
  onBrushEnd: null,
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null,
  disableDraggingSelection: false,
  clickSensitivity: 200,
  resetOnEnd: false,
  initialBrushPosition: null,
  useWindowMoveEvents: false,
  renderBrushHandles: null
};