var _excluded = ["children", "className", "innerRef", "x", "y", "width", "height", "radius", "all", "top", "bottom", "left", "right", "topLeft", "topRight", "bottomLeft", "bottomRight"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
/** Hook that returns a BarRounded path. */
export function useBarRoundedPath(_ref) {
  var all = _ref.all,
    bottom = _ref.bottom,
    bottomLeft = _ref.bottomLeft,
    bottomRight = _ref.bottomRight,
    height = _ref.height,
    left = _ref.left,
    radius = _ref.radius,
    right = _ref.right,
    top = _ref.top,
    topLeft = _ref.topLeft,
    topRight = _ref.topRight,
    width = _ref.width,
    x = _ref.x,
    y = _ref.y;
  topRight = all || top || right || topRight;
  bottomRight = all || bottom || right || bottomRight;
  bottomLeft = all || bottom || left || bottomLeft;
  topLeft = all || top || left || topLeft;

  // clamp radius to center of shortest side of the rect
  radius = Math.max(1, Math.min(radius, Math.min(width, height) / 2));
  var diameter = 2 * radius;
  var path = ("M" + (x + radius) + "," + y + " h" + (width - diameter) + "\n " + (topRight ? "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius : "h" + radius + "v" + radius) + "\n v" + (height - diameter) + "\n " + (bottomRight ? "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius : "v" + radius + "h" + -radius) + "\n h" + (diameter - width) + "\n " + (bottomLeft ? "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius : "h" + -radius + "v" + -radius) + "\n v" + (diameter - height) + "\n " + (topLeft ? "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius : "v" + -radius + "h" + radius) + "\nz").split('\n').join('');
  return path;
}
export default function BarRounded(_ref2) {
  var children = _ref2.children,
    className = _ref2.className,
    innerRef = _ref2.innerRef,
    x = _ref2.x,
    y = _ref2.y,
    width = _ref2.width,
    height = _ref2.height,
    radius = _ref2.radius,
    _ref2$all = _ref2.all,
    all = _ref2$all === void 0 ? false : _ref2$all,
    _ref2$top = _ref2.top,
    top = _ref2$top === void 0 ? false : _ref2$top,
    _ref2$bottom = _ref2.bottom,
    bottom = _ref2$bottom === void 0 ? false : _ref2$bottom,
    _ref2$left = _ref2.left,
    left = _ref2$left === void 0 ? false : _ref2$left,
    _ref2$right = _ref2.right,
    right = _ref2$right === void 0 ? false : _ref2$right,
    _ref2$topLeft = _ref2.topLeft,
    topLeft = _ref2$topLeft === void 0 ? false : _ref2$topLeft,
    _ref2$topRight = _ref2.topRight,
    topRight = _ref2$topRight === void 0 ? false : _ref2$topRight,
    _ref2$bottomLeft = _ref2.bottomLeft,
    bottomLeft = _ref2$bottomLeft === void 0 ? false : _ref2$bottomLeft,
    _ref2$bottomRight = _ref2.bottomRight,
    bottomRight = _ref2$bottomRight === void 0 ? false : _ref2$bottomRight,
    restProps = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var path = useBarRoundedPath({
    x: x,
    y: y,
    width: width,
    height: height,
    radius: radius,
    all: all,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    topLeft: topLeft,
    topRight: topRight,
    bottomLeft: bottomLeft,
    bottomRight: bottomRight
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends({
    ref: innerRef,
    className: cx('visx-bar-rounded', className),
    d: path
  }, restProps));
}