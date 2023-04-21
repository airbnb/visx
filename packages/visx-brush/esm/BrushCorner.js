import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/* eslint react/jsx-handler-names: 0 */
import React from 'react';
import Drag from '@visx/drag/lib/Drag';
var BrushCorner = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BrushCorner, _React$Component);
  function BrushCorner() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.cornerDragMove = function (drag) {
      var _this$props = _this.props,
        updateBrush = _this$props.updateBrush,
        type = _this$props.type;
      if (!drag.isDragging) return;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
          end = prevBrush.end;
        var xMax = Math.max(start.x, end.x);
        var xMin = Math.min(start.x, end.x);
        var yMax = Math.max(start.y, end.y);
        var yMin = Math.min(start.y, end.y);
        var moveX = 0;
        var moveY = 0;
        switch (type) {
          case 'topRight':
            moveX = xMax + drag.dx;
            moveY = yMin + drag.dy;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1)
              })
            });
          case 'topLeft':
            moveX = xMin + drag.dx;
            moveY = yMin + drag.dy;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1)
              })
            });
          case 'bottomLeft':
            moveX = xMin + drag.dx;
            moveY = yMax + drag.dy;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1)
              })
            });
          case 'bottomRight':
            moveX = xMax + drag.dx;
            moveY = yMax + drag.dy;
            return _extends({}, prevBrush, {
              activeHandle: type,
              extent: _extends({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1)
              })
            });
          default:
            return prevBrush;
        }
      });
    };
    _this.cornerDragEnd = function () {
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
          domain: {
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
    };
    return _this;
  }
  var _proto = BrushCorner.prototype;
  _proto.render = function render() {
    var _this$props3 = this.props,
      type = _this$props3.type,
      brush = _this$props3.brush,
      stageWidth = _this$props3.stageWidth,
      stageHeight = _this$props3.stageHeight,
      styleProp = _this$props3.style,
      corner = _this$props3.corner;
    var cursor = (styleProp == null ? void 0 : styleProp.cursor) || (type === 'topLeft' || type === 'bottomRight' ? 'nwse-resize' : 'nesw-resize');
    var pointerEvents = brush.activeHandle || brush.isBrushing ? 'none' : 'all';
    return /*#__PURE__*/React.createElement(Drag, {
      width: stageWidth,
      height: stageHeight,
      onDragMove: this.cornerDragMove,
      onDragEnd: this.cornerDragEnd,
      resetOnStart: true
    }, function (_ref) {
      var dragMove = _ref.dragMove,
        dragEnd = _ref.dragEnd,
        dragStart = _ref.dragStart,
        isDragging = _ref.isDragging;
      return /*#__PURE__*/React.createElement("g", null, isDragging && /*#__PURE__*/React.createElement("rect", {
        fill: "transparent",
        width: stageWidth,
        height: stageHeight,
        style: {
          cursor: cursor
        },
        onPointerMove: dragMove,
        onPointerUp: dragEnd
      }), /*#__PURE__*/React.createElement("rect", _extends({
        fill: "transparent",
        onPointerDown: dragStart,
        onPointerMove: dragMove,
        onPointerUp: dragEnd,
        className: "visx-brush-corner-" + type,
        style: _extends({
          cursor: cursor,
          pointerEvents: pointerEvents
        }, styleProp)
      }, corner)));
    });
  };
  return BrushCorner;
}(React.Component);
BrushCorner.propTypes = {
  stageWidth: _pt.number.isRequired,
  stageHeight: _pt.number.isRequired,
  updateBrush: _pt.func.isRequired,
  onBrushEnd: _pt.func,
  corner: _pt.shape({
    x: _pt.number.isRequired,
    y: _pt.number.isRequired,
    width: _pt.number.isRequired,
    height: _pt.number.isRequired
  }).isRequired
};
BrushCorner.defaultProps = {
  style: {}
};
export { BrushCorner as default };