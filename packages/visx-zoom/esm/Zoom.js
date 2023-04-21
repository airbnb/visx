import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useState, useRef, useCallback } from 'react';
import { localPoint } from '@visx/event';
import { useGesture } from '@use-gesture/react';
import { composeMatrices, inverseMatrix, applyMatrixToPoint, applyInverseMatrixToPoint, translateMatrix, identityMatrix, scaleMatrix } from './util/matrix';
// default prop values
var defaultInitialTransformMatrix = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0
};
var defaultWheelDelta = function defaultWheelDelta(event) {
  return -event.deltaY > 0 ? {
    scaleX: 1.1,
    scaleY: 1.1
  } : {
    scaleX: 0.9,
    scaleY: 0.9
  };
};
var defaultPinchDelta = function defaultPinchDelta(_ref) {
  var _ref$offset = _ref.offset,
    s = _ref$offset[0],
    _ref$lastOffset = _ref.lastOffset,
    lastS = _ref$lastOffset[0];
  return {
    scaleX: s - lastS < 0 ? 0.9 : 1.1,
    scaleY: s - lastS < 0 ? 0.9 : 1.1
  };
};
function Zoom(_ref2) {
  var _ref2$scaleXMin = _ref2.scaleXMin,
    scaleXMin = _ref2$scaleXMin === void 0 ? 0 : _ref2$scaleXMin,
    _ref2$scaleXMax = _ref2.scaleXMax,
    scaleXMax = _ref2$scaleXMax === void 0 ? Infinity : _ref2$scaleXMax,
    _ref2$scaleYMin = _ref2.scaleYMin,
    scaleYMin = _ref2$scaleYMin === void 0 ? 0 : _ref2$scaleYMin,
    _ref2$scaleYMax = _ref2.scaleYMax,
    scaleYMax = _ref2$scaleYMax === void 0 ? Infinity : _ref2$scaleYMax,
    _ref2$initialTransfor = _ref2.initialTransformMatrix,
    initialTransformMatrix = _ref2$initialTransfor === void 0 ? defaultInitialTransformMatrix : _ref2$initialTransfor,
    _ref2$wheelDelta = _ref2.wheelDelta,
    wheelDelta = _ref2$wheelDelta === void 0 ? defaultWheelDelta : _ref2$wheelDelta,
    _ref2$pinchDelta = _ref2.pinchDelta,
    pinchDelta = _ref2$pinchDelta === void 0 ? defaultPinchDelta : _ref2$pinchDelta,
    width = _ref2.width,
    height = _ref2.height,
    constrain = _ref2.constrain,
    children = _ref2.children;
  var containerRef = useRef(null);
  var matrixStateRef = useRef(initialTransformMatrix);
  var _useState = useState(initialTransformMatrix),
    transformMatrix = _useState[0],
    setTransformMatrixState = _useState[1];
  var _useState2 = useState(false),
    isDragging = _useState2[0],
    setIsDragging = _useState2[1];
  var _useState3 = useState(undefined),
    startTranslate = _useState3[0],
    setStartTranslate = _useState3[1];
  var _useState4 = useState(undefined),
    startPoint = _useState4[0],
    setStartPoint = _useState4[1];
  var defaultConstrain = useCallback(function (newTransformMatrix, prevTransformMatrix) {
    if (constrain) return constrain(newTransformMatrix, prevTransformMatrix);
    var scaleX = newTransformMatrix.scaleX,
      scaleY = newTransformMatrix.scaleY;
    var shouldConstrainScaleX = scaleX > scaleXMax || scaleX < scaleXMin;
    var shouldConstrainScaleY = scaleY > scaleYMax || scaleY < scaleYMin;
    if (shouldConstrainScaleX || shouldConstrainScaleY) {
      return prevTransformMatrix;
    }
    return newTransformMatrix;
  }, [constrain, scaleXMin, scaleXMax, scaleYMin, scaleYMax]);
  var setTransformMatrix = useCallback(function (newTransformMatrix) {
    setTransformMatrixState(function (prevTransformMatrix) {
      var updatedTransformMatrix = defaultConstrain(newTransformMatrix, prevTransformMatrix);
      matrixStateRef.current = updatedTransformMatrix;
      return updatedTransformMatrix;
    });
  }, [defaultConstrain]);
  var applyToPoint = useCallback(function (_ref3) {
    var x = _ref3.x,
      y = _ref3.y;
    return applyMatrixToPoint(transformMatrix, {
      x: x,
      y: y
    });
  }, [transformMatrix]);
  var applyInverseToPoint = useCallback(function (_ref4) {
    var x = _ref4.x,
      y = _ref4.y;
    return applyInverseMatrixToPoint(transformMatrix, {
      x: x,
      y: y
    });
  }, [transformMatrix]);
  var reset = useCallback(function () {
    setTransformMatrix(initialTransformMatrix);
  }, [initialTransformMatrix, setTransformMatrix]);
  var scale = useCallback(function (_ref5) {
    var scaleX = _ref5.scaleX,
      maybeScaleY = _ref5.scaleY,
      point = _ref5.point;
    var scaleY = maybeScaleY || scaleX;
    var cleanPoint = point || {
      x: width / 2,
      y: height / 2
    };
    // need to use ref value instead of state here because wheel listener does not have access to latest state
    var translate = applyInverseMatrixToPoint(matrixStateRef.current, cleanPoint);
    var nextMatrix = composeMatrices(matrixStateRef.current, translateMatrix(translate.x, translate.y), scaleMatrix(scaleX, scaleY), translateMatrix(-translate.x, -translate.y));
    setTransformMatrix(nextMatrix);
    if (isDragging) {
      var _matrixStateRef$curre = matrixStateRef.current,
        translateX = _matrixStateRef$curre.translateX,
        translateY = _matrixStateRef$curre.translateY;
      setStartPoint(point);
      setStartTranslate({
        translateX: translateX,
        translateY: translateY
      });
    }
  }, [height, width, isDragging, setTransformMatrix]);
  var translate = useCallback(function (_ref6) {
    var translateX = _ref6.translateX,
      translateY = _ref6.translateY;
    var nextMatrix = composeMatrices(transformMatrix, translateMatrix(translateX, translateY));
    setTransformMatrix(nextMatrix);
  }, [setTransformMatrix, transformMatrix]);
  var setTranslate = useCallback(function (_ref7) {
    var translateX = _ref7.translateX,
      translateY = _ref7.translateY;
    var nextMatrix = _extends({}, transformMatrix, {
      translateX: translateX,
      translateY: translateY
    });
    setTransformMatrix(nextMatrix);
  }, [setTransformMatrix, transformMatrix]);
  var translateTo = useCallback(function (_ref8) {
    var x = _ref8.x,
      y = _ref8.y;
    var point = applyInverseMatrixToPoint(transformMatrix, {
      x: x,
      y: y
    });
    setTranslate({
      translateX: point.x,
      translateY: point.y
    });
  }, [setTranslate, transformMatrix]);
  var invert = useCallback(function () {
    return inverseMatrix(transformMatrix);
  }, [transformMatrix]);
  var toStringInvert = useCallback(function () {
    var _invert = invert(),
      translateX = _invert.translateX,
      translateY = _invert.translateY,
      scaleX = _invert.scaleX,
      scaleY = _invert.scaleY,
      skewX = _invert.skewX,
      skewY = _invert.skewY;
    return "matrix(" + scaleX + ", " + skewY + ", " + skewX + ", " + scaleY + ", " + translateX + ", " + translateY + ")";
  }, [invert]);
  var dragStart = useCallback(function (event) {
    var translateX = transformMatrix.translateX,
      translateY = transformMatrix.translateY;
    setStartPoint(localPoint(event) || undefined);
    setStartTranslate({
      translateX: translateX,
      translateY: translateY
    });
    setIsDragging(true);
  }, [transformMatrix]);
  var dragMove = useCallback(function (event, options) {
    var _options$offsetX, _options$offsetY;
    if (!isDragging || !startPoint || !startTranslate) return;
    var currentPoint = localPoint(event);
    var dx = currentPoint ? -(startPoint.x - currentPoint.x) : -startPoint.x;
    var dy = currentPoint ? -(startPoint.y - currentPoint.y) : -startPoint.y;
    var translateX = startTranslate.translateX + dx;
    if (options != null && options.offsetX) translateX += (_options$offsetX = options == null ? void 0 : options.offsetX) != null ? _options$offsetX : 0;
    var translateY = startTranslate.translateY + dy;
    if (options != null && options.offsetY) translateY += (_options$offsetY = options == null ? void 0 : options.offsetY) != null ? _options$offsetY : 0;
    setTranslate({
      translateX: translateX,
      translateY: translateY
    });
  }, [isDragging, setTranslate, startPoint, startTranslate]);
  var dragEnd = useCallback(function () {
    setStartPoint(undefined);
    setStartTranslate(undefined);
    setIsDragging(false);
  }, []);
  var handleWheel = useCallback(function (event) {
    event.preventDefault();
    var point = localPoint(event) || undefined;
    var _ref9 = wheelDelta(event),
      scaleX = _ref9.scaleX,
      scaleY = _ref9.scaleY;
    scale({
      scaleX: scaleX,
      scaleY: scaleY,
      point: point
    });
  }, [scale, wheelDelta]);
  var handlePinch = useCallback(function (state) {
    var _state$origin = state.origin,
      ox = _state$origin[0],
      oy = _state$origin[1],
      memo = state.memo;
    var currentMemo = memo;
    if (containerRef.current) {
      var _currentMemo;
      var _ref10 = (_currentMemo = currentMemo) != null ? _currentMemo : containerRef.current.getBoundingClientRect(),
        top = _ref10.top,
        left = _ref10.left;
      if (!currentMemo) {
        currentMemo = {
          top: top,
          left: left
        };
      }
      var _pinchDelta = pinchDelta(state),
        scaleX = _pinchDelta.scaleX,
        scaleY = _pinchDelta.scaleY;
      scale({
        scaleX: scaleX,
        scaleY: scaleY,
        point: {
          x: ox - left,
          y: oy - top
        }
      });
    }
    return currentMemo;
  }, [scale, pinchDelta]);
  var toString = useCallback(function () {
    var translateX = transformMatrix.translateX,
      translateY = transformMatrix.translateY,
      scaleX = transformMatrix.scaleX,
      scaleY = transformMatrix.scaleY,
      skewX = transformMatrix.skewX,
      skewY = transformMatrix.skewY;
    return "matrix(" + scaleX + ", " + skewY + ", " + skewX + ", " + scaleY + ", " + translateX + ", " + translateY + ")";
  }, [transformMatrix]);
  var center = useCallback(function () {
    var centerPoint = {
      x: width / 2,
      y: height / 2
    };
    var inverseCentroid = applyInverseToPoint(centerPoint);
    translate({
      translateX: inverseCentroid.x - centerPoint.x,
      translateY: inverseCentroid.y - centerPoint.y
    });
  }, [height, width, applyInverseToPoint, translate]);
  var clear = useCallback(function () {
    setTransformMatrix(identityMatrix());
  }, [setTransformMatrix]);
  useGesture({
    onDragStart: function onDragStart(_ref11) {
      var event = _ref11.event;
      if (!(event instanceof KeyboardEvent)) dragStart(event);
    },
    onDrag: function onDrag(_ref12) {
      var event = _ref12.event,
        pinching = _ref12.pinching,
        cancel = _ref12.cancel;
      if (pinching) {
        cancel();
        dragEnd();
      } else if (!(event instanceof KeyboardEvent)) {
        dragMove(event);
      }
    },
    onDragEnd: dragEnd,
    onPinch: handlePinch,
    onWheel: function onWheel(_ref13) {
      var event = _ref13.event,
        active = _ref13.active,
        pinching = _ref13.pinching;
      if (
      // Outside of Safari, the wheel event is fired together with the pinch event
      pinching ||
      // currently onWheelEnd emits one final wheel event which causes 2x scale
      // updates for the last tick. ensuring that the gesture is active avoids this
      !active) {
        return;
      }
      handleWheel(event);
    }
  }, {
    target: containerRef,
    eventOptions: {
      passive: false
    },
    drag: {
      filterTaps: true
    }
  });
  var zoom = {
    initialTransformMatrix: initialTransformMatrix,
    transformMatrix: transformMatrix,
    isDragging: isDragging,
    center: center,
    clear: clear,
    scale: scale,
    translate: translate,
    translateTo: translateTo,
    setTranslate: setTranslate,
    setTransformMatrix: setTransformMatrix,
    reset: reset,
    handleWheel: handleWheel,
    handlePinch: handlePinch,
    dragEnd: dragEnd,
    dragMove: dragMove,
    dragStart: dragStart,
    toString: toString,
    invert: invert,
    toStringInvert: toStringInvert,
    applyToPoint: applyToPoint,
    applyInverseToPoint: applyInverseToPoint,
    containerRef: containerRef
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, children(zoom));
}
Zoom.propTypes = {
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  wheelDelta: _pt.func,
  scaleXMin: _pt.number,
  scaleXMax: _pt.number,
  scaleYMin: _pt.number,
  scaleYMax: _pt.number,
  constrain: _pt.func,
  children: _pt.func.isRequired
};
export default Zoom;