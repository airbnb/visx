"use strict";

exports.__esModule = true;
exports.default = usePointerEventEmitters;
var _react = require("react");
var _useEventEmitter = _interopRequireDefault(require("./useEventEmitter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * A hook that simplifies creation of handlers for emitting
 * pointermove, pointerout, and pointerup events to EventEmitterContext.
 */
function usePointerEventEmitters(_ref) {
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
  var emit = (0, _useEventEmitter.default)();
  var emitPointerMove = (0, _react.useCallback)(function (event) {
    return emit == null ? void 0 : emit('pointermove', event, source);
  }, [emit, source]);
  var emitPointerOut = (0, _react.useCallback)(function (event) {
    return emit == null ? void 0 : emit('pointerout', event, source);
  }, [emit, source]);
  var emitPointerUp = (0, _react.useCallback)(function (event) {
    return emit == null ? void 0 : emit('pointerup', event, source);
  }, [emit, source]);
  var emitPointerDown = (0, _react.useCallback)(function (event) {
    return emit == null ? void 0 : emit('pointerdown', event, source);
  }, [emit, source]);
  var emitFocus = (0, _react.useCallback)(function (event) {
    return emit == null ? void 0 : emit('focus', event, source);
  }, [emit, source]);
  var emitBlur = (0, _react.useCallback)(function (event) {
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