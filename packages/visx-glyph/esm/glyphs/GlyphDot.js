import _pt from "prop-types";
var _excluded = ["top", "left", "className"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import Glyph from './Glyph';
export default function GlyphDot(_ref) {
  var _ref$top = _ref.top,
    top = _ref$top === void 0 ? 0 : _ref$top,
    _ref$left = _ref.left,
    left = _ref$left === void 0 ? 0 : _ref$left,
    className = _ref.className,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("circle", _extends({
    className: cx('visx-glyph-dot', className)
  }, restProps)));
}
GlyphDot.propTypes = {
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  r: _pt.number,
  cx: _pt.number,
  cy: _pt.number
};