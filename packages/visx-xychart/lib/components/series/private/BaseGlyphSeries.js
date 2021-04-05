"use strict";

exports.__esModule = true;
exports.BaseGlyphSeries = BaseGlyphSeries;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _DataContext = _interopRequireDefault(require("../../../context/DataContext"));

var _withRegisteredData = _interopRequireDefault(require("../../../enhancers/withRegisteredData"));

var _getScaledValueFactory = _interopRequireDefault(require("../../../utils/getScaledValueFactory"));

var _isValidNumber = _interopRequireDefault(require("../../../typeguards/isValidNumber"));

var _constants = require("../../../constants");

var _useSeriesEvents = _interopRequireDefault(require("../../../hooks/useSeriesEvents"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function BaseGlyphSeries(_ref) {
  var _ref2, _colorScale, _theme$colors;

  var colorAccessor = _ref.colorAccessor,
      data = _ref.data,
      dataKey = _ref.dataKey,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      onPointerMove = _ref.onPointerMove,
      onPointerOut = _ref.onPointerOut,
      onPointerUp = _ref.onPointerUp,
      _ref$enableEvents = _ref.enableEvents,
      enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents,
      renderGlyphs = _ref.renderGlyphs,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 8 : _ref$size,
      xAccessor = _ref.xAccessor,
      xScale = _ref.xScale,
      yAccessor = _ref.yAccessor,
      yScale = _ref.yScale;

  var _useContext = (0, _react.useContext)(_DataContext.default),
      colorScale = _useContext.colorScale,
      theme = _useContext.theme,
      horizontal = _useContext.horizontal;

  var getScaledX = (0, _react.useCallback)((0, _getScaledValueFactory.default)(xScale, xAccessor), [xScale, xAccessor]);
  var getScaledY = (0, _react.useCallback)((0, _getScaledValueFactory.default)(yScale, yAccessor), [yScale, yAccessor]);
  var color = (_ref2 = (_colorScale = colorScale == null ? void 0 : colorScale(dataKey)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref2 : '#222';
  var ownEventSourceKey = _constants.GLYPHSERIES_EVENT_SOURCE + "-" + dataKey;
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
  var glyphs = (0, _react.useMemo)(function () {
    return data.map(function (datum, i) {
      var _colorAccessor;

      var x = getScaledX(datum);
      if (!(0, _isValidNumber.default)(x)) return null;
      var y = getScaledY(datum);
      if (!(0, _isValidNumber.default)(y)) return null;
      return {
        key: "" + i,
        x: x,
        y: y,
        color: (_colorAccessor = colorAccessor == null ? void 0 : colorAccessor(datum, i)) != null ? _colorAccessor : color,
        size: typeof size === 'function' ? size(datum) : size,
        datum: datum
      };
    }).filter(function (point) {
      return point;
    });
  }, [color, colorAccessor, data, getScaledX, getScaledY, size]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    _react.default.createElement(_react.default.Fragment, null, renderGlyphs(_extends({
      glyphs: glyphs,
      xScale: xScale,
      yScale: yScale,
      horizontal: horizontal
    }, eventEmitters)))
  );
}

BaseGlyphSeries.propTypes = {
  colorAccessor: _propTypes.default.func,
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  renderGlyphs: _propTypes.default.func.isRequired
};

var _default = (0, _withRegisteredData.default)(BaseGlyphSeries);

exports.default = _default;