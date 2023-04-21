"use strict";

exports.__esModule = true;
exports.default = getChildrenAndGrandchildrenWithProps;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** Returns whether the React.ReactNode has props (and therefore is an `Element` versus primitive type) */
function isChildWithProps(child) {
  return !!child && typeof child === 'object' && 'props' in child && child.props != null;
}

/**
 * Returns children and grandchildren of type React.ReactNode.
 * Flattens children one level to support React.Fragments and Array type children.
 */
function getChildrenAndGrandchildrenWithProps(children) {
  return _react.default.Children.toArray(children).flatMap(function (child) {
    if (typeof child === 'object' && 'props' in child && child.props.children) {
      return child.props.children;
    }
    return child;
  }).filter(function (child) {
    return isChildWithProps(child);
  });
}