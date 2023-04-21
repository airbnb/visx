import _pt from "prop-types";
var _excluded = ["id", "cx", "cy", "r"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import ClipPath from './ClipPath';
/** ClipPath for clipping to the shape of a `<circle />`, pass any `<circle />` props you want. */
export default function CircleClipPath(_ref) {
  var id = _ref.id,
    cx = _ref.cx,
    cy = _ref.cy,
    r = _ref.r,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(ClipPath, {
    id: id
  }, /*#__PURE__*/React.createElement("circle", _extends({
    cx: cx,
    cy: cy,
    r: r
  }, restProps)));
}
CircleClipPath.propTypes = {
  id: _pt.string.isRequired,
  cx: _pt.oneOfType([_pt.string, _pt.number]),
  cy: _pt.oneOfType([_pt.string, _pt.number]),
  r: _pt.oneOfType([_pt.string, _pt.number])
};