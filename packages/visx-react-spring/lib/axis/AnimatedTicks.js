"use strict";

exports.__esModule = true;
exports.default = AnimatedTicks;

var _react = _interopRequireDefault(require("react"));

var _reactSpring = require("react-spring");

var _classnames = _interopRequireDefault(require("classnames"));

var _orientation = _interopRequireDefault(require("@visx/axis/lib/constants/orientation"));

var _text = require("@visx/text");

var _useLineTransitionConfig = _interopRequireDefault(require("../spring-configs/useLineTransitionConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AnimatedTicks(_ref) {
  var hideTicks = _ref.hideTicks,
      horizontal = _ref.horizontal,
      orientation = _ref.orientation,
      scale = _ref.scale,
      tickClassName = _ref.tickClassName,
      allTickLabelProps = _ref.tickLabelProps,
      _ref$tickStroke = _ref.tickStroke,
      tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
      tickTransform = _ref.tickTransform,
      ticks = _ref.ticks,
      animationTrajectory = _ref.animationTrajectory;
  var animatedTicks = (0, _reactSpring.useTransition)(ticks, function (tick) {
    return "" + tick.value;
  }, (0, _useLineTransitionConfig.default)({
    scale: scale,
    animateXOrY: horizontal ? 'x' : 'y',
    animationTrajectory: animationTrajectory
  }));
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    _react.default.createElement(_react.default.Fragment, null, animatedTicks.map(function (_ref2, index) {
      var _ref3, _allTickLabelProps$in;

      var item = _ref2.item,
          key = _ref2.key,
          _ref2$props = _ref2.props,
          fromX = _ref2$props.fromX,
          toX = _ref2$props.toX,
          fromY = _ref2$props.fromY,
          toY = _ref2$props.toY,
          opacity = _ref2$props.opacity;
      var tickLabelProps = (_ref3 = (_allTickLabelProps$in = allTickLabelProps[index]) != null ? _allTickLabelProps$in : allTickLabelProps[0]) != null ? _ref3 : {};
      return item == null || key == null ? null : /*#__PURE__*/_react.default.createElement(_reactSpring.animated.g, {
        key: key,
        className: (0, _classnames.default)('visx-axis-tick', tickClassName),
        transform: tickTransform
      }, !hideTicks && /*#__PURE__*/_react.default.createElement(_reactSpring.animated.line, {
        x1: fromX,
        x2: toX,
        y1: fromY,
        y2: toY,
        stroke: tickStroke,
        strokeLinecap: "square",
        strokeOpacity: opacity
      }), /*#__PURE__*/_react.default.createElement(_reactSpring.animated.g, {
        key: index,
        transform: (0, _reactSpring.interpolate)([toX, toY], function (interpolatedX, interpolatedY) {
          var _tickLabelProps$fontS;

          return "translate(" + interpolatedX + "," + (interpolatedY + (orientation === _orientation.default.bottom && typeof tickLabelProps.fontSize === 'number' ? (_tickLabelProps$fontS = tickLabelProps.fontSize) != null ? _tickLabelProps$fontS : 10 : 0)) + ")";
        }),
        opacity: opacity
      }, /*#__PURE__*/_react.default.createElement(_text.Text, tickLabelProps, item == null ? void 0 : item.formattedValue)));
    }))
  );
}