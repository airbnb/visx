"use strict";

exports.__esModule = true;
exports.default = isChildWithProps;

/** Returns whether the React.ReactNode has props (and therefore is an `Element` versus primative type) */
function isChildWithProps(child) {
  return !!child && typeof child === 'object' && 'props' in child && child.props != null;
}