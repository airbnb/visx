"use strict";

exports.__esModule = true;
exports.default = AnimatedPath;

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _d3InterpolatePath = require("d3-interpolate-path");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function AnimatedPath(_ref) {
  var d = _ref.d,
      stroke = _ref.stroke,
      fill = _ref.fill,
      lineProps = _objectWithoutPropertiesLoose(_ref, ["d", "stroke", "fill"]);

  var previousD = (0, _react.useRef)(d); // updating d in quick succession will ruin the animation because startD === endD.
  // debounce it slightly

  var setPreviousD = (0, _react.useCallback)((0, _debounce.default)(function (dValue) {
    previousD.current = dValue;
  }, 50), [] // create once
  ); // react-spring cannot interpolate paths which have a differing number of points
  // flubber is the "best" at interpolating but assumes closed paths
  // d3-interpolate-path is better at interpolating extra/fewer points so we use that

  var interpolator = (0, _d3InterpolatePath.interpolatePath)(previousD.current, d);
  setPreviousD(d); // @ts-ignore t is not in CSSProperties

  var _useSpring = (0, _reactSpring.useSpring)({
    from: {
      t: 0
    },
    to: {
      t: 1
    },
    reset: true,
    delay: 50
  }),
      t = _useSpring.t;

  var tweened = (0, _reactSpring.useSpring)({
    stroke: stroke,
    fill: fill
  });
  return /*#__PURE__*/_react.default.createElement(_reactSpring.animated.path, _extends({
    className: "visx-path",
    d: t.interpolate(interpolator),
    stroke: tweened.stroke,
    fill: tweened.fill
  }, lineProps));
}