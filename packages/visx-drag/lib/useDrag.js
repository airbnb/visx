"use strict";

exports.__esModule = true;
exports.default = useDrag;

var _react = require("react");

var _event = require("@visx/event");

var _useStateWithCallback2 = _interopRequireDefault(require("./util/useStateWithCallback"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** Hook for dragging, returns a `UseDrag` object. */
function useDrag(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$resetOnStart = _ref.resetOnStart,
      resetOnStart = _ref$resetOnStart === void 0 ? false : _ref$resetOnStart,
      onDragEnd = _ref.onDragEnd,
      onDragMove = _ref.onDragMove,
      onDragStart = _ref.onDragStart,
      x = _ref.x,
      y = _ref.y,
      dx = _ref.dx,
      dy = _ref.dy;

  // use ref to detect prop changes
  var positionPropsRef = (0, _react.useRef)({
    x: x,
    y: y,
    dx: dx,
    dy: dy
  });

  var _useStateWithCallback = (0, _useStateWithCallback2.default)({
    x: x,
    y: y,
    dx: dx != null ? dx : 0,
    dy: dy != null ? dy : 0,
    isDragging: false
  }),
      dragState = _useStateWithCallback[0],
      setDragStateWithCallback = _useStateWithCallback[1]; // if prop position changes, update state


  (0, _react.useEffect)(function () {
    if (positionPropsRef.current.x !== x || positionPropsRef.current.y !== y || positionPropsRef.current.dx !== dx || positionPropsRef.current.dy !== dy) {
      positionPropsRef.current = {
        x: x,
        y: y,
        dx: dx,
        dy: dy
      };
      setDragStateWithCallback(function (currState) {
        return _extends({}, currState, {
          x: x,
          y: y,
          dx: dx != null ? dx : 0,
          dy: dy != null ? dy : 0
        });
      });
    }
  });
  var handleDragStart = (0, _react.useCallback)(function (event) {
    event.persist();
    setDragStateWithCallback(function (currState) {
      var point = (0, _event.localPoint)(event) || {
        x: 0,
        y: 0
      };
      return {
        isDragging: true,
        dx: resetOnStart ? 0 : currState.dx,
        dy: resetOnStart ? 0 : currState.dy,
        x: resetOnStart ? point.x : point.x - currState.dx,
        y: resetOnStart ? point.y : point.y - currState.dy
      };
    }, onDragStart && function (currState) {
      onDragStart(_extends({}, currState, {
        event: event
      }));
    });
  }, [onDragStart, resetOnStart, setDragStateWithCallback]);
  var handleDragMove = (0, _react.useCallback)(function (event) {
    event.persist();
    setDragStateWithCallback(function (currState) {
      var point = (0, _event.localPoint)(event) || {
        x: 0,
        y: 0
      };
      return currState.isDragging ? _extends({}, currState, {
        isDragging: true,
        dx: point.x - (currState.x || 0),
        dy: point.y - (currState.y || 0)
      }) : currState;
    }, onDragMove && function (currState) {
      if (currState.isDragging) onDragMove(_extends({}, currState, {
        event: event
      }));
    });
  }, [onDragMove, setDragStateWithCallback]);
  var handleDragEnd = (0, _react.useCallback)(function (event) {
    event.persist();
    setDragStateWithCallback(function (currState) {
      return _extends({}, currState, {
        isDragging: false
      });
    }, onDragEnd && function (currState) {
      onDragEnd(_extends({}, currState, {
        event: event
      }));
    });
  }, [onDragEnd, setDragStateWithCallback]);
  return _extends({}, dragState, {
    dragEnd: handleDragEnd,
    dragMove: handleDragMove,
    dragStart: handleDragStart
  });
}