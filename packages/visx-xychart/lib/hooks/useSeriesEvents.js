"use strict";

exports.__esModule = true;
exports.default = useSeriesEvents;
var _react = require("react");
var _TooltipContext = _interopRequireDefault(require("../context/TooltipContext"));
var _useEventEmitters = _interopRequireDefault(require("./useEventEmitters"));
var _useEventHandlers = _interopRequireDefault(require("./useEventHandlers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    onPointerDownProps = _ref.onPointerDown,
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
  var onPointerDown = (0, _react.useCallback)(function (params) {
    showTooltip(params);
    if (onPointerDownProps) onPointerDownProps(params);
  }, [showTooltip, onPointerDownProps]);
  (0, _useEventHandlers.default)({
    dataKey: dataKey,
    findNearestDatum: findNearestDatum,
    onBlur: enableEvents ? onBlur : undefined,
    onFocus: enableEvents ? onFocus : undefined,
    onPointerMove: enableEvents ? onPointerMove : undefined,
    onPointerOut: enableEvents ? onPointerOut : undefined,
    onPointerUp: enableEvents ? onPointerUpProps : undefined,
    onPointerDown: enableEvents ? onPointerDown : undefined,
    allowedSources: allowedSources
  });
  return (0, _useEventEmitters.default)({
    source: source,
    onBlur: !!onBlurProps && enableEvents,
    onFocus: !!onFocusProps && enableEvents,
    onPointerMove: !!onPointerMoveProps && enableEvents,
    onPointerOut: !!onPointerOutProps && enableEvents,
    onPointerUp: !!onPointerUpProps && enableEvents,
    onPointerDown: !!onPointerDownProps && enableEvents
  });
}