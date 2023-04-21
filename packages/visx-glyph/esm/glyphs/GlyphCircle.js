import _pt from "prop-types";
var _excluded = ["children", "className", "top", "left", "size"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import { symbol, symbolCircle } from 'd3-shape';
import Glyph from './Glyph';
export default function GlyphCircle(_ref) {
  var children = _ref.children,
    className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    size = _ref.size,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var path = symbol();
  path.type(symbolCircle);

  // TS can't differentiate the method overload here
  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends({
    className: cx('visx-glyph-circle', className),
    d: path() || ''
  }, restProps)));
}
GlyphCircle.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};