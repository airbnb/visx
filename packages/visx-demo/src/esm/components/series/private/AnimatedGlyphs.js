function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useMemo } from 'react';
import { useTransition, animated, to } from '@react-spring/web';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import { cleanColor, colorHasUrl } from '../../../utils/cleanColorString';

/** Memoized useTransition config */
export function useAnimatedGlyphsConfig(_ref) {
  var xScale = _ref.xScale,
    yScale = _ref.yScale,
    horizontal = _ref.horizontal;
  var xScaleBaseline = getScaleBaseline(xScale);
  var yScaleBaseline = getScaleBaseline(yScale);
  return useMemo(function () {
    return {
      unique: true,
      from: function from(_ref2) {
        var x = _ref2.x,
          y = _ref2.y,
          color = _ref2.color;
        return {
          x: horizontal ? xScaleBaseline : x,
          y: horizontal ? y : yScaleBaseline,
          color: cleanColor(color),
          opacity: 0
        };
      },
      leave: function leave(_ref3) {
        var x = _ref3.x,
          y = _ref3.y,
          color = _ref3.color;
        return {
          x: horizontal ? xScaleBaseline : x,
          y: horizontal ? y : yScaleBaseline,
          color: cleanColor(color),
          opacity: 0
        };
      },
      enter: function enter(_ref4) {
        var x = _ref4.x,
          y = _ref4.y,
          color = _ref4.color;
        return {
          x: x,
          y: y,
          color: cleanColor(color),
          opacity: 1
        };
      },
      update: function update(_ref5) {
        var x = _ref5.x,
          y = _ref5.y,
          color = _ref5.color;
        return {
          x: x,
          y: y,
          color: cleanColor(color),
          opacity: 1
        };
      },
      keys: function keys(glyph) {
        return glyph.key;
      }
    };
  }, [xScaleBaseline, yScaleBaseline, horizontal]);
}
export default function AnimatedGlyphs(_ref6) {
  var renderGlyph = _ref6.renderGlyph,
    glyphs = _ref6.glyphs,
    horizontal = _ref6.horizontal,
    xScale = _ref6.xScale,
    yScale = _ref6.yScale,
    onBlur = _ref6.onBlur,
    onFocus = _ref6.onFocus,
    onPointerMove = _ref6.onPointerMove,
    onPointerOut = _ref6.onPointerOut,
    onPointerUp = _ref6.onPointerUp;
  var animatedGlyphs = useTransition(glyphs, _extends({}, useAnimatedGlyphsConfig({
    xScale: xScale,
    yScale: yScale,
    horizontal: horizontal
  })));
  return /*#__PURE__*/React.createElement(React.Fragment, null, animatedGlyphs(function (_ref7, item, _ref8) {
    var x = _ref7.x,
      y = _ref7.y,
      color = _ref7.color,
      opacity = _ref7.opacity;
    var key = _ref8.key;
    return /*#__PURE__*/React.createElement(animated.g, {
      key: key,
      transform: to([x, y], function (xVal, yVal) {
        return "translate(" + xVal + ", " + yVal + ")";
      }),
      color: color,
      opacity: opacity
    }, renderGlyph({
      key: key,
      datum: item.datum,
      index: item.index,
      x: 0,
      y: 0,
      size: item.size,
      // currentColor doesn't work with url-based colors (pattern, gradient)
      // otherwise currentColor allows us to animate the color of the <g /> element
      color: colorHasUrl(item.color) ? item.color : 'currentColor',
      onBlur: onBlur,
      onFocus: onFocus,
      onPointerMove: onPointerMove,
      onPointerOut: onPointerOut,
      onPointerUp: onPointerUp
    }));
  }));
}