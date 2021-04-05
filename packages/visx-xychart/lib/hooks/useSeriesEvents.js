"use strict";

exports.__esModule = true;
exports.default = useSeriesEvents;

var _react = _interopRequireWildcard(require("react"));

var _TooltipContext = _interopRequireDefault(require("../context/TooltipContext"));

var _useEventEmitters = _interopRequireDefault(require("./useEventEmitters"));

var _useEventHandlers = _interopRequireDefault(require("./useEventHandlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** This hook simplifies the logic for initializing Series event emitters + handlers. */
function useSeriesEvents(_ref) {
  var _useContext;

  var dataKey = _ref.dataKey,
      enableEvents = _ref.enableEvents,
      findNearestDatum = _ref.findNearestDatum,
      onBlurProps = _ref.onBlur,
      onFocusProps = _ref.onFocus,
      onPointerMoveProps = _ref.onPointerMove,
      onPointerOutProps = _ref.onPointerOut,
      onPointerUpProps = _ref.onPointerUp,
      source = _ref.source,
      allowedSources = _ref.allowedSources;

  var _ref2 = (_useContext = (0, _react.useContext)(_TooltipContext.default)) != null ? _useContext : {},
      showTooltip = _ref2.showTooltip,
      hideTooltip = _ref2.hideTooltip;

  var onPointerMove = (0, _react.useCallback)(function (params) {
    showTooltip(params);
    if (onPointerMoveProps) onPointerMoveProps(params);
  }, [showTooltip, onPointerMoveProps]);
  var onFocus = (0, _react.useCallback)(function (params) {
    showTooltip(params);
    if (onFocusProps) onFocusProps(params);
  }, [showTooltip, onFocusProps]);
  var onPointerOut = (0, _react.useCallback)(function (event) {
    hideTooltip();
    if (event && onPointerOutProps) onPointerOutProps(event);
  }, [hideTooltip, onPointerOutProps]);
  var onBlur = (0, _react.useCallback)(function (event) {
    hideTooltip();
    if (event && onBlurProps) onBlurProps(event);
  }, [hideTooltip, onBlurProps]);
  (0, _useEventHandlers.default)({
    dataKey: dataKey,
    findNearestDatum: findNearestDatum,
    onBlur: enableEvents ? onBlur : undefined,
    onFocus: enableEvents ? onFocus : undefined,
    onPointerMove: enableEvents ? onPointerMove : undefined,
    onPointerOut: enableEvents ? onPointerOut : undefined,
    onPointerUp: enableEvents ? onPointerUpProps : undefined,
    allowedSources: allowedSources
  });
  return (0, _useEventEmitters.default)({
    source: source,
    onBlur: !!onBlurProps && enableEvents,
    onFocus: !!onFocusProps && enableEvents,
    onPointerMove: !!onPointerMoveProps && enableEvents,
    onPointerOut: !!onPointerOutProps && enableEvents,
    onPointerUp: !!onPointerUpProps && enableEvents
  });
}