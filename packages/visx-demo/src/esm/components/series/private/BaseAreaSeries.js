import _pt from "prop-types";
var _excluded = ["PathComponent", "curve", "data", "dataKey", "lineProps", "onBlur", "onFocus", "onPointerMove", "onPointerOut", "onPointerUp", "onPointerDown", "enableEvents", "renderLine", "xAccessor", "x0Accessor", "xScale", "yAccessor", "y0Accessor", "yScale"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useCallback, useMemo } from 'react';
import Area from '@visx/shape/lib/shapes/Area';
import LinePath from '@visx/shape/lib/shapes/LinePath';
import DataContext from '../../../context/DataContext';
import withRegisteredData from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import isValidNumber from '../../../typeguards/isValidNumber';
import { AREASERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import { BaseGlyphSeries } from './BaseGlyphSeries';
import defaultRenderGlyph from './defaultRenderGlyph';
import useSeriesEvents from '../../../hooks/useSeriesEvents';
function BaseAreaSeries(_ref) {
  var _ref2, _colorScale, _theme$colors;
  var _ref$PathComponent = _ref.PathComponent,
    PathComponent = _ref$PathComponent === void 0 ? 'path' : _ref$PathComponent,
    curve = _ref.curve,
    data = _ref.data,
    dataKey = _ref.dataKey,
    lineProps = _ref.lineProps,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onPointerMove = _ref.onPointerMove,
    onPointerOut = _ref.onPointerOut,
    onPointerUp = _ref.onPointerUp,
    onPointerDown = _ref.onPointerDown,
    _ref$enableEvents = _ref.enableEvents,
    enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents,
    _ref$renderLine = _ref.renderLine,
    renderLine = _ref$renderLine === void 0 ? true : _ref$renderLine,
    xAccessor = _ref.xAccessor,
    x0Accessor = _ref.x0Accessor,
    xScale = _ref.xScale,
    yAccessor = _ref.yAccessor,
    y0Accessor = _ref.y0Accessor,
    yScale = _ref.yScale,
    areaProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    colorScale = _useContext.colorScale,
    theme = _useContext.theme,
    horizontal = _useContext.horizontal;
  var getScaledX0 = useMemo(function () {
    return x0Accessor ? getScaledValueFactory(xScale, x0Accessor) : undefined;
  }, [xScale, x0Accessor]);
  var getScaledX = useMemo(function () {
    return getScaledValueFactory(xScale, xAccessor);
  }, [xScale, xAccessor]);
  var getScaledY0 = useMemo(function () {
    return y0Accessor ? getScaledValueFactory(yScale, y0Accessor) : undefined;
  }, [yScale, y0Accessor]);
  var getScaledY = useMemo(function () {
    return getScaledValueFactory(yScale, yAccessor);
  }, [yScale, yAccessor]);
  var isDefined = useCallback(function (d) {
    return isValidNumber(xScale(xAccessor(d))) && isValidNumber(yScale(yAccessor(d)));
  }, [xScale, xAccessor, yScale, yAccessor]);
  var color = (_ref2 = (_colorScale = colorScale == null ? void 0 : colorScale(dataKey)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref2 : '#222';
  var ownEventSourceKey = AREASERIES_EVENT_SOURCE + "-" + dataKey;
  var eventEmitters = useSeriesEvents({
    dataKey: dataKey,
    enableEvents: enableEvents,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    onPointerDown: onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey]
  });

  // accessor functions for the area generator
  var accessors = useMemo(function () {
    var numericScaleBaseline = getScaleBaseline(horizontal ? xScale : yScale);
    return horizontal ? {
      x0: getScaledX0 != null ? getScaledX0 : numericScaleBaseline,
      x1: getScaledX,
      y: getScaledY
    } : {
      x: getScaledX,
      y0: getScaledY0 != null ? getScaledY0 : numericScaleBaseline,
      y1: getScaledY
    };
  }, [xScale, yScale, horizontal, getScaledX, getScaledY, getScaledX0, getScaledY0]);

  // render invisible glyphs for focusing if onFocus/onBlur are defined
  var captureFocusEvents = Boolean(onFocus || onBlur);
  var renderGlyphs = useCallback(function (_ref3) {
    var glyphs = _ref3.glyphs;
    return captureFocusEvents ? glyphs.map(function (glyph) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: glyph.key
      }, defaultRenderGlyph(_extends({}, glyph, {
        color: 'transparent',
        onFocus: eventEmitters.onFocus,
        onBlur: eventEmitters.onBlur
      })));
    }) : null;
  }, [captureFocusEvents, eventEmitters.onFocus, eventEmitters.onBlur]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Area, _extends({}, accessors, areaProps, {
    curve: curve,
    defined: isDefined
  }), function (_ref4) {
    var path = _ref4.path;
    return /*#__PURE__*/React.createElement(PathComponent, _extends({
      className: "visx-area",
      stroke: "transparent",
      fill: color,
      strokeLinecap: "round" // without this a datum surrounded by nulls will not be visible
    }, areaProps, {
      d: path(data) || ''
    }, eventEmitters));
  }), renderLine && /*#__PURE__*/React.createElement(LinePath, _extends({
    x: getScaledX,
    y: getScaledY,
    defined: isDefined,
    curve: curve
  }, lineProps), function (_ref5) {
    var path = _ref5.path;
    return /*#__PURE__*/React.createElement(PathComponent, _extends({
      className: "visx-line",
      fill: "transparent",
      stroke: color,
      strokeWidth: 2,
      pointerEvents: "none",
      strokeLinecap: "round" // without this a datum surrounded by nulls will not be visible
    }, lineProps, {
      d: path(data) || ''
    }));
  }), captureFocusEvents && /*#__PURE__*/React.createElement(BaseGlyphSeries, {
    dataKey: dataKey,
    data: data,
    xAccessor: xAccessor,
    yAccessor: yAccessor,
    xScale: xScale,
    yScale: yScale,
    renderGlyphs: renderGlyphs
  }));
}
BaseAreaSeries.propTypes = {
  renderLine: _pt.bool
};
export default withRegisteredData(BaseAreaSeries);