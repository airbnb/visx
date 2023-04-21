"use strict";

exports.__esModule = true;
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Area = _interopRequireDefault(require("@visx/shape/lib/shapes/Area"));
var _LinePath = _interopRequireDefault(require("@visx/shape/lib/shapes/LinePath"));
var _DataContext = _interopRequireDefault(require("../../../context/DataContext"));
var _withRegisteredData = _interopRequireDefault(require("../../../enhancers/withRegisteredData"));
var _getScaledValueFactory = _interopRequireDefault(require("../../../utils/getScaledValueFactory"));
var _getScaleBaseline = _interopRequireDefault(require("../../../utils/getScaleBaseline"));
var _isValidNumber = _interopRequireDefault(require("../../../typeguards/isValidNumber"));
var _constants = require("../../../constants");
var _BaseGlyphSeries = require("./BaseGlyphSeries");
var _defaultRenderGlyph = _interopRequireDefault(require("./defaultRenderGlyph"));
var _useSeriesEvents = _interopRequireDefault(require("../../../hooks/useSeriesEvents"));
var _excluded = ["PathComponent", "curve", "data", "dataKey", "lineProps", "onBlur", "onFocus", "onPointerMove", "onPointerOut", "onPointerUp", "onPointerDown", "enableEvents", "renderLine", "xAccessor", "x0Accessor", "xScale", "yAccessor", "y0Accessor", "yScale"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function BaseAreaSeries(_ref) {
  var _ref2, _colorScale, _theme$colors;
  var _ref$PathComponent = _ref.PathComponent,
    PathComponent = _ref$PathComponent === void 0 ? 'path' : _ref$PathComponent,
    curve = _ref.curve,
    data = _ref.data,
    dataKey = _ref.dataKey,
    lineProps = _ref.lineProps,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onPointerMove = _ref.onPointerMove,
    onPointerOut = _ref.onPointerOut,
    onPointerUp = _ref.onPointerUp,
    onPointerDown = _ref.onPointerDown,
    _ref$enableEvents = _ref.enableEvents,
    enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents,
    _ref$renderLine = _ref.renderLine,
    renderLine = _ref$renderLine === void 0 ? true : _ref$renderLine,
    xAccessor = _ref.xAccessor,
    x0Accessor = _ref.x0Accessor,
    xScale = _ref.xScale,
    yAccessor = _ref.yAccessor,
    y0Accessor = _ref.y0Accessor,
    yScale = _ref.yScale,
    areaProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.default),
    colorScale = _useContext.colorScale,
    theme = _useContext.theme,
    horizontal = _useContext.horizontal;
  var getScaledX0 = (0, _react.useMemo)(function () {
    return x0Accessor ? (0, _getScaledValueFactory.default)(xScale, x0Accessor) : undefined;
  }, [xScale, x0Accessor]);
  var getScaledX = (0, _react.useMemo)(function () {
    return (0, _getScaledValueFactory.default)(xScale, xAccessor);
  }, [xScale, xAccessor]);
  var getScaledY0 = (0, _react.useMemo)(function () {
    return y0Accessor ? (0, _getScaledValueFactory.default)(yScale, y0Accessor) : undefined;
  }, [yScale, y0Accessor]);
  var getScaledY = (0, _react.useMemo)(function () {
    return (0, _getScaledValueFactory.default)(yScale, yAccessor);
  }, [yScale, yAccessor]);
  var isDefined = (0, _react.useCallback)(function (d) {
    return (0, _isValidNumber.default)(xScale(xAccessor(d))) && (0, _isValidNumber.default)(yScale(yAccessor(d)));
  }, [xScale, xAccessor, yScale, yAccessor]);
  var color = (_ref2 = (_colorScale = colorScale == null ? void 0 : colorScale(dataKey)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref2 : '#222';
  var ownEventSourceKey = _constants.AREASERIES_EVENT_SOURCE + "-" + dataKey;
  var eventEmitters = (0, _useSeriesEvents.default)({
    dataKey: dataKey,
    enableEvents: enableEvents,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    onPointerDown: onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [_constants.XYCHART_EVENT_SOURCE, ownEventSourceKey]
  });

  // accessor functions for the area generator
  var accessors = (0, _react.useMemo)(function () {
    var numericScaleBaseline = (0, _getScaleBaseline.default)(horizontal ? xScale : yScale);
    return horizontal ? {
      x0: getScaledX0 != null ? getScaledX0 : numericScaleBaseline,
      x1: getScaledX,
      y: getScaledY
    } : {
      x: getScaledX,
      y0: getScaledY0 != null ? getScaledY0 : numericScaleBaseline,
      y1: getScaledY
    };
  }, [xScale, yScale, horizontal, getScaledX, getScaledY, getScaledX0, getScaledY0]);

  // render invisible glyphs for focusing if onFocus/onBlur are defined
  var captureFocusEvents = Boolean(onFocus || onBlur);
  var renderGlyphs = (0, _react.useCallback)(function (_ref3) {
    var glyphs = _ref3.glyphs;
    return captureFocusEvents ? glyphs.map(function (glyph) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: glyph.key
      }, (0, _defaultRenderGlyph.default)(_extends({}, glyph, {
        color: 'transparent',
        onFocus: eventEmitters.onFocus,
        onBlur: eventEmitters.onBlur
      })));
    }) : null;
  }, [captureFocusEvents, eventEmitters.onFocus, eventEmitters.onBlur]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Area.default, _extends({}, accessors, areaProps, {
    curve: curve,
    defined: isDefined
  }), function (_ref4) {
    var path = _ref4.path;
    return /*#__PURE__*/_react.default.createElement(PathComponent, _extends({
      className: "visx-area",
      stroke: "transparent",
      fill: color,
      strokeLinecap: "round" // without this a datum surrounded by nulls will not be visible
    }, areaProps, {
      d: path(data) || ''
    }, eventEmitters));
  }), renderLine && /*#__PURE__*/_react.default.createElement(_LinePath.default, _extends({
    x: getScaledX,
    y: getScaledY,
    defined: isDefined,
    curve: curve
  }, lineProps), function (_ref5) {
    var path = _ref5.path;
    return /*#__PURE__*/_react.default.createElement(PathComponent, _extends({
      className: "visx-line",
      fill: "transparent",
      stroke: color,
      strokeWidth: 2,
      pointerEvents: "none",
      strokeLinecap: "round" // without this a datum surrounded by nulls will not be visible
    }, lineProps, {
      d: path(data) || ''
    }));
  }), captureFocusEvents && /*#__PURE__*/_react.default.createElement(_BaseGlyphSeries.BaseGlyphSeries, {
    dataKey: dataKey,
    data: data,
    xAccessor: xAccessor,
    yAccessor: yAccessor,
    xScale: xScale,
    yScale: yScale,
    renderGlyphs: renderGlyphs
  }));
}
BaseAreaSeries.propTypes = {
  renderLine: _propTypes.default.bool
};
var _default = (0, _withRegisteredData.default)(BaseAreaSeries);
exports.default = _default;