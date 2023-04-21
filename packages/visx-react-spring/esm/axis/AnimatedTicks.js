function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { animated, useTransition, to } from '@react-spring/web';
import cx from 'classnames';
import Orientation from '@visx/axis/lib/constants/orientation';
import { Text } from '@visx/text';
import useLineTransitionConfig from '../spring-configs/useLineTransitionConfig';
export default function AnimatedTicks(_ref) {
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
  var animatedTicks = useTransition(ticks, _extends({}, useLineTransitionConfig({
    scale: scale,
    animateXOrY: horizontal ? 'x' : 'y',
    animationTrajectory: animationTrajectory
  }), {
    keys: function keys(tick) {
      return "tick-" + tick.value + "-" + tick.index;
    }
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, animatedTicks(function (_ref2, item, _ref3, index) {
    var _ref4, _allTickLabelProps$in;
    var fromX = _ref2.fromX,
      toX = _ref2.toX,
      fromY = _ref2.fromY,
      toY = _ref2.toY,
      opacity = _ref2.opacity;
    var key = _ref3.key;
    var tickLabelProps = (_ref4 = (_allTickLabelProps$in = allTickLabelProps[index]) != null ? _allTickLabelProps$in : allTickLabelProps[0]) != null ? _ref4 : {};
    return item == null || key == null ? null : /*#__PURE__*/React.createElement(animated.g, {
      key: key,
      className: cx('visx-axis-tick', tickClassName),
      transform: tickTransform
    }, !hideTicks && /*#__PURE__*/React.createElement(animated.line, _extends({
      x1: fromX,
      x2: toX,
      y1: fromY,
      y2: toY,
      stroke: tickStroke,
      strokeLinecap: "square",
      strokeOpacity: opacity
    }, tickLineProps)), /*#__PURE__*/React.createElement(animated.g, {
      key: index,
      transform: to([toX, toY], function (interpolatedX, interpolatedY) {
        var _tickLabelProps$fontS;
        return "translate(" + interpolatedX + "," + (interpolatedY + (orientation === Orientation.bottom && typeof tickLabelProps.fontSize === 'number' ? (_tickLabelProps$fontS = tickLabelProps.fontSize) != null ? _tickLabelProps$fontS : 10 : 0)) + ")";
      }),
      opacity: opacity
    }, tickComponent ? tickComponent(_extends({}, tickLabelProps, {
      x: toX,
      y: toY,
      formattedValue: item == null ? void 0 : item.formattedValue
    })) : /*#__PURE__*/React.createElement(Text, tickLabelProps, item == null ? void 0 : item.formattedValue)));
  }));
}