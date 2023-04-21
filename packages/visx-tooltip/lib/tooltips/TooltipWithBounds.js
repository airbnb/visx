"use strict";

exports.__esModule = true;
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _bounds = require("@visx/bounds");
var _Tooltip = _interopRequireWildcard(require("./Tooltip"));
var _TooltipPositionContext = require("../context/TooltipPositionContext");
var _excluded = ["children", "getRects", "left", "offsetLeft", "offsetTop", "parentRect", "rect", "style", "top", "unstyled", "nodeRef"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
    style = _ref$style === void 0 ? _Tooltip.defaultStyles : _ref$style,
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
  return /*#__PURE__*/_react.default.createElement(_Tooltip.default, _extends({
    ref: nodeRef,
    style: _extends({
      left: 0,
      top: 0,
      transform: transform
    }, !unstyled && style)
  }, otherProps), /*#__PURE__*/_react.default.createElement(_TooltipPositionContext.TooltipPositionProvider, {
    value: {
      isFlippedVertically: !placeTooltipUp,
      isFlippedHorizontally: !placeTooltipLeft
    }
  }, children));
}
TooltipWithBounds.propTypes = {
  nodeRef: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.object])
};
var _default = (0, _bounds.withBoundingRects)(TooltipWithBounds);
exports.default = _default;