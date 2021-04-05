import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
export default function DefaultNode(_ref) {
  var _ref$r = _ref.r,
      r = _ref$r === void 0 ? 15 : _ref$r,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? '#21D4FD' : _ref$fill,
      rest = _objectWithoutPropertiesLoose(_ref, ["r", "fill"]);

  return /*#__PURE__*/React.createElement("circle", _extends({
    r: r,
    fill: fill
  }, rest));
}
DefaultNode.propTypes = {
  cx: _pt.number,
  cy: _pt.number
};