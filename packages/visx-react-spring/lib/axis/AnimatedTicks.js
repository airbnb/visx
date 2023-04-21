"use strict";

exports.__esModule = true;
exports.default = AnimatedTicks;
var _react = _interopRequireDefault(require("react"));
var _web = require("@react-spring/web");
var _classnames = _interopRequireDefault(require("classnames"));
var _orientation = _interopRequireDefault(require("@visx/axis/lib/constants/orientation"));
var _text = require("@visx/text");
var _useLineTransitionConfig = _interopRequireDefault(require("../spring-configs/useLineTransitionConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function AnimatedTicks(_ref) {
  var hideTicks = _ref.hideTicks,
    horizontal = _ref.horizontal,
    orientation = _ref.orientation,
    scale = _ref.scale,
    tickClassName = _ref.tickClassName,
    tickComponent = _ref.tickComponent,
    allTickLabelProps = _ref.tickLabelProps,
    _ref$tickStroke = _ref.tickStroke,
    tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
    tickTransform = _ref.tickTransform,
    ticks = _ref.ticks,
    tickLineProps = _ref.tickLineProps,
    animationTrajectory = _ref.animationTrajectory;
  var animatedTicks = (0, _web.useTransition)(ticks, _extends({}, (0, _useLineTransitionConfig.default)({
    scale: scale,
    animateXOrY: horizontal ? 'x' : 'y',
    animationTrajectory: animationTrajectory
  }), {
    keys: function keys(tick) {
      return "tick-" + tick.value + "-" + tick.index;
    }
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, animatedTicks(function (_ref2, item, _ref3, index) {
    var _ref4, _allTickLabelProps$in;
    var fromX = _ref2.fromX,
      toX = _ref2.toX,
      fromY = _ref2.fromY,
      toY = _ref2.toY,
      opacity = _ref2.opacity;
    var key = _ref3.key;
    var tickLabelProps = (_ref4 = (_allTickLabelProps$in = allTickLabelProps[index]) != null ? _allTickLabelProps$in : allTickLabelProps[0]) != null ? _ref4 : {};
    return item == null || key == null ? null : /*#__PURE__*/_react.default.createElement(_web.animated.g, {
      key: key,
      className: (0, _classnames.default)('visx-axis-tick', tickClassName),
      transform: tickTransform
    }, !hideTicks && /*#__PURE__*/_react.default.createElement(_web.animated.line, _extends({
      x1: fromX,
      x2: toX,
      y1: fromY,
      y2: toY,
      stroke: tickStroke,
      strokeLinecap: "square",
      strokeOpacity: opacity
    }, tickLineProps)), /*#__PURE__*/_react.default.createElement(_web.animated.g, {
      key: index,
      transform: (0, _web.to)([toX, toY], function (interpolatedX, interpolatedY) {
        var _tickLabelProps$fontS;
        return "translate(" + interpolatedX + "," + (interpolatedY + (orientation === _orientation.default.bottom && typeof tickLabelProps.fontSize === 'number' ? (_tickLabelProps$fontS = tickLabelProps.fontSize) != null ? _tickLabelProps$fontS : 10 : 0)) + ")";
      }),
      opacity: opacity
    }, tickComponent ? tickComponent(_extends({}, tickLabelProps, {
      x: toX,
      y: toY,
      formattedValue: item == null ? void 0 : item.formattedValue
    })) : /*#__PURE__*/_react.default.createElement(_text.Text, tickLabelProps, item == null ? void 0 : item.formattedValue)));
  }));
}