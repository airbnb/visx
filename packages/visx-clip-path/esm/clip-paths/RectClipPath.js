import _pt from "prop-types";
var _excluded = ["id", "x", "y", "width", "height"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import ClipPath from './ClipPath';
export default function RectClipPath(_ref) {
  var id = _ref.id,
    _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 1 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 1 : _ref$height,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(ClipPath, {
    id: id
  }, /*#__PURE__*/React.createElement("rect", _extends({
    x: x,
    y: y,
    width: width,
    height: height
  }, restProps)));
}
RectClipPath.propTypes = {
  id: _pt.string.isRequired,
  x: _pt.oneOfType([_pt.string, _pt.number]),
  y: _pt.oneOfType([_pt.string, _pt.number]),
  width: _pt.oneOfType([_pt.string, _pt.number]),
  height: _pt.oneOfType([_pt.string, _pt.number])
};