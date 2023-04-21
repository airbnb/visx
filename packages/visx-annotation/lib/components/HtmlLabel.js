"use strict";

exports.__esModule = true;
exports.default = HtmlLabel;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));
var _group = require("@visx/group");
var _AnnotationContext = _interopRequireDefault(require("../context/AnnotationContext"));
var _LabelAnchorLine = _interopRequireDefault(require("./LabelAnchorLine"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var wrapperStyle = {
  display: 'inline-block'
};
function HtmlLabel(_ref) {
  var _ref$anchorLineStroke = _ref.anchorLineStroke,
    anchorLineStroke = _ref$anchorLineStroke === void 0 ? '#222' : _ref$anchorLineStroke,
    children = _ref.children,
    className = _ref.className,
    containerStyle = _ref.containerStyle,
    propsHorizontalAnchor = _ref.horizontalAnchor,
    resizeObserverPolyfill = _ref.resizeObserverPolyfill,
    _ref$showAnchorLine = _ref.showAnchorLine,
    showAnchorLine = _ref$showAnchorLine === void 0 ? true : _ref$showAnchorLine,
    propsVerticalAnchor = _ref.verticalAnchor,
    propsX = _ref.x,
    propsY = _ref.y;
  // we must measure the rendered title + subtitle to compute container height
  var _useMeasure = (0, _reactUseMeasure.default)({
      polyfill: resizeObserverPolyfill
    }),
    labelRef = _useMeasure[0],
    titleBounds = _useMeasure[1];
  var width = titleBounds.width,
    height = titleBounds.height;

  // if props are provided, they take precedence over context
  var _useContext = (0, _react.useContext)(_AnnotationContext.default),
    _useContext$x = _useContext.x,
    x = _useContext$x === void 0 ? 0 : _useContext$x,
    _useContext$y = _useContext.y,
    y = _useContext$y === void 0 ? 0 : _useContext$y,
    _useContext$dx = _useContext.dx,
    dx = _useContext$dx === void 0 ? 0 : _useContext$dx,
    _useContext$dy = _useContext.dy,
    dy = _useContext$dy === void 0 ? 0 : _useContext$dy;

  // offset container position based on horizontal + vertical anchor
  var horizontalAnchor = propsHorizontalAnchor || (Math.abs(dx) < Math.abs(dy) ? 'middle' : dx > 0 ? 'start' : 'end');
  var verticalAnchor = propsVerticalAnchor || (Math.abs(dx) > Math.abs(dy) ? 'middle' : dy > 0 ? 'start' : 'end');
  var containerCoords = (0, _react.useMemo)(function () {
    var adjustedX = propsX == null ? x + dx : propsX;
    var adjustedY = propsY == null ? y + dy : propsY;
    if (horizontalAnchor === 'middle') adjustedX -= width / 2;
    if (horizontalAnchor === 'end') adjustedX -= width;
    if (verticalAnchor === 'middle') adjustedY -= height / 2;
    if (verticalAnchor === 'end') adjustedY -= height;
    return {
      x: adjustedX,
      y: adjustedY
    };
  }, [propsX, x, dx, propsY, y, dy, horizontalAnchor, verticalAnchor, width, height]);
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: containerCoords.y,
    left: containerCoords.x,
    pointerEvents: "none",
    className: (0, _classnames.default)('visx-annotationlabel', className)
  }, /*#__PURE__*/_react.default.createElement("foreignObject", {
    width: width,
    height: height,
    overflow: "visible"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: labelRef,
    style: containerStyle ? _extends({}, wrapperStyle, containerStyle) : wrapperStyle
  }, children)), showAnchorLine && /*#__PURE__*/_react.default.createElement(_LabelAnchorLine.default, {
    anchorLineOrientation: Math.abs(dx) > Math.abs(dy) ? 'vertical' : 'horizontal',
    anchorLineStroke: anchorLineStroke,
    verticalAnchor: verticalAnchor,
    horizontalAnchor: horizontalAnchor,
    width: width,
    height: height
  }));
}
HtmlLabel.propTypes = {
  children: _propTypes.default.node
};