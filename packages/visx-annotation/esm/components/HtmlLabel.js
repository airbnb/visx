import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useMemo } from 'react';
import cx from 'classnames';
import useMeasure from 'react-use-measure';
import { Group } from '@visx/group';
import AnnotationContext from '../context/AnnotationContext';
import AnchorLine from './LabelAnchorLine';
var wrapperStyle = {
  display: 'inline-block'
};
export default function HtmlLabel(_ref) {
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
  var _useMeasure = useMeasure({
      polyfill: resizeObserverPolyfill
    }),
    labelRef = _useMeasure[0],
    titleBounds = _useMeasure[1];
  var width = titleBounds.width,
    height = titleBounds.height;

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
  return /*#__PURE__*/React.createElement(Group, {
    top: containerCoords.y,
    left: containerCoords.x,
    pointerEvents: "none",
    className: cx('visx-annotationlabel', className)
  }, /*#__PURE__*/React.createElement("foreignObject", {
    width: width,
    height: height,
    overflow: "visible"
  }, /*#__PURE__*/React.createElement("div", {
    ref: labelRef,
    style: containerStyle ? _extends({}, wrapperStyle, containerStyle) : wrapperStyle
  }, children)), showAnchorLine && /*#__PURE__*/React.createElement(AnchorLine, {
    anchorLineOrientation: Math.abs(dx) > Math.abs(dy) ? 'vertical' : 'horizontal',
    anchorLineStroke: anchorLineStroke,
    verticalAnchor: verticalAnchor,
    horizontalAnchor: horizontalAnchor,
    width: width,
    height: height
  }));
}
HtmlLabel.propTypes = {
  children: _pt.node
};