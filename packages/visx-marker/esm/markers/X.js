function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Cross from './Cross';
export default function MarkerX(props) {
  return /*#__PURE__*/React.createElement(Cross, _extends({
    orient: 45
  }, props));
}