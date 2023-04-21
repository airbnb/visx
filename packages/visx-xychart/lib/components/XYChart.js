"use strict";

exports.__esModule = true;
exports.default = XYChart;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _ParentSize = _interopRequireDefault(require("@visx/responsive/lib/components/ParentSize"));
var _DataContext = _interopRequireDefault(require("../context/DataContext"));
var _useEventEmitter = _interopRequireDefault(require("../hooks/useEventEmitter"));
var _EventEmitterProvider = _interopRequireDefault(require("../providers/EventEmitterProvider"));
var _TooltipContext = _interopRequireDefault(require("../context/TooltipContext"));
var _TooltipProvider = _interopRequireDefault(require("../providers/TooltipProvider"));
var _DataProvider = _interopRequireDefault(require("../providers/DataProvider"));
var _useEventEmitters = _interopRequireDefault(require("../hooks/useEventEmitters"));
var _constants = require("../constants");
var _useEventHandlers = _interopRequireWildcard(require("../hooks/useEventHandlers"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_MARGIN = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};
var allowedEventSources = [_constants.XYCHART_EVENT_SOURCE];
function XYChart(props) {
  var _props$accessibilityL = props.accessibilityLabel,
    accessibilityLabel = _props$accessibilityL === void 0 ? 'XYChart' : _props$accessibilityL,
    _props$captureEvents = props.captureEvents,
    captureEvents = _props$captureEvents === void 0 ? true : _props$captureEvents,
    children = props.children,
    height = props.height,
    horizontal = props.horizontal,
    _props$margin = props.margin,
    margin = _props$margin === void 0 ? DEFAULT_MARGIN : _props$margin,
    onPointerMove = props.onPointerMove,
    onPointerOut = props.onPointerOut,
    onPointerUp = props.onPointerUp,
    onPointerDown = props.onPointerDown,
    _props$pointerEventsD = props.pointerEventsDataKey,
    pointerEventsDataKey = _props$pointerEventsD === void 0 ? 'nearest' : _props$pointerEventsD,
    theme = props.theme,
    width = props.width,
    xScale = props.xScale,
    yScale = props.yScale,
    resizeObserverPolyfillProp = props.resizeObserverPolyfill;
  var _useContext = (0, _react.useContext)(_DataContext.default),
    setDimensions = _useContext.setDimensions,
    resizeObserverPolyfill = _useContext.resizeObserverPolyfill;
  var tooltipContext = (0, _react.useContext)(_TooltipContext.default);
  var emit = (0, _useEventEmitter.default)();

  // update dimensions in context
  (0, _react.useEffect)(function () {
    if (setDimensions && width != null && height != null && width > 0 && height > 0) {
      setDimensions({
        width: width,
        height: height,
        margin: margin
      });
    }
  }, [setDimensions, width, height, margin]);
  var eventEmitters = (0, _useEventEmitters.default)({
    source: _constants.XYCHART_EVENT_SOURCE
  });
  (0, _useEventHandlers.default)({
    dataKey: pointerEventsDataKey === 'nearest' ? _useEventHandlers.POINTER_EVENTS_NEAREST : _useEventHandlers.POINTER_EVENTS_ALL,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    onPointerDown: onPointerDown,
    allowedSources: allowedEventSources
  });

  // if Context or dimensions are not available, wrap self in the needed providers
  if (!setDimensions) {
    if (!xScale || !yScale) {
      console.warn('[@visx/xychart] XYChart: When no DataProvider is available in context, you must pass xScale & yScale config to XYChart.');
      return null;
    }
    return /*#__PURE__*/_react.default.createElement(_DataProvider.default, {
      xScale: xScale,
      yScale: yScale,
      theme: theme,
      initialDimensions: {
        width: width,
        height: height,
        margin: margin
      },
      horizontal: horizontal,
      resizeObserverPolyfill: resizeObserverPolyfillProp
    }, /*#__PURE__*/_react.default.createElement(XYChart, props));
  }
  if (width == null || height == null) {
    return /*#__PURE__*/_react.default.createElement(_ParentSize.default, {
      resizeObserverPolyfill: resizeObserverPolyfill
    }, function (dims) {
      return /*#__PURE__*/_react.default.createElement(XYChart, _extends({}, props, {
        width: props.width == null ? dims.width : props.width,
        height: props.height == null ? dims.height : props.height
      }));
    });
  }
  if (tooltipContext == null) {
    return /*#__PURE__*/_react.default.createElement(_TooltipProvider.default, null, /*#__PURE__*/_react.default.createElement(XYChart, props));
  }

  // EventEmitterProvider should be the last wrapper so we do not duplicate handlers
  if (emit == null) {
    return /*#__PURE__*/_react.default.createElement(_EventEmitterProvider.default, null, /*#__PURE__*/_react.default.createElement(XYChart, props));
  }
  if (width <= 0 || height <= 0) {
    console.info('XYChart has a zero width or height, bailing', {
      width: width,
      height: height
    });
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: width,
    height: height,
    "aria-label": accessibilityLabel
  }, children, captureEvents && /*#__PURE__*/_react.default.createElement("rect", _extends({
    x: margin.left,
    y: margin.top,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    fill: "transparent"
  }, eventEmitters)));
}
XYChart.propTypes = {
  accessibilityLabel: _propTypes.default.string,
  captureEvents: _propTypes.default.bool,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  children: _propTypes.default.node.isRequired,
  horizontal: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['auto'])]),
  onPointerMove: _propTypes.default.func,
  onPointerOut: _propTypes.default.func,
  onPointerUp: _propTypes.default.func,
  onPointerDown: _propTypes.default.func,
  pointerEventsDataKey: _propTypes.default.oneOf(['all', 'nearest'])
};