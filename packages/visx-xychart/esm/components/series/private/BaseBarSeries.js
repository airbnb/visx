import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, useCallback, useMemo } from 'react';
import DataContext from '../../../context/DataContext';
import withRegisteredData from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import isValidNumber from '../../../typeguards/isValidNumber';
import { BARSERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';

// Fallback bandwidth estimate assumes no missing data values (divides chart space by # datum)
var getFallbackBandwidth = function getFallbackBandwidth(fullBarWidth, barPadding) {
  return (// clamp padding to [0, 1], bar thickness = (1-padding) * availableSpace
    fullBarWidth * (1 - Math.min(1, Math.max(0, barPadding)))
  );
};

function BaseBarSeries(_ref) {
  var _ref2, _colorScale, _theme$colors;

  var BarsComponent = _ref.BarsComponent,
      _ref$barPadding = _ref.barPadding,
      barPadding = _ref$barPadding === void 0 ? 0.1 : _ref$barPadding,
      colorAccessor = _ref.colorAccessor,
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
      yScale = _ref.yScale;

  var _useContext = useContext(DataContext),
      colorScale = _useContext.colorScale,
      horizontal = _useContext.horizontal,
      theme = _useContext.theme,
      _useContext$innerWidt = _useContext.innerWidth,
      innerWidth = _useContext$innerWidt === void 0 ? 0 : _useContext$innerWidt,
      _useContext$innerHeig = _useContext.innerHeight,
      innerHeight = _useContext$innerHeig === void 0 ? 0 : _useContext$innerHeig;

  var getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  var getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  var scaleBandwidth = getScaleBandwidth(horizontal ? yScale : xScale);
  var barThickness = scaleBandwidth || getFallbackBandwidth((horizontal ? innerHeight : innerWidth) / data.length, barPadding);
  var xZeroPosition = useMemo(function () {
    return xScale ? getScaleBaseline(xScale) : 0;
  }, [xScale]);
  var yZeroPosition = useMemo(function () {
    return yScale ? getScaleBaseline(yScale) : 0;
  }, [yScale]);
  var color = (_ref2 = (_colorScale = colorScale == null ? void 0 : colorScale(dataKey)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref2 : '#222';
  var bars = useMemo(function () {
    var xOffset = horizontal ? 0 : -barThickness / 2;
    var yOffset = horizontal ? -barThickness / 2 : 0;
    return data.map(function (datum, index) {
      var _colorAccessor;

      var x = getScaledX(datum) + xOffset;
      if (!isValidNumber(x)) return null;
      var y = getScaledY(datum) + yOffset;
      if (!isValidNumber(y)) return null;
      var barLength = horizontal ? x - xZeroPosition : y - yZeroPosition;
      if (!isValidNumber(barLength)) return null;
      return {
        key: "" + index,
        x: horizontal ? xZeroPosition + Math.min(0, barLength) : x,
        y: horizontal ? y : yZeroPosition + Math.min(0, barLength),
        width: horizontal ? Math.abs(barLength) : barThickness,
        height: horizontal ? barThickness : Math.abs(barLength),
        fill: (_colorAccessor = colorAccessor == null ? void 0 : colorAccessor(datum, index)) != null ? _colorAccessor : color
      };
    }).filter(function (bar) {
      return bar;
    });
  }, [barThickness, color, colorAccessor, data, getScaledX, getScaledY, horizontal, xZeroPosition, yZeroPosition]);
  var ownEventSourceKey = BARSERIES_EVENT_SOURCE + "-" + dataKey;
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
  });
  return /*#__PURE__*/React.createElement("g", {
    className: "vx-bar-series"
  }, /*#__PURE__*/React.createElement(BarsComponent, _extends({
    bars: bars,
    horizontal: horizontal,
    xScale: xScale,
    yScale: yScale
  }, eventEmitters)));
}

BaseBarSeries.propTypes = {
  barPadding: _pt.number,
  colorAccessor: _pt.func
};
export default withRegisteredData(BaseBarSeries);