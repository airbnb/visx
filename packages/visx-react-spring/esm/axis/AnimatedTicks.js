import React from 'react';
import { animated, useTransition, interpolate } from 'react-spring';
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
      allTickLabelProps = _ref.tickLabelProps,
      _ref$tickStroke = _ref.tickStroke,
      tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
      tickTransform = _ref.tickTransform,
      ticks = _ref.ticks,
      animationTrajectory = _ref.animationTrajectory;
  var animatedTicks = useTransition(ticks, function (tick) {
    return "" + tick.value;
  }, useLineTransitionConfig({
    scale: scale,
    animateXOrY: horizontal ? 'x' : 'y',
    animationTrajectory: animationTrajectory
  }));
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    React.createElement(React.Fragment, null, animatedTicks.map(function (_ref2, index) {
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
      return item == null || key == null ? null : /*#__PURE__*/React.createElement(animated.g, {
        key: key,
        className: cx('visx-axis-tick', tickClassName),
        transform: tickTransform
      }, !hideTicks && /*#__PURE__*/React.createElement(animated.line, {
        x1: fromX,
        x2: toX,
        y1: fromY,
        y2: toY,
        stroke: tickStroke,
        strokeLinecap: "square",
        strokeOpacity: opacity
      }), /*#__PURE__*/React.createElement(animated.g, {
        key: index,
        transform: interpolate([toX, toY], function (interpolatedX, interpolatedY) {
          var _tickLabelProps$fontS;

          return "translate(" + interpolatedX + "," + (interpolatedY + (orientation === Orientation.bottom && typeof tickLabelProps.fontSize === 'number' ? (_tickLabelProps$fontS = tickLabelProps.fontSize) != null ? _tickLabelProps$fontS : 10 : 0)) + ")";
        }),
        opacity: opacity
      }, /*#__PURE__*/React.createElement(Text, tickLabelProps, item == null ? void 0 : item.formattedValue)));
    }))
  );
}