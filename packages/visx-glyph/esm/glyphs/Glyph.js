import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
export default function Glyph(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-glyph', className),
    top: top,
    left: left
  }, children);
}
Glyph.propTypes = {
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  children: _pt.node
};