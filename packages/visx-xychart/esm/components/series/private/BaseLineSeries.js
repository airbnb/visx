import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, useCallback } from 'react';
import LinePath from '@visx/shape/lib/shapes/LinePath';
import DataContext from '../../../context/DataContext';
import withRegisteredData from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import isValidNumber from '../../../typeguards/isValidNumber';
import { LINESERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import { BaseGlyphSeries } from './BaseGlyphSeries';
import defaultRenderGlyph from './defaultRenderGlyph';
import useSeriesEvents from '../../../hooks/useSeriesEvents';

function BaseLineSeries(_ref) {
  var _ref2, _colorScale, _theme$colors;

  var curve = _ref.curve,
      data = _ref.data,
      dataKey = _ref.dataKey,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      onPointerMove = _ref.onPointerMove,
      onPointerOut = _ref.onPointerOut,
      onPointerUp = _ref.onPointerUp,
      _ref$enableEvents = _ref.enableEvents,
      enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents,
      xAccessor = _ref.xAccessor,
      xScale = _ref.xScale,
      yAccessor = _ref.yAccessor,
      yScale = _ref.yScale,
      _ref$PathComponent = _ref.PathComponent,
      PathComponent = _ref$PathComponent === void 0 ? 'path' : _ref$PathComponent,
      lineProps = _objectWithoutPropertiesLoose(_ref, ["curve", "data", "dataKey", "onBlur", "onFocus", "onPointerMove", "onPointerOut", "onPointerUp", "enableEvents", "xAccessor", "xScale", "yAccessor", "yScale", "PathComponent"]);

  var _useContext = useContext(DataContext),
      colorScale = _useContext.colorScale,
      theme = _useContext.theme;

  var getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  var getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  var isDefined = useCallback(function (d) {
    return isValidNumber(xScale(xAccessor(d))) && isValidNumber(yScale(yAccessor(d)));
  }, [xScale, xAccessor, yScale, yAccessor]);
  var color = (_ref2 = (_colorScale = colorScale == null ? void 0 : colorScale(dataKey)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref2 : '#222';
  var ownEventSourceKey = LINESERIES_EVENT_SOURCE + "-" + dataKey;
  var eventEmitters = useSeriesEvents({
    dataKey: dataKey,
    enableEvents: enableEvents,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey]
  }); // render invisible glyphs for focusing if onFocus/onBlur are defined

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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LinePath, _extends({
    x: getScaledX,
    y: getScaledY,
    defined: isDefined,
    curve: curve
  }, lineProps), function (_ref4) {
    var path = _ref4.path;
    return /*#__PURE__*/React.createElement(PathComponent, _extends({
      stroke: color,
      strokeWidth: 2,
      fill: "transparent",
      strokeLinecap: "round" // without this a datum surrounded by nulls will not be visible

    }, lineProps, {
      d: path(data) || ''
    }, eventEmitters));
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

export default withRegisteredData(BaseLineSeries);