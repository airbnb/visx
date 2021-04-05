function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import BaseBarSeries from './private/BaseBarSeries';
import AnimatedBars from './private/AnimatedBars';
export default function AnimatedBarSeries(_ref) {
  var colorAccessor = _ref.colorAccessor,
      props = _objectWithoutPropertiesLoose(_ref, ["colorAccessor"]);

  return /*#__PURE__*/React.createElement(BaseBarSeries, _extends({}, props, {
    // @TODO currently generics for non-SeriesProps are not passed correctly in
    // withRegisteredData HOC
    colorAccessor: colorAccessor,
    BarsComponent: AnimatedBars
  }));
}