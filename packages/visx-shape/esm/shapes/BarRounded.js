function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
export default function BarRounded(_ref) {
  var className = _ref.className,
      innerRef = _ref.innerRef,
      x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      radius = _ref.radius,
      _ref$all = _ref.all,
      all = _ref$all === void 0 ? false : _ref$all,
      _ref$top = _ref.top,
      top = _ref$top === void 0 ? false : _ref$top,
      _ref$bottom = _ref.bottom,
      bottom = _ref$bottom === void 0 ? false : _ref$bottom,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? false : _ref$left,
      _ref$right = _ref.right,
      right = _ref$right === void 0 ? false : _ref$right,
      _ref$topLeft = _ref.topLeft,
      topLeft = _ref$topLeft === void 0 ? false : _ref$topLeft,
      _ref$topRight = _ref.topRight,
      topRight = _ref$topRight === void 0 ? false : _ref$topRight,
      _ref$bottomLeft = _ref.bottomLeft,
      bottomLeft = _ref$bottomLeft === void 0 ? false : _ref$bottomLeft,
      _ref$bottomRight = _ref.bottomRight,
      bottomRight = _ref$bottomRight === void 0 ? false : _ref$bottomRight,
      restProps = _objectWithoutPropertiesLoose(_ref, ["className", "innerRef", "x", "y", "width", "height", "radius", "all", "top", "bottom", "left", "right", "topLeft", "topRight", "bottomLeft", "bottomRight"]);

  topRight = all || top || right || topRight;
  bottomRight = all || bottom || right || bottomRight;
  bottomLeft = all || bottom || left || bottomLeft;
  topLeft = all || top || left || topLeft; // clamp radius to center of shortest side of the rect

  radius = Math.min(radius, Math.min(width, height) / 2);
  var diameter = 2 * radius;
  var path = ("M" + (x + radius) + "," + y + " h" + (width - diameter) + "\n " + (topRight ? "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius : "h" + radius + "v" + radius) + "\n v" + (height - diameter) + "\n " + (bottomRight ? "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius : "v" + radius + "h" + -radius) + "\n h" + (diameter - width) + "\n " + (bottomLeft ? "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius : "h" + -radius + "v" + -radius) + "\n v" + (diameter - height) + "\n " + (topLeft ? "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius : "v" + -radius + "h" + radius) + "\nz").split('\n').join('');
  return /*#__PURE__*/React.createElement("path", _extends({
    ref: innerRef,
    className: cx('visx-bar-rounded', className),
    d: path
  }, restProps));
}