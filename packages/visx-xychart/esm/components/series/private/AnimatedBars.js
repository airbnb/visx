function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import { animated, useTransition } from 'react-spring';
import { cleanColor, colorHasUrl } from '../../../utils/cleanColorString';
import getScaleBaseline from '../../../utils/getScaleBaseline';

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
      from: fromLeave,
      leave: fromLeave,
      enter: enterUpdate,
      update: enterUpdate
    };
  }, [scale, shouldAnimateX]);
}

export default function AnimatedBars(_ref4) {
  var bars = _ref4.bars,
      xScale = _ref4.xScale,
      yScale = _ref4.yScale,
      horizontal = _ref4.horizontal,
      rectProps = _objectWithoutPropertiesLoose(_ref4, ["bars", "xScale", "yScale", "horizontal"]);

  var animatedBars = useTransition(bars, function (bar) {
    return bar.key;
  }, _extends({
    unique: true
  }, useBarTransitionConfig({
    horizontal: horizontal,
    scale: horizontal ? xScale : yScale
  })));
  var isFocusable = Boolean(rectProps.onFocus || rectProps.onBlur);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    React.createElement(React.Fragment, null, animatedBars.map(function ( // @ts-ignore x/y aren't in react-spring types (which are HTML CSS properties)
    _ref5) {
      var item = _ref5.item,
          key = _ref5.key,
          _ref5$props = _ref5.props,
          x = _ref5$props.x,
          y = _ref5$props.y,
          width = _ref5$props.width,
          height = _ref5$props.height,
          fill = _ref5$props.fill,
          opacity = _ref5$props.opacity;
      return item == null || key == null ? null : /*#__PURE__*/React.createElement(animated.rect, _extends({
        key: key,
        tabIndex: isFocusable ? 0 : undefined,
        className: "visx-bar",
        x: x,
        y: y,
        width: width,
        height: height // use the item's fill directly if it's not animate-able
        ,
        fill: colorHasUrl(item.fill) ? item.fill : fill,
        opacity: opacity
      }, rectProps));
    }))
  );
}