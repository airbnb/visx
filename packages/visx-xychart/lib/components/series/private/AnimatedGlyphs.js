"use strict";

exports.__esModule = true;
exports.default = AnimatedGlyphs;
exports.useAnimatedGlyphsConfig = useAnimatedGlyphsConfig;
var _react = _interopRequireWildcard(require("react"));
var _web = require("@react-spring/web");
var _getScaleBaseline = _interopRequireDefault(require("../../../utils/getScaleBaseline"));
var _cleanColorString = require("../../../utils/cleanColorString");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
      },
      keys: function keys(glyph) {
        return glyph.key;
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
  var animatedGlyphs = (0, _web.useTransition)(glyphs, _extends({}, useAnimatedGlyphsConfig({
    xScale: xScale,
    yScale: yScale,
    horizontal: horizontal
  })));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, animatedGlyphs(function (_ref7, item, _ref8) {
    var x = _ref7.x,
      y = _ref7.y,
      color = _ref7.color,
      opacity = _ref7.opacity;
    var key = _ref8.key;
    return /*#__PURE__*/_react.default.createElement(_web.animated.g, {
      key: key,
      transform: (0, _web.to)([x, y], function (xVal, yVal) {
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
  }));
}