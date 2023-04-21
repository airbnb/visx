import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useCallback } from 'react';
import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';
import getBandwidth from '@visx/shape/lib/util/getBandwidth';
import DataContext from '../../../context/DataContext';
import isValidNumber from '../../../typeguards/isValidNumber';
import { getStackValue } from '../../../utils/combineBarStackData';
import { BARSTACK_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';
import findNearestStackDatum from '../../../utils/findNearestStackDatum';
import useStackedData from '../../../hooks/useStackedData';
function BaseBarStack(_ref) {
  var children = _ref.children,
    order = _ref.order,
    offset = _ref.offset,
    BarsComponent = _ref.BarsComponent,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onPointerMove = _ref.onPointerMove,
    onPointerOut = _ref.onPointerOut,
    onPointerUp = _ref.onPointerUp,
    onPointerDown = _ref.onPointerDown,
    _ref$enableEvents = _ref.enableEvents,
    enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents;
  var _ref2 = useContext(DataContext),
    colorScale = _ref2.colorScale,
    dataRegistry = _ref2.dataRegistry,
    horizontal = _ref2.horizontal,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale;
  var _useStackedData = useStackedData({
      children: children,
      order: order,
      offset: offset
    }),
    seriesChildren = _useStackedData.seriesChildren,
    dataKeys = _useStackedData.dataKeys,
    stackedData = _useStackedData.stackedData;

  // custom logic to find the nearest AreaStackDatum (context) and return the original Datum (props)
  var findNearestDatum = useCallback(function (params) {
    var _seriesChildren$find, _seriesChildren$find$;
    var childData = (_seriesChildren$find = seriesChildren.find(function (child) {
      return child.props.dataKey === params.dataKey;
    })) == null ? void 0 : (_seriesChildren$find$ = _seriesChildren$find.props) == null ? void 0 : _seriesChildren$find$.data;
    return childData ? findNearestStackDatum(params, childData, horizontal) : null;
  }, [seriesChildren, horizontal]);
  var ownEventSourceKey = BARSTACK_EVENT_SOURCE + "-" + dataKeys.join('-');
  var eventEmitters = useSeriesEvents({
    dataKey: dataKeys,
    enableEvents: enableEvents,
    // @ts-expect-error Datum input + return type are expected to be the same type but they differ for BarStack (registry data is StackedDatum, return type is user Datum)
    findNearestDatum: findNearestDatum,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    onPointerDown: onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey]
  });
  var registryEntries = dataKeys.map(function (key) {
    return dataRegistry.get(key);
  });

  // if scales and data are not available in the registry, bail
  if (registryEntries.some(function (entry) {
    return entry == null;
  }) || !xScale || !yScale || !colorScale) {
    return null;
  }
  var barThickness = getBandwidth(horizontal ? yScale : xScale);
  var halfBarThickness = barThickness / 2;
  var getWidth;
  var getHeight;
  var getX;
  var getY;
  if (horizontal) {
    getWidth = function getWidth(bar) {
      var _xScale, _xScale2;
      return ((_xScale = xScale(getSecondItem(bar))) != null ? _xScale : NaN) - ((_xScale2 = xScale(getFirstItem(bar))) != null ? _xScale2 : NaN);
    };
    getHeight = function getHeight() {
      return barThickness;
    };
    getX = function getX(bar) {
      return xScale(getFirstItem(bar));
    };
    getY = function getY(bar) {
      var _yScale;
      return 'bandwidth' in yScale ? yScale(getStackValue(bar.data)) : Math.max(((_yScale = yScale(getStackValue(bar.data))) != null ? _yScale : NaN) - halfBarThickness);
    };
  } else {
    getWidth = function getWidth() {
      return barThickness;
    };
    getHeight = function getHeight(bar) {
      var _yScale2, _yScale3;
      return ((_yScale2 = yScale(getFirstItem(bar))) != null ? _yScale2 : NaN) - ((_yScale3 = yScale(getSecondItem(bar))) != null ? _yScale3 : NaN);
    };
    getX = function getX(bar) {
      var _xScale3;
      return 'bandwidth' in xScale ? xScale(getStackValue(bar.data)) : Math.max(((_xScale3 = xScale(getStackValue(bar.data))) != null ? _xScale3 : NaN) - halfBarThickness);
    };
    getY = function getY(bar) {
      return yScale(getSecondItem(bar));
    };
  }
  var barSeries = stackedData.map(function (barStack, stackIndex) {
    var entry = dataRegistry.get(barStack.key);
    if (!entry) return null;

    // get props from child BarSeries, if available
    var childBarSeries = seriesChildren.find(function (child) {
      return child.props.dataKey === barStack.key;
    });
    var _ref3 = (childBarSeries == null ? void 0 : childBarSeries.props) || {},
      colorAccessor = _ref3.colorAccessor,
      radius = _ref3.radius,
      radiusAll = _ref3.radiusAll,
      radiusBottom = _ref3.radiusBottom,
      radiusLeft = _ref3.radiusLeft,
      radiusRight = _ref3.radiusRight,
      radiusTop = _ref3.radiusTop;
    return {
      key: barStack.key,
      radius: radius,
      radiusAll: radiusAll,
      radiusBottom: radiusBottom,
      radiusLeft: radiusLeft,
      radiusRight: radiusRight,
      radiusTop: radiusTop,
      bars: barStack.map(function (bar, index) {
        var _childBarSeries$props;
        var barX = getX(bar);
        if (!isValidNumber(barX)) return null;
        var barY = getY(bar);
        if (!isValidNumber(barY)) return null;
        var barWidth = getWidth(bar);
        if (!isValidNumber(barWidth)) return null;
        var barHeight = getHeight(bar);
        if (!isValidNumber(barHeight)) return null;
        var barSeriesDatum = colorAccessor ? childBarSeries == null ? void 0 : (_childBarSeries$props = childBarSeries.props) == null ? void 0 : _childBarSeries$props.data[index] : null;
        return {
          key: stackIndex + "-" + barStack.key + "-" + index,
          x: barX,
          y: barY,
          width: barWidth,
          height: barHeight,
          fill: barSeriesDatum && colorAccessor ? colorAccessor(barSeriesDatum, index) : colorScale(barStack.key)
        };
      }).filter(function (bar) {
        return bar;
      })
    };
  }).filter(function (series) {
    return series;
  });
  return /*#__PURE__*/React.createElement("g", {
    className: "visx-bar-stack"
  }, barSeries.map(function (series) {
    return series && /*#__PURE__*/React.createElement(BarsComponent, _extends({
      horizontal: horizontal,
      xScale: xScale,
      yScale: yScale
    }, series, eventEmitters, {
      key: series.key
    }));
  }));
}
BaseBarStack.propTypes = {
  children: _pt.oneOfType([_pt.element, _pt.arrayOf(_pt.element)]).isRequired
};
export default BaseBarStack;