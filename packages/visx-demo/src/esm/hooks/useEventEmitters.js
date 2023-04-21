import { useCallback } from 'react';
import useEventEmitter from './useEventEmitter';
/**
 * A hook that simplifies creation of handlers for emitting
 * pointermove, pointerout, and pointerup events to EventEmitterContext.
 */
export default function usePointerEventEmitters(_ref) {
  var source = _ref.source,
    _ref$onPointerOut = _ref.onPointerOut,
    onPointerOut = _ref$onPointerOut === void 0 ? true : _ref$onPointerOut,
    _ref$onPointerMove = _ref.onPointerMove,
    onPointerMove = _ref$onPointerMove === void 0 ? true : _ref$onPointerMove,
    _ref$onPointerUp = _ref.onPointerUp,
    onPointerUp = _ref$onPointerUp === void 0 ? true : _ref$onPointerUp,
    _ref$onPointerDown = _ref.onPointerDown,
    onPointerDown = _ref$onPointerDown === void 0 ? true : _ref$onPointerDown,
    _ref$onFocus = _ref.onFocus,
    onFocus = _ref$onFocus === void 0 ? false : _ref$onFocus,
    _ref$onBlur = _ref.onBlur,
    onBlur = _ref$onBlur === void 0 ? false : _ref$onBlur;
  var emit = useEventEmitter();
  var emitPointerMove = useCallback(function (event) {
    return emit == null ? void 0 : emit('pointermove', event, source);
  }, [emit, source]);
  var emitPointerOut = useCallback(function (event) {
    return emit == null ? void 0 : emit('pointerout', event, source);
  }, [emit, source]);
  var emitPointerUp = useCallback(function (event) {
    return emit == null ? void 0 : emit('pointerup', event, source);
  }, [emit, source]);
  var emitPointerDown = useCallback(function (event) {
    return emit == null ? void 0 : emit('pointerdown', event, source);
  }, [emit, source]);
  var emitFocus = useCallback(function (event) {
    return emit == null ? void 0 : emit('focus', event, source);
  }, [emit, source]);
  var emitBlur = useCallback(function (event) {
    return emit == null ? void 0 : emit('blur', event, source);
  }, [emit, source]);
  return {
    onPointerMove: onPointerMove ? emitPointerMove : undefined,
    onFocus: onFocus ? emitFocus : undefined,
    onBlur: onBlur ? emitBlur : undefined,
    onPointerOut: onPointerOut ? emitPointerOut : undefined,
    onPointerUp: onPointerUp ? emitPointerUp : undefined,
    onPointerDown: onPointerDown ? emitPointerDown : undefined
  };
}