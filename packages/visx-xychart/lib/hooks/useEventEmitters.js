"use strict";

exports.__esModule = true;
exports.default = usePointerEventEmitters;

var _react = _interopRequireWildcard(require("react"));

var _useEventEmitter = _interopRequireDefault(require("./useEventEmitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    onPointerUp: onPointerUp ? emitPointerUp : undefined
  };
}