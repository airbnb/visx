import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import VxAnimatedAxis from '@visx/react-spring/lib/axis/AnimatedAxis';
import BaseAxis from './BaseAxis';
export default function AnimatedAxis(props) {
  return /*#__PURE__*/React.createElement(BaseAxis, _extends({
    AxisComponent: VxAnimatedAxis
  }, props));
}