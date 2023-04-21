import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint jsx-a11y/mouse-events-have-key-events: 'off', @typescript-eslint/no-explicit-any: 'off' */
import React, { useContext, useEffect } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import DataContext from '../context/DataContext';
import useEventEmitter from '../hooks/useEventEmitter';
import EventEmitterProvider from '../providers/EventEmitterProvider';
import TooltipContext from '../context/TooltipContext';
import TooltipProvider from '../providers/TooltipProvider';
import DataProvider from '../providers/DataProvider';
import useEventEmitters from '../hooks/useEventEmitters';
import { XYCHART_EVENT_SOURCE } from '../constants';
import useEventHandlers, { POINTER_EVENTS_ALL, POINTER_EVENTS_NEAREST } from '../hooks/useEventHandlers';
var DEFAULT_MARGIN = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};
var allowedEventSources = [XYCHART_EVENT_SOURCE];
export default function XYChart(props) {
  var _props$accessibilityL = props.accessibilityLabel,
    accessibilityLabel = _props$accessibilityL === void 0 ? 'XYChart' : _props$accessibilityL,
    _props$captureEvents = props.captureEvents,
    captureEvents = _props$captureEvents === void 0 ? true : _props$captureEvents,
    children = props.children,
    height = props.height,
    horizontal = props.horizontal,
    _props$margin = props.margin,
    margin = _props$margin === void 0 ? DEFAULT_MARGIN : _props$margin,
    onPointerMove = props.onPointerMove,
    onPointerOut = props.onPointerOut,
    onPointerUp = props.onPointerUp,
    onPointerDown = props.onPointerDown,
    _props$pointerEventsD = props.pointerEventsDataKey,
    pointerEventsDataKey = _props$pointerEventsD === void 0 ? 'nearest' : _props$pointerEventsD,
    theme = props.theme,
    width = props.width,
    xScale = props.xScale,
    yScale = props.yScale,
    resizeObserverPolyfillProp = props.resizeObserverPolyfill;
  var _useContext = useContext(DataContext),
    setDimensions = _useContext.setDimensions,
    resizeObserverPolyfill = _useContext.resizeObserverPolyfill;
  var tooltipContext = useContext(TooltipContext);
  var emit = useEventEmitter();

  // update dimensions in context
  useEffect(function () {
    if (setDimensions && width != null && height != null && width > 0 && height > 0) {
      setDimensions({
        width: width,
        height: height,
        margin: margin
      });
    }
  }, [setDimensions, width, height, margin]);
  var eventEmitters = useEventEmitters({
    source: XYCHART_EVENT_SOURCE
  });
  useEventHandlers({
    dataKey: pointerEventsDataKey === 'nearest' ? POINTER_EVENTS_NEAREST : POINTER_EVENTS_ALL,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    onPointerDown: onPointerDown,
    allowedSources: allowedEventSources
  });

  // if Context or dimensions are not available, wrap self in the needed providers
  if (!setDimensions) {
    if (!xScale || !yScale) {
      console.warn('[@visx/xychart] XYChart: When no DataProvider is available in context, you must pass xScale & yScale config to XYChart.');
      return null;
    }
    return /*#__PURE__*/React.createElement(DataProvider, {
      xScale: xScale,
      yScale: yScale,
      theme: theme,
      initialDimensions: {
        width: width,
        height: height,
        margin: margin
      },
      horizontal: horizontal,
      resizeObserverPolyfill: resizeObserverPolyfillProp
    }, /*#__PURE__*/React.createElement(XYChart, props));
  }
  if (width == null || height == null) {
    return /*#__PURE__*/React.createElement(ParentSize, {
      resizeObserverPolyfill: resizeObserverPolyfill
    }, function (dims) {
      return /*#__PURE__*/React.createElement(XYChart, _extends({}, props, {
        width: props.width == null ? dims.width : props.width,
        height: props.height == null ? dims.height : props.height
      }));
    });
  }
  if (tooltipContext == null) {
    return /*#__PURE__*/React.createElement(TooltipProvider, null, /*#__PURE__*/React.createElement(XYChart, props));
  }

  // EventEmitterProvider should be the last wrapper so we do not duplicate handlers
  if (emit == null) {
    return /*#__PURE__*/React.createElement(EventEmitterProvider, null, /*#__PURE__*/React.createElement(XYChart, props));
  }
  if (width <= 0 || height <= 0) {
    console.info('XYChart has a zero width or height, bailing', {
      width: width,
      height: height
    });
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    "aria-label": accessibilityLabel
  }, children, captureEvents && /*#__PURE__*/React.createElement("rect", _extends({
    x: margin.left,
    y: margin.top,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    fill: "transparent"
  }, eventEmitters)));
}
XYChart.propTypes = {
  accessibilityLabel: _pt.string,
  captureEvents: _pt.bool,
  width: _pt.number,
  height: _pt.number,
  children: _pt.node.isRequired,
  horizontal: _pt.oneOfType([_pt.bool, _pt.oneOf(['auto'])]),
  onPointerMove: _pt.func,
  onPointerOut: _pt.func,
  onPointerUp: _pt.func,
  onPointerDown: _pt.func,
  pointerEventsDataKey: _pt.oneOf(['all', 'nearest'])
};