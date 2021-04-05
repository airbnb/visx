function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useRef } from 'react';
import { animated, useSpring } from 'react-spring'; // @ts-ignore no types

import { interpolatePath } from 'd3-interpolate-path';
import debounce from 'lodash/debounce';
export default function AnimatedPath(_ref) {
  var d = _ref.d,
      stroke = _ref.stroke,
      fill = _ref.fill,
      lineProps = _objectWithoutPropertiesLoose(_ref, ["d", "stroke", "fill"]);

  var previousD = useRef(d); // updating d in quick succession will ruin the animation because startD === endD.
  // debounce it slightly

  var setPreviousD = useCallback(debounce(function (dValue) {
    previousD.current = dValue;
  }, 50), [] // create once
  ); // react-spring cannot interpolate paths which have a differing number of points
  // flubber is the "best" at interpolating but assumes closed paths
  // d3-interpolate-path is better at interpolating extra/fewer points so we use that

  var interpolator = interpolatePath(previousD.current, d);
  setPreviousD(d); // @ts-ignore t is not in CSSProperties

  var _useSpring = useSpring({
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

  var tweened = useSpring({
    stroke: stroke,
    fill: fill
  });
  return /*#__PURE__*/React.createElement(animated.path, _extends({
    className: "visx-path",
    d: t.interpolate(interpolator),
    stroke: tweened.stroke,
    fill: tweened.fill
  }, lineProps));
}