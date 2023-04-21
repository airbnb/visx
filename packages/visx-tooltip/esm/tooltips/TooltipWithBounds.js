import _pt from "prop-types";
var _excluded = ["children", "getRects", "left", "offsetLeft", "offsetTop", "parentRect", "rect", "style", "top", "unstyled", "nodeRef"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import { withBoundingRects } from '@visx/bounds';
import Tooltip, { defaultStyles } from './Tooltip';
import { TooltipPositionProvider } from '../context/TooltipPositionContext';
function TooltipWithBounds(_ref) {
  var children = _ref.children,
    getRects = _ref.getRects,
    _ref$left = _ref.left,
    initialLeft = _ref$left === void 0 ? 0 : _ref$left,
    _ref$offsetLeft = _ref.offsetLeft,
    offsetLeft = _ref$offsetLeft === void 0 ? 10 : _ref$offsetLeft,
    _ref$offsetTop = _ref.offsetTop,
    offsetTop = _ref$offsetTop === void 0 ? 10 : _ref$offsetTop,
    parentBounds = _ref.parentRect,
    ownBounds = _ref.rect,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? defaultStyles : _ref$style,
    _ref$top = _ref.top,
    initialTop = _ref$top === void 0 ? 0 : _ref$top,
    _ref$unstyled = _ref.unstyled,
    unstyled = _ref$unstyled === void 0 ? false : _ref$unstyled,
    nodeRef = _ref.nodeRef,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var transform;
  var placeTooltipLeft = false;
  var placeTooltipUp = false;
  if (ownBounds && parentBounds) {
    var left = initialLeft;
    var top = initialTop;
    if (parentBounds.width) {
      var rightPlacementClippedPx = left + offsetLeft + ownBounds.width - parentBounds.width;
      var leftPlacementClippedPx = ownBounds.width - left - offsetLeft;
      placeTooltipLeft = rightPlacementClippedPx > 0 && rightPlacementClippedPx > leftPlacementClippedPx;
    } else {
      var _rightPlacementClippedPx = left + offsetLeft + ownBounds.width - window.innerWidth;
      var _leftPlacementClippedPx = ownBounds.width - left - offsetLeft;
      placeTooltipLeft = _rightPlacementClippedPx > 0 && _rightPlacementClippedPx > _leftPlacementClippedPx;
    }
    if (parentBounds.height) {
      var bottomPlacementClippedPx = top + offsetTop + ownBounds.height - parentBounds.height;
      var topPlacementClippedPx = ownBounds.height - top - offsetTop;
      placeTooltipUp = bottomPlacementClippedPx > 0 && bottomPlacementClippedPx > topPlacementClippedPx;
    } else {
      placeTooltipUp = top + offsetTop + ownBounds.height > window.innerHeight;
    }
    left = placeTooltipLeft ? left - ownBounds.width - offsetLeft : left + offsetLeft;
    top = placeTooltipUp ? top - ownBounds.height - offsetTop : top + offsetTop;
    left = Math.round(left);
    top = Math.round(top);
    transform = "translate(" + left + "px, " + top + "px)";
  }
  return /*#__PURE__*/React.createElement(Tooltip, _extends({
    ref: nodeRef,
    style: _extends({
      left: 0,
      top: 0,
      transform: transform
    }, !unstyled && style)
  }, otherProps), /*#__PURE__*/React.createElement(TooltipPositionProvider, {
    value: {
      isFlippedVertically: !placeTooltipUp,
      isFlippedHorizontally: !placeTooltipLeft
    }
  }, children));
}
TooltipWithBounds.propTypes = {
  nodeRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object])
};
export default withBoundingRects(TooltipWithBounds);