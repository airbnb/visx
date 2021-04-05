"use strict";

exports.__esModule = true;
exports.useAnimatedGlyphsConfig = useAnimatedGlyphsConfig;
exports.default = AnimatedGlyphs;

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _getScaleBaseline = _interopRequireDefault(require("../../../utils/getScaleBaseline"));

var _cleanColorString = require("../../../utils/cleanColorString");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Memoized useTransition config */
function useAnimatedGlyphsConfig(_ref) {
  var xScale = _ref.xScale,
      yScale = _ref.yScale,
      horizontal = _ref.horizontal;
  var xScaleBaseline = (0, _getScaleBaseline.default)(xScale);
  var yScaleBaseline = (0, _getScaleBaseline.default)(yScale);
  return (0, _react.useMemo)(function () {
    return {
      unique: true,
      from: function from(_ref2) {
        var x = _ref2.x,
            y = _ref2.y,
            color = _ref2.color;
        return {
          x: horizontal ? xScaleBaseline : x,
          y: horizontal ? y : yScaleBaseline,
          color: (0, _cleanColorString.cleanColor)(color),
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
          color: (0, _cleanColorString.cleanColor)(color),
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
          color: (0, _cleanColorString.cleanColor)(color),
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
          color: (0, _cleanColorString.cleanColor)(color),
          opacity: 1
        };
      }
    };
  }, [xScaleBaseline, yScaleBaseline, horizontal]);
}

function AnimatedGlyphs(_ref6) {
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
  var animatedGlyphs = (0, _reactSpring.useTransition)(glyphs, function (glyph) {
    return glyph.key;
  }, useAnimatedGlyphsConfig({
    xScale: xScale,
    yScale: yScale,
    horizontal: horizontal
  }));
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    _react.default.createElement(_react.default.Fragment, null, animatedGlyphs.map(function ( // @ts-ignore x/y aren't in react-spring's CSSProperties
    _ref7) {
      var item = _ref7.item,
          key = _ref7.key,
          _ref7$props = _ref7.props,
          x = _ref7$props.x,
          y = _ref7$props.y,
          color = _ref7$props.color,
          opacity = _ref7$props.opacity;
      return /*#__PURE__*/_react.default.createElement(_reactSpring.animated.g, {
        key: key,
        transform: (0, _reactSpring.interpolate)([x, y], function (xVal, yVal) {
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
        color: (0, _cleanColorString.colorHasUrl)(item.color) ? item.color : 'currentColor',
        onBlur: onBlur,
        onFocus: onFocus,
        onPointerMove: onPointerMove,
        onPointerOut: onPointerOut,
        onPointerUp: onPointerUp
      }));
    }))
  );
}