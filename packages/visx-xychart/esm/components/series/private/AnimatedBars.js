var _excluded = ["bars", "xScale", "yScale", "horizontal", "radius", "radiusAll", "radiusTop", "radiusRight", "radiusBottom", "radiusLeft"],
  _excluded2 = ["bars", "xScale", "yScale", "horizontal", "radius", "radiusAll", "radiusTop", "radiusRight", "radiusBottom", "radiusLeft"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { BarRounded } from '@visx/shape';
import React, { useMemo } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { cleanColor, colorHasUrl } from '../../../utils/cleanColorString';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import AnimatedPath from './AnimatedPath';
function enterUpdate(_ref) {
  var x = _ref.x,
    y = _ref.y,
    width = _ref.width,
    height = _ref.height,
    fill = _ref.fill;
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    fill: cleanColor(fill),
    opacity: 1
  };
}
function useBarTransitionConfig(_ref2) {
  var scale = _ref2.scale,
    horizontal = _ref2.horizontal;
  var shouldAnimateX = !!horizontal;
  return useMemo(function () {
    var scaleBaseline = getScaleBaseline(scale);
    function fromLeave(_ref3) {
      var x = _ref3.x,
        y = _ref3.y,
        width = _ref3.width,
        height = _ref3.height,
        fill = _ref3.fill;
      return {
        x: shouldAnimateX ? scaleBaseline != null ? scaleBaseline : 0 : x,
        y: shouldAnimateX ? y : scaleBaseline != null ? scaleBaseline : 0,
        width: shouldAnimateX ? 0 : width,
        height: shouldAnimateX ? height : 0,
        fill: cleanColor(fill),
        opacity: 0
      };
    }
    return {
      unique: true,
      from: fromLeave,
      leave: fromLeave,
      enter: enterUpdate,
      update: enterUpdate,
      keys: function keys(bar) {
        return bar.key;
      }
    };
  }, [scale, shouldAnimateX]);
}
function AnimatedBarsRounded(_ref4) {
  var bars = _ref4.bars,
    xScale = _ref4.xScale,
    yScale = _ref4.yScale,
    horizontal = _ref4.horizontal,
    radius = _ref4.radius,
    radiusAll = _ref4.radiusAll,
    radiusTop = _ref4.radiusTop,
    radiusRight = _ref4.radiusRight,
    radiusBottom = _ref4.radiusBottom,
    radiusLeft = _ref4.radiusLeft,
    pathProps = _objectWithoutPropertiesLoose(_ref4, _excluded);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    React.createElement(React.Fragment, null, bars.map(function (_ref5) {
      var key = _ref5.key,
        fill = _ref5.fill,
        x = _ref5.x,
        y = _ref5.y,
        width = _ref5.width,
        height = _ref5.height;
      return /*#__PURE__*/React.createElement(BarRounded, {
        key: key,
        x: x,
        y: y,
        width: width,
        height: height,
        radius: radius,
        all: radiusAll,
        top: radiusTop,
        right: radiusRight,
        bottom: radiusBottom,
        left: radiusLeft
      }, function (_ref6) {
        var path = _ref6.path;
        return /*#__PURE__*/React.createElement(AnimatedPath, _extends({
          className: "visx-bar visx-bar-rounded",
          d: path,
          fill: fill
        }, pathProps));
      });
    }))
  );
}
function AnimatedBarsUnrounded(_ref7) {
  var bars = _ref7.bars,
    xScale = _ref7.xScale,
    yScale = _ref7.yScale,
    horizontal = _ref7.horizontal,
    radius = _ref7.radius,
    radiusAll = _ref7.radiusAll,
    radiusTop = _ref7.radiusTop,
    radiusRight = _ref7.radiusRight,
    radiusBottom = _ref7.radiusBottom,
    radiusLeft = _ref7.radiusLeft,
    rectProps = _objectWithoutPropertiesLoose(_ref7, _excluded2);
  var animatedBars = useTransition(bars, _extends({}, useBarTransitionConfig({
    horizontal: horizontal,
    scale: horizontal ? xScale : yScale
  })));
  var isFocusable = Boolean(rectProps.onFocus || rectProps.onBlur);
  return /*#__PURE__*/React.createElement(React.Fragment, null, animatedBars(function ( // @ts-expect-error x/y aren't in react-spring types (which are HTML CSS properties)
  _ref8, item, _ref9) {
    var x = _ref8.x,
      y = _ref8.y,
      width = _ref8.width,
      height = _ref8.height,
      fill = _ref8.fill,
      opacity = _ref8.opacity;
    var key = _ref9.key;
    return item == null || key == null ? null : /*#__PURE__*/React.createElement(animated.rect, _extends({
      key: key,
      tabIndex: isFocusable ? 0 : undefined,
      className: "visx-bar",
      x: x,
      y: y,
      width: width,
      height: height
      // use the item's fill directly if it's not animate-able
      ,
      fill: colorHasUrl(item.fill) ? item.fill : fill,
      opacity: opacity
    }, rectProps));
  }));
}

/** Wrapper component which renders a Bars component depending on whether it needs rounded corners. */
export default function AnimatedBars(props) {
  return props.radius == null ? /*#__PURE__*/React.createElement(AnimatedBarsUnrounded, props) : /*#__PURE__*/React.createElement(AnimatedBarsRounded, _extends({}, props, {
    radius: props.radius
  }));
}