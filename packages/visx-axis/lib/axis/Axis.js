"use strict";

exports.__esModule = true;
exports.default = Axis;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _group = require("@visx/group");
var _scale = require("@visx/scale");
var _AxisRenderer = _interopRequireDefault(require("./AxisRenderer"));
var _getTickPosition = _interopRequireDefault(require("../utils/getTickPosition"));
var _getTickFormatter = _interopRequireDefault(require("../utils/getTickFormatter"));
var _createPoint = _interopRequireDefault(require("../utils/createPoint"));
var _orientation = _interopRequireDefault(require("../constants/orientation"));
var _getAxisRangePaddingConfig = _interopRequireDefault(require("../utils/getAxisRangePaddingConfig"));
var _excluded = ["children", "axisClassName", "hideAxisLine", "hideTicks", "hideZero", "left", "numTicks", "orientation", "rangePadding", "scale", "tickFormat", "tickLength", "tickValues", "top"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Axis(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? _AxisRenderer.default : _ref$children,
    axisClassName = _ref.axisClassName,
    _ref$hideAxisLine = _ref.hideAxisLine,
    hideAxisLine = _ref$hideAxisLine === void 0 ? false : _ref$hideAxisLine,
    _ref$hideTicks = _ref.hideTicks,
    hideTicks = _ref$hideTicks === void 0 ? false : _ref$hideTicks,
    _ref$hideZero = _ref.hideZero,
    hideZero = _ref$hideZero === void 0 ? false : _ref$hideZero,
    _ref$left = _ref.left,
    left = _ref$left === void 0 ? 0 : _ref$left,
    _ref$numTicks = _ref.numTicks,
    numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? _orientation.default.bottom : _ref$orientation,
    _ref$rangePadding = _ref.rangePadding,
    rangePadding = _ref$rangePadding === void 0 ? 0 : _ref$rangePadding,
    scale = _ref.scale,
    tickFormat = _ref.tickFormat,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
    tickValues = _ref.tickValues,
    _ref$top = _ref.top,
    top = _ref$top === void 0 ? 0 : _ref$top,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var format = tickFormat != null ? tickFormat : (0, _getTickFormatter.default)(scale);
  var isLeft = orientation === _orientation.default.left;
  var isTop = orientation === _orientation.default.top;
  var horizontal = isTop || orientation === _orientation.default.bottom;
  var tickPosition = (0, _getTickPosition.default)(scale);
  var tickSign = isLeft || isTop ? -1 : 1;
  var range = scale.range();
  var rangePaddingConfig = (0, _getAxisRangePaddingConfig.default)(rangePadding);
  var axisFromPoint = (0, _createPoint.default)({
    x: Number(range[0]) + 0.5 - rangePaddingConfig.start,
    y: 0
  }, horizontal);
  var axisToPoint = (0, _createPoint.default)({
    x: Number(range[range.length - 1]) + 0.5 + rangePaddingConfig.end,
    y: 0
  }, horizontal);
  var filteredTickValues = (tickValues != null ? tickValues : (0, _scale.getTicks)(scale, numTicks)).filter(function (value) {
    return !hideZero || value !== 0 && value !== '0';
  }).map(function (value, index) {
    return {
      value: value,
      index: index
    };
  });
  var ticks = filteredTickValues.map(function (_ref2) {
    var value = _ref2.value,
      index = _ref2.index;
    var scaledValue = (0, _scale.coerceNumber)(tickPosition(value));
    return {
      value: value,
      index: index,
      from: (0, _createPoint.default)({
        x: scaledValue,
        y: 0
      }, horizontal),
      to: (0, _createPoint.default)({
        x: scaledValue,
        y: tickLength * tickSign
      }, horizontal),
      formattedValue: format(value, index, filteredTickValues)
    };
  });
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: (0, _classnames.default)('visx-axis', axisClassName),
    top: top,
    left: left
  }, children(_extends({}, restProps, {
    axisFromPoint: axisFromPoint,
    axisToPoint: axisToPoint,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    horizontal: horizontal,
    numTicks: numTicks,
    orientation: orientation,
    rangePadding: rangePadding,
    scale: scale,
    tickFormat: format,
    tickLength: tickLength,
    tickPosition: tickPosition,
    tickSign: tickSign,
    ticks: ticks
  })));
}