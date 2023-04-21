"use strict";

exports.__esModule = true;
exports.default = Label;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _group = require("@visx/group");
var _text = require("@visx/text");
var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));
var _AnnotationContext = _interopRequireDefault(require("../context/AnnotationContext"));
var _LabelAnchorLine = _interopRequireDefault(require("./LabelAnchorLine"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_PADDING = {
  top: 12,
  right: 12,
  bottom: 12,
  left: 12
};
function getCompletePadding(padding) {
  if (typeof padding === 'undefined') return DEFAULT_PADDING;
  if (typeof padding === 'number') {
    return {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  return _extends({}, DEFAULT_PADDING, padding);
}
function Label(_ref) {
  var _titleBounds$height, _subtitleBounds$heigh, _titleBounds$height2;
  var _ref$anchorLineStroke = _ref.anchorLineStroke,
    anchorLineStroke = _ref$anchorLineStroke === void 0 ? '#222' : _ref$anchorLineStroke,
    _ref$backgroundFill = _ref.backgroundFill,
    backgroundFill = _ref$backgroundFill === void 0 ? '#eaeaea' : _ref$backgroundFill,
    backgroundPadding = _ref.backgroundPadding,
    backgroundProps = _ref.backgroundProps,
    className = _ref.className,
    _ref$fontColor = _ref.fontColor,
    fontColor = _ref$fontColor === void 0 ? '#222' : _ref$fontColor,
    propsHorizontalAnchor = _ref.horizontalAnchor,
    resizeObserverPolyfill = _ref.resizeObserverPolyfill,
    _ref$showAnchorLine = _ref.showAnchorLine,
    showAnchorLine = _ref$showAnchorLine === void 0 ? true : _ref$showAnchorLine,
    _ref$showBackground = _ref.showBackground,
    showBackground = _ref$showBackground === void 0 ? true : _ref$showBackground,
    subtitle = _ref.subtitle,
    _ref$subtitleDy = _ref.subtitleDy,
    subtitleDy = _ref$subtitleDy === void 0 ? 4 : _ref$subtitleDy,
    _ref$subtitleFontSize = _ref.subtitleFontSize,
    subtitleFontSize = _ref$subtitleFontSize === void 0 ? 12 : _ref$subtitleFontSize,
    _ref$subtitleFontWeig = _ref.subtitleFontWeight,
    subtitleFontWeight = _ref$subtitleFontWeig === void 0 ? 200 : _ref$subtitleFontWeig,
    subtitleProps = _ref.subtitleProps,
    title = _ref.title,
    _ref$titleFontSize = _ref.titleFontSize,
    titleFontSize = _ref$titleFontSize === void 0 ? 16 : _ref$titleFontSize,
    _ref$titleFontWeight = _ref.titleFontWeight,
    titleFontWeight = _ref$titleFontWeight === void 0 ? 600 : _ref$titleFontWeight,
    titleProps = _ref.titleProps,
    propsVerticalAnchor = _ref.verticalAnchor,
    propWidth = _ref.width,
    _ref$maxWidth = _ref.maxWidth,
    maxWidth = _ref$maxWidth === void 0 ? 125 : _ref$maxWidth,
    propsX = _ref.x,
    propsY = _ref.y;
  // we must measure the rendered html content to compute container height
  var _useMeasure = (0, _reactUseMeasure.default)({
      polyfill: resizeObserverPolyfill
    }),
    titleRef = _useMeasure[0],
    titleBounds = _useMeasure[1];
  var _useMeasure2 = (0, _reactUseMeasure.default)({
      polyfill: resizeObserverPolyfill
    }),
    subtitleRef = _useMeasure2[0],
    subtitleBounds = _useMeasure2[1];
  var padding = (0, _react.useMemo)(function () {
    return getCompletePadding(backgroundPadding);
  }, [backgroundPadding]);

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
  var height = Math.floor(padding.top + padding.bottom + ((_titleBounds$height = titleBounds.height) != null ? _titleBounds$height : 0) + ((_subtitleBounds$heigh = subtitleBounds.height) != null ? _subtitleBounds$heigh : 0));
  var _useText = (0, _text.useText)(_extends({
      children: title,
      verticalAnchor: 'start',
      capHeight: titleFontSize,
      fontSize: titleFontSize,
      fontWeight: titleFontWeight,
      fontFamily: titleProps == null ? void 0 : titleProps.fontFamily,
      width: maxWidth
    }, titleProps)),
    titleWordsByLine = _useText.wordsByLines;
  var _useText2 = (0, _text.useText)(_extends({
      children: subtitle,
      verticalAnchor: 'start',
      capHeight: subtitleFontSize,
      fontSize: subtitleFontSize,
      fontWeight: subtitleFontWeight,
      fontFamily: subtitleProps == null ? void 0 : subtitleProps.fontFamily,
      width: maxWidth
    }, subtitleProps)),
    subtitleWordsByLine = _useText2.wordsByLines;
  var titleMeasuredWidth = titleWordsByLine.reduce(function (maxTitleWidth, line) {
    var _line$width;
    return Math.max(maxTitleWidth, (_line$width = line.width) != null ? _line$width : 0);
  }, 0);
  var subtitleMeasuredWidth = subtitleWordsByLine.reduce(function (maxSubtitleWidth, line) {
    var _line$width2;
    return Math.max(maxSubtitleWidth, (_line$width2 = line.width) != null ? _line$width2 : 0);
  }, 0);
  var textMeasuredWidth = Math.ceil(Math.min(maxWidth, Math.max(titleMeasuredWidth, subtitleMeasuredWidth)));
  var measuredWidth = padding.right + padding.left + textMeasuredWidth;
  var width = propWidth != null ? propWidth : measuredWidth;
  var innerWidth = width - padding.left - padding.right;

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
  var titleFontFamily = titleProps == null ? void 0 : titleProps.fontFamily;
  var titleStyle = (0, _react.useMemo)(function () {
    return {
      fontSize: titleFontSize,
      fontWeight: titleFontWeight,
      fontFamily: titleFontFamily
    };
  }, [titleFontSize, titleFontWeight, titleFontFamily]);
  var subtitleFontFamily = subtitleProps == null ? void 0 : subtitleProps.fontFamily;
  var subtitleStyle = (0, _react.useMemo)(function () {
    return {
      fontSize: subtitleFontSize,
      fontWeight: subtitleFontWeight,
      fontFamily: subtitleFontFamily
    };
  }, [subtitleFontSize, subtitleFontWeight, subtitleFontFamily]);
  return !title && !subtitle ? null : /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: containerCoords.y,
    left: containerCoords.x,
    pointerEvents: "none",
    className: (0, _classnames.default)('visx-annotationlabel', className),
    opacity: titleBounds.height === 0 && subtitleBounds.height === 0 ? 0 : 1
  }, showBackground && /*#__PURE__*/_react.default.createElement("rect", _extends({
    className: "visx-annotationlabel-background",
    fill: backgroundFill,
    x: 0,
    y: 0,
    width: width,
    height: height
  }, backgroundProps)), showAnchorLine && /*#__PURE__*/_react.default.createElement(_LabelAnchorLine.default, {
    anchorLineOrientation: Math.abs(dx) > Math.abs(dy) ? 'vertical' : 'horizontal',
    anchorLineStroke: anchorLineStroke,
    verticalAnchor: verticalAnchor,
    horizontalAnchor: horizontalAnchor,
    width: width,
    height: height
  }), title && /*#__PURE__*/_react.default.createElement(_text.Text, _extends({
    innerTextRef: titleRef,
    fill: fontColor,
    verticalAnchor: "start",
    x: padding.left + ((titleProps == null ? void 0 : titleProps.textAnchor) === 'middle' ? innerWidth / 2 : 0),
    y: padding.top,
    width: innerWidth,
    capHeight: titleFontSize // capHeight should match fontSize, used for first line line height
    ,
    style: titleStyle // used for size calculation
  }, titleProps), title), subtitle && /*#__PURE__*/_react.default.createElement(_text.Text, _extends({
    innerTextRef: subtitleRef,
    fill: fontColor,
    verticalAnchor: "start",
    x: padding.left + ((subtitleProps == null ? void 0 : subtitleProps.textAnchor) === 'middle' ? innerWidth / 2 : 0),
    y: padding.top + ((_titleBounds$height2 = titleBounds.height) != null ? _titleBounds$height2 : 0),
    dy: title ? subtitleDy : 0,
    width: innerWidth,
    capHeight: subtitleFontSize // capHeight should match fontSize, used for first line line height
    ,
    style: subtitleStyle // used for size calculation
  }, subtitleProps), subtitle));
}
Label.propTypes = {
  anchorLineStroke: _propTypes.default.string,
  backgroundFill: _propTypes.default.string,
  backgroundPadding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    top: _propTypes.default.number,
    right: _propTypes.default.number,
    bottom: _propTypes.default.number,
    left: _propTypes.default.number
  })]),
  className: _propTypes.default.string,
  fontColor: _propTypes.default.string,
  showAnchorLine: _propTypes.default.bool,
  showBackground: _propTypes.default.bool,
  subtitle: _propTypes.default.string,
  subtitleDy: _propTypes.default.number,
  title: _propTypes.default.string,
  width: _propTypes.default.number,
  maxWidth: _propTypes.default.number,
  x: _propTypes.default.number,
  y: _propTypes.default.number
};