"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Drag = _interopRequireDefault(require("@visx/drag/lib/Drag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** BrushHandle's are placed along the bounds of the brush and handle Drag events which update the passed brush. */
var BrushHandle = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BrushHandle, _React$Component);

  function BrushHandle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleDragMove", function (drag) {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          type = _this$props.type;
      if (!drag.isDragging) return;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end;
        var move = 0;
        var xMax = Math.max(start.x, end.x);
        var xMin = Math.min(start.x, end.x);
        var yMax = Math.max(start.y, end.y);
        var yMin = Math.min(start.y, end.y);

        switch (type) {
          case "right":
            move = xMax + drag.dx;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.max(Math.min(move, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(move, start.x), prevBrush.bounds.x1)
              })
            });

          case "left":
            move = xMin + drag.dx;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.min(move, end.x),
                x1: Math.max(move, end.x)
              })
            });

          case "bottom":
            move = yMax + drag.dy;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                y0: Math.min(move, start.y),
                y1: Math.max(move, start.y)
              })
            });

          case "top":
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
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragEnd", function () {
      var _this$props2 = _this.props,
          updateBrush = _this$props2.updateBrush,
          onBrushEnd = _this$props2.onBrushEnd;
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
    });

    return _this;
  }

  var _proto = BrushHandle.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        stageWidth = _this$props3.stageWidth,
        stageHeight = _this$props3.stageHeight,
        brush = _this$props3.brush,
        type = _this$props3.type,
        handle = _this$props3.handle;
    var x = handle.x,
        y = handle.y,
        width = handle.width,
        height = handle.height;
    var cursor = type === "right" || type === "left" ? "ew-resize" : "ns-resize";
    return /*#__PURE__*/_react.default.createElement(_Drag.default, {
      width: stageWidth,
      height: stageHeight,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd,
      resetOnStart: true
    }, function (_ref) {
      var dragStart = _ref.dragStart,
          dragEnd = _ref.dragEnd,
          dragMove = _ref.dragMove,
          isDragging = _ref.isDragging;
      return /*#__PURE__*/_react.default.createElement("g", null, isDragging && /*#__PURE__*/_react.default.createElement("rect", {
        fill: "transparent",
        width: stageWidth,
        height: stageHeight,
        style: {
          cursor: cursor
        },
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        onMouseLeave: dragEnd
      }), /*#__PURE__*/_react.default.createElement("rect", {
        x: x,
        y: y,
        width: width,
        height: height,
        fill: "transparent",
        className: "visx-brush-handle-" + type,
        onMouseDown: dragStart,
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        onTouchStart: dragStart,
        onTouchMove: dragMove,
        onTouchEnd: dragEnd,
        style: {
          cursor: cursor,
          pointerEvents: !!brush.activeHandle || !!brush.isBrushing ? "none" : "all"
        }
      }));
    });
  };

  return BrushHandle;
}(_react.default.Component);

exports.default = BrushHandle;

_defineProperty(BrushHandle, "propTypes", {
  stageWidth: _propTypes.default.number.isRequired,
  stageHeight: _propTypes.default.number.isRequired,
  updateBrush: _propTypes.default.func.isRequired,
  onBrushEnd: _propTypes.default.func,
  handle: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired,
    width: _propTypes.default.number.isRequired,
    height: _propTypes.default.number.isRequired
  }).isRequired
});