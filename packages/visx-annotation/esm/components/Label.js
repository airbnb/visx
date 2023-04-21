import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useMemo } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { Text, useText } from '@visx/text';
import useMeasure from 'react-use-measure';
import AnnotationContext from '../context/AnnotationContext';
import AnchorLine from './LabelAnchorLine';
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
export default function Label(_ref) {
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
  var _useMeasure = useMeasure({
      polyfill: resizeObserverPolyfill
    }),
    titleRef = _useMeasure[0],
    titleBounds = _useMeasure[1];
  var _useMeasure2 = useMeasure({
      polyfill: resizeObserverPolyfill
    }),
    subtitleRef = _useMeasure2[0],
    subtitleBounds = _useMeasure2[1];
  var padding = useMemo(function () {
    return getCompletePadding(backgroundPadding);
  }, [backgroundPadding]);

  // if props are provided, they take precedence over context
  var _useContext = useContext(AnnotationContext),
    _useContext$x = _useContext.x,
    x = _useContext$x === void 0 ? 0 : _useContext$x,
    _useContext$y = _useContext.y,
    y = _useContext$y === void 0 ? 0 : _useContext$y,
    _useContext$dx = _useContext.dx,
    dx = _useContext$dx === void 0 ? 0 : _useContext$dx,
    _useContext$dy = _useContext.dy,
    dy = _useContext$dy === void 0 ? 0 : _useContext$dy;
  var height = Math.floor(padding.top + padding.bottom + ((_titleBounds$height = titleBounds.height) != null ? _titleBounds$height : 0) + ((_subtitleBounds$heigh = subtitleBounds.height) != null ? _subtitleBounds$heigh : 0));
  var _useText = useText(_extends({
      children: title,
      verticalAnchor: 'start',
      capHeight: titleFontSize,
      fontSize: titleFontSize,
      fontWeight: titleFontWeight,
      fontFamily: titleProps == null ? void 0 : titleProps.fontFamily,
      width: maxWidth
    }, titleProps)),
    titleWordsByLine = _useText.wordsByLines;
  var _useText2 = useText(_extends({
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
  var containerCoords = useMemo(function () {
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
  var titleStyle = useMemo(function () {
    return {
      fontSize: titleFontSize,
      fontWeight: titleFontWeight,
      fontFamily: titleFontFamily
    };
  }, [titleFontSize, titleFontWeight, titleFontFamily]);
  var subtitleFontFamily = subtitleProps == null ? void 0 : subtitleProps.fontFamily;
  var subtitleStyle = useMemo(function () {
    return {
      fontSize: subtitleFontSize,
      fontWeight: subtitleFontWeight,
      fontFamily: subtitleFontFamily
    };
  }, [subtitleFontSize, subtitleFontWeight, subtitleFontFamily]);
  return !title && !subtitle ? null : /*#__PURE__*/React.createElement(Group, {
    top: containerCoords.y,
    left: containerCoords.x,
    pointerEvents: "none",
    className: cx('visx-annotationlabel', className),
    opacity: titleBounds.height === 0 && subtitleBounds.height === 0 ? 0 : 1
  }, showBackground && /*#__PURE__*/React.createElement("rect", _extends({
    className: "visx-annotationlabel-background",
    fill: backgroundFill,
    x: 0,
    y: 0,
    width: width,
    height: height
  }, backgroundProps)), showAnchorLine && /*#__PURE__*/React.createElement(AnchorLine, {
    anchorLineOrientation: Math.abs(dx) > Math.abs(dy) ? 'vertical' : 'horizontal',
    anchorLineStroke: anchorLineStroke,
    verticalAnchor: verticalAnchor,
    horizontalAnchor: horizontalAnchor,
    width: width,
    height: height
  }), title && /*#__PURE__*/React.createElement(Text, _extends({
    innerTextRef: titleRef,
    fill: fontColor,
    verticalAnchor: "start",
    x: padding.left + ((titleProps == null ? void 0 : titleProps.textAnchor) === 'middle' ? innerWidth / 2 : 0),
    y: padding.top,
    width: innerWidth,
    capHeight: titleFontSize // capHeight should match fontSize, used for first line line height
    ,
    style: titleStyle // used for size calculation
  }, titleProps), title), subtitle && /*#__PURE__*/React.createElement(Text, _extends({
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
  anchorLineStroke: _pt.string,
  backgroundFill: _pt.string,
  backgroundPadding: _pt.oneOfType([_pt.number, _pt.shape({
    top: _pt.number,
    right: _pt.number,
    bottom: _pt.number,
    left: _pt.number
  })]),
  className: _pt.string,
  fontColor: _pt.string,
  showAnchorLine: _pt.bool,
  showBackground: _pt.bool,
  subtitle: _pt.string,
  subtitleDy: _pt.number,
  title: _pt.string,
  width: _pt.number,
  maxWidth: _pt.number,
  x: _pt.number,
  y: _pt.number
};