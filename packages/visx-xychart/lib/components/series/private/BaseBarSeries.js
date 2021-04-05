"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _DataContext = _interopRequireDefault(require("../../../context/DataContext"));

var _withRegisteredData = _interopRequireDefault(require("../../../enhancers/withRegisteredData"));

var _getScaledValueFactory = _interopRequireDefault(require("../../../utils/getScaledValueFactory"));

var _getScaleBandwidth = _interopRequireDefault(require("../../../utils/getScaleBandwidth"));

var _getScaleBaseline = _interopRequireDefault(require("../../../utils/getScaleBaseline"));

var _isValidNumber = _interopRequireDefault(require("../../../typeguards/isValidNumber"));

var _constants = require("../../../constants");

var _useSeriesEvents = _interopRequireDefault(require("../../../hooks/useSeriesEvents"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Fallback bandwidth estimate assumes no missing data values (divides chart space by # datum)
var getFallbackBandwidth = function getFallbackBandwidth(fullBarWidth, barPadding) {
  return (// clamp padding to [0, 1], bar thickness = (1-padding) * availableSpace
    fullBarWidth * (1 - Math.min(1, Math.max(0, barPadding)))
  );
};

function BaseBarSeries(_ref) {
  var _ref2, _colorScale, _theme$colors;

  var BarsComponent = _ref.BarsComponent,
      _ref$barPadding = _ref.barPadding,
      barPadding = _ref$barPadding === void 0 ? 0.1 : _ref$barPadding,
      colorAccessor = _ref.colorAccessor,
      data = _ref.data,
      dataKey = _ref.dataKey,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      onPointerMove = _ref.onPointerMove,
      onPointerOut = _ref.onPointerOut,
      onPointerUp = _ref.onPointerUp,
      _ref$enableEvents = _ref.enableEvents,
      enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents,
      xAccessor = _ref.xAccessor,
      xScale = _ref.xScale,
      yAccessor = _ref.yAccessor,
      yScale = _ref.yScale;

  var _useContext = (0, _react.useContext)(_DataContext.default),
      colorScale = _useContext.colorScale,
      horizontal = _useContext.horizontal,
      theme = _useContext.theme,
      _useContext$innerWidt = _useContext.innerWidth,
      innerWidth = _useContext$innerWidt === void 0 ? 0 : _useContext$innerWidt,
      _useContext$innerHeig = _useContext.innerHeight,
      innerHeight = _useContext$innerHeig === void 0 ? 0 : _useContext$innerHeig;

  var getScaledX = (0, _react.useCallback)((0, _getScaledValueFactory.default)(xScale, xAccessor), [xScale, xAccessor]);
  var getScaledY = (0, _react.useCallback)((0, _getScaledValueFactory.default)(yScale, yAccessor), [yScale, yAccessor]);
  var scaleBandwidth = (0, _getScaleBandwidth.default)(horizontal ? yScale : xScale);
  var barThickness = scaleBandwidth || getFallbackBandwidth((horizontal ? innerHeight : innerWidth) / data.length, barPadding);
  var xZeroPosition = (0, _react.useMemo)(function () {
    return xScale ? (0, _getScaleBaseline.default)(xScale) : 0;
  }, [xScale]);
  var yZeroPosition = (0, _react.useMemo)(function () {
    return yScale ? (0, _getScaleBaseline.default)(yScale) : 0;
  }, [yScale]);
  var color = (_ref2 = (_colorScale = colorScale == null ? void 0 : colorScale(dataKey)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref2 : '#222';
  var bars = (0, _react.useMemo)(function () {
    var xOffset = horizontal ? 0 : -barThickness / 2;
    var yOffset = horizontal ? -barThickness / 2 : 0;
    return data.map(function (datum, index) {
      var _colorAccessor;

      var x = getScaledX(datum) + xOffset;
      if (!(0, _isValidNumber.default)(x)) return null;
      var y = getScaledY(datum) + yOffset;
      if (!(0, _isValidNumber.default)(y)) return null;
      var barLength = horizontal ? x - xZeroPosition : y - yZeroPosition;
      if (!(0, _isValidNumber.default)(barLength)) return null;
      return {
        key: "" + index,
        x: horizontal ? xZeroPosition + Math.min(0, barLength) : x,
        y: horizontal ? y : yZeroPosition + Math.min(0, barLength),
        width: horizontal ? Math.abs(barLength) : barThickness,
        height: horizontal ? barThickness : Math.abs(barLength),
        fill: (_colorAccessor = colorAccessor == null ? void 0 : colorAccessor(datum, index)) != null ? _colorAccessor : color
      };
    }).filter(function (bar) {
      return bar;
    });
  }, [barThickness, color, colorAccessor, data, getScaledX, getScaledY, horizontal, xZeroPosition, yZeroPosition]);
  var ownEventSourceKey = _constants.BARSERIES_EVENT_SOURCE + "-" + dataKey;
  var eventEmitters = (0, _useSeriesEvents.default)({
    dataKey: dataKey,
    enableEvents: enableEvents,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    source: ownEventSourceKey,
    allowedSources: [_constants.XYCHART_EVENT_SOURCE, ownEventSourceKey]
  });
  return /*#__PURE__*/_react.default.createElement("g", {
    className: "vx-bar-series"
  }, /*#__PURE__*/_react.default.createElement(BarsComponent, _extends({
    bars: bars,
    horizontal: horizontal,
    xScale: xScale,
    yScale: yScale
  }, eventEmitters)));
}

BaseBarSeries.propTypes = {
  barPadding: _propTypes.default.number,
  colorAccessor: _propTypes.default.func
};

var _default = (0, _withRegisteredData.default)(BaseBarSeries);

exports.default = _default;