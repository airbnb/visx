function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import AnimatedPath from './private/AnimatedPath';
import BaseAreaSeries from './private/BaseAreaSeries';
export default function AnimatedAreaSeries(props) {
  // @TODO currently generics for non-SeriesProps are not passed correctly in withRegisteredData HOC
  // @ts-expect-error
  return /*#__PURE__*/React.createElement(BaseAreaSeries, _extends({}, props, {
    PathComponent: AnimatedPath
  }));
}