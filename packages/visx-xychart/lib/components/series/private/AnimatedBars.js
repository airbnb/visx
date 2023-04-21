"use strict";

exports.__esModule = true;
exports.default = AnimatedBars;
var _shape = require("@visx/shape");
var _react = _interopRequireWildcard(require("react"));
var _web = require("@react-spring/web");
var _cleanColorString = require("../../../utils/cleanColorString");
var _getScaleBaseline = _interopRequireDefault(require("../../../utils/getScaleBaseline"));
var _AnimatedPath = _interopRequireDefault(require("./AnimatedPath"));
var _excluded = ["bars", "xScale", "yScale", "horizontal", "radius", "radiusAll", "radiusTop", "radiusRight", "radiusBottom", "radiusLeft"],
  _excluded2 = ["bars", "xScale", "yScale", "horizontal", "radius", "radiusAll", "radiusTop", "radiusRight", "radiusBottom", "radiusLeft"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
    fill: (0, _cleanColorString.cleanColor)(fill),
    opacity: 1
  };
}
function useBarTransitionConfig(_ref2) {
  var scale = _ref2.scale,
    horizontal = _ref2.horizontal;
  var shouldAnimateX = !!horizontal;
  return (0, _react.useMemo)(function () {
    var scaleBaseline = (0, _getScaleBaseline.default)(scale);
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
        fill: (0, _cleanColorString.cleanColor)(fill),
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
    _react.default.createElement(_react.default.Fragment, null, bars.map(function (_ref5) {
      var key = _ref5.key,
        fill = _ref5.fill,
        x = _ref5.x,
        y = _ref5.y,
        width = _ref5.width,
        height = _ref5.height;
      return /*#__PURE__*/_react.default.createElement(_shape.BarRounded, {
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
        return /*#__PURE__*/_react.default.createElement(_AnimatedPath.default, _extends({
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
  var animatedBars = (0, _web.useTransition)(bars, _extends({}, useBarTransitionConfig({
    horizontal: horizontal,
    scale: horizontal ? xScale : yScale
  })));
  var isFocusable = Boolean(rectProps.onFocus || rectProps.onBlur);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, animatedBars(function ( // @ts-expect-error x/y aren't in react-spring types (which are HTML CSS properties)
  _ref8, item, _ref9) {
    var x = _ref8.x,
      y = _ref8.y,
      width = _ref8.width,
      height = _ref8.height,
      fill = _ref8.fill,
      opacity = _ref8.opacity;
    var key = _ref9.key;
    return item == null || key == null ? null : /*#__PURE__*/_react.default.createElement(_web.animated.rect, _extends({
      key: key,
      tabIndex: isFocusable ? 0 : undefined,
      className: "visx-bar",
      x: x,
      y: y,
      width: width,
      height: height
      // use the item's fill directly if it's not animate-able
      ,
      fill: (0, _cleanColorString.colorHasUrl)(item.fill) ? item.fill : fill,
      opacity: opacity
    }, rectProps));
  }));
}

/** Wrapper component which renders a Bars component depending on whether it needs rounded corners. */
function AnimatedBars(props) {
  return props.radius == null ? /*#__PURE__*/_react.default.createElement(AnimatedBarsUnrounded, props) : /*#__PURE__*/_react.default.createElement(AnimatedBarsRounded, _extends({}, props, {
    radius: props.radius
  }));
}