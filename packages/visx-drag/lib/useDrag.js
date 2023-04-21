"use strict";

exports.__esModule = true;
exports.default = useDrag;
var _react = require("react");
var _point = require("@visx/point");
var _event = require("@visx/event");
var _useStateWithCallback2 = _interopRequireDefault(require("./util/useStateWithCallback"));
var _restrictPoint = _interopRequireDefault(require("./util/restrictPoint"));
var _useSamplesAlongPath = _interopRequireDefault(require("./util/useSamplesAlongPath"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/** Hook for dragging, returns a `UseDrag` object. */
function useDrag(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$resetOnStart = _ref.resetOnStart,
    resetOnStart = _ref$resetOnStart === void 0 ? false : _ref$resetOnStart,
    _ref$snapToPointer = _ref.snapToPointer,
    snapToPointer = _ref$snapToPointer === void 0 ? true : _ref$snapToPointer,
    onDragEnd = _ref.onDragEnd,
    onDragMove = _ref.onDragMove,
    onDragStart = _ref.onDragStart,
    x = _ref.x,
    y = _ref.y,
    dx = _ref.dx,
    dy = _ref.dy,
    isDragging = _ref.isDragging,
    _ref$restrict = _ref.restrict,
    restrict = _ref$restrict === void 0 ? {} : _ref$restrict,
    restrictToPath = _ref.restrictToPath;
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
    setDragStateWithCallback = _useStateWithCallback[1];

  // Track distance between pointer on dragStart and position of element being dragged
  var _useState = (0, _react.useState)(new _point.Point({
      x: 0,
      y: 0
    })),
    dragStartPointerOffset = _useState[0],
    setDragStartPointerOffset = _useState[1];

  // if prop position changes, update state
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
  (0, _react.useEffect)(function () {
    if (isDragging !== undefined && dragState.isDragging !== isDragging) {
      setDragStateWithCallback(function (currState) {
        return _extends({}, currState, {
          isDragging: isDragging
        });
      });
    }
  }, [dragState.isDragging, isDragging, setDragStateWithCallback]);
  var restrictToPathSamples = (0, _useSamplesAlongPath.default)(restrictToPath);
  var handleDragStart = (0, _react.useCallback)(function (event) {
    event.persist();
    setDragStateWithCallback(function (currState) {
      // eslint-disable-next-line no-shadow
      var _currState$x = currState.x,
        x = _currState$x === void 0 ? 0 : _currState$x,
        _currState$y = currState.y,
        y = _currState$y === void 0 ? 0 : _currState$y,
        dx = currState.dx,
        dy = currState.dy;
      var currentPoint = new _point.Point({
        x: (x || 0) + dx,
        y: (y || 0) + dy
      });
      var eventPoint = (0, _event.localPoint)(event) || new _point.Point({
        x: 0,
        y: 0
      });
      var point = snapToPointer ? eventPoint : currentPoint;
      var dragPoint = (0, _restrictPoint.default)(point, restrictToPathSamples, restrict);
      setDragStartPointerOffset((0, _point.subtractPoints)(currentPoint, eventPoint));
      return {
        isDragging: true,
        dx: resetOnStart ? 0 : currState.dx,
        dy: resetOnStart ? 0 : currState.dy,
        x: resetOnStart ? dragPoint.x : dragPoint.x - currState.dx,
        y: resetOnStart ? dragPoint.y : dragPoint.y - currState.dy
      };
    }, onDragStart && function (currState) {
      onDragStart(_extends({}, currState, {
        event: event
      }));
    });
  }, [onDragStart, resetOnStart, restrict, restrictToPathSamples, setDragStateWithCallback, snapToPointer]);
  var handleDragMove = (0, _react.useCallback)(function (event) {
    event.persist();
    setDragStateWithCallback(function (currState) {
      if (!currState.isDragging) return currState;
      // eslint-disable-next-line no-shadow
      var _currState$x2 = currState.x,
        x = _currState$x2 === void 0 ? 0 : _currState$x2,
        _currState$y2 = currState.y,
        y = _currState$y2 === void 0 ? 0 : _currState$y2;
      var pointerPoint = (0, _event.localPoint)(event) || new _point.Point({
        x: 0,
        y: 0
      });
      var point = snapToPointer ? pointerPoint : (0, _point.sumPoints)(pointerPoint, dragStartPointerOffset);
      var dragPoint = (0, _restrictPoint.default)(point, restrictToPathSamples, restrict);
      return _extends({}, currState, {
        dx: dragPoint.x - x,
        dy: dragPoint.y - y
      });
    }, onDragMove && function (currState) {
      if (currState.isDragging) onDragMove(_extends({}, currState, {
        event: event
      }));
    });
  }, [setDragStateWithCallback, onDragMove, snapToPointer, dragStartPointerOffset, restrictToPathSamples, restrict]);
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