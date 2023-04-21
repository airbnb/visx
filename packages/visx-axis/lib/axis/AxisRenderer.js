"use strict";

exports.__esModule = true;
exports.default = AxisRenderer;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _shape = require("@visx/shape");
var _text = require("@visx/text");
var _getLabelTransform = _interopRequireDefault(require("../utils/getLabelTransform"));
var _Ticks = _interopRequireDefault(require("./Ticks"));
var _ = require("..");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var defaultTextProps = {
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: '#222'
};
function AxisRenderer(_ref) {
  var axisFromPoint = _ref.axisFromPoint,
    axisLineClassName = _ref.axisLineClassName,
    axisToPoint = _ref.axisToPoint,
    hideAxisLine = _ref.hideAxisLine,
    hideTicks = _ref.hideTicks,
    horizontal = _ref.horizontal,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    labelClassName = _ref.labelClassName,
    _ref$labelOffset = _ref.labelOffset,
    labelOffset = _ref$labelOffset === void 0 ? 14 : _ref$labelOffset,
    _ref$labelProps = _ref.labelProps,
    labelProps = _ref$labelProps === void 0 ? defaultTextProps : _ref$labelProps,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? _.Orientation.bottom : _ref$orientation,
    scale = _ref.scale,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#222' : _ref$stroke,
    strokeDasharray = _ref.strokeDasharray,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
    tickClassName = _ref.tickClassName,
    tickComponent = _ref.tickComponent,
    tickLineProps = _ref.tickLineProps,
    tickLabelProps = _ref.tickLabelProps,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
    _ref$tickStroke = _ref.tickStroke,
    tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
    tickTransform = _ref.tickTransform,
    ticks = _ref.ticks,
    _ref$ticksComponent = _ref.ticksComponent,
    ticksComponent = _ref$ticksComponent === void 0 ? _Ticks.default : _ref$ticksComponent;
  var tickLabelPropsDefault = _extends({}, defaultTextProps, typeof tickLabelProps === 'object' ? tickLabelProps : null);
  // compute the max tick label size to compute label offset
  var allTickLabelProps = ticks.map(function (_ref2) {
    var value = _ref2.value,
      index = _ref2.index;
    return typeof tickLabelProps === 'function' ? tickLabelProps(value, index, ticks) : tickLabelPropsDefault;
  });
  var maxTickLabelFontSize = Math.max.apply(Math, [10].concat(allTickLabelProps.map(function (props) {
    return typeof props.fontSize === 'number' ? props.fontSize : 0;
  })));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, ticksComponent({
    hideTicks: hideTicks,
    horizontal: horizontal,
    orientation: orientation,
    scale: scale,
    tickClassName: tickClassName,
    tickComponent: tickComponent,
    tickLabelProps: allTickLabelProps,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    ticks: ticks,
    strokeWidth: strokeWidth,
    tickLineProps: tickLineProps
  }), !hideAxisLine && /*#__PURE__*/_react.default.createElement(_shape.Line, {
    className: (0, _classnames.default)('visx-axis-line', axisLineClassName),
    from: axisFromPoint,
    to: axisToPoint,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray
  }), label && /*#__PURE__*/_react.default.createElement(_text.Text, _extends({
    className: (0, _classnames.default)('visx-axis-label', labelClassName)
  }, (0, _getLabelTransform.default)({
    labelOffset: labelOffset,
    labelProps: labelProps,
    orientation: orientation,
    range: scale.range(),
    tickLabelFontSize: maxTickLabelFontSize,
    tickLength: tickLength
  }), labelProps), label));
}