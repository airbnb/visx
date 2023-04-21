import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useMemo, useEffect, useCallback } from 'react';
import { scaleBand } from '@visx/scale';
import DataContext from '../../../context/DataContext';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import isValidNumber from '../../../typeguards/isValidNumber';
import { BARGROUP_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';
import findNearestGroupDatum from '../../../utils/findNearestGroupDatum';
import getChildrenAndGrandchildrenWithProps from '../../../utils/getChildrenAndGrandchildrenWithProps';
export default function BaseBarGroup(_ref) {
  var children = _ref.children,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 0.1 : _ref$padding,
    sortBars = _ref.sortBars,
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
    registerData = _ref2.registerData,
    unregisterData = _ref2.unregisterData,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale;
  var barSeriesChildren = useMemo(function () {
    return getChildrenAndGrandchildrenWithProps(children);
  }, [children]);

  // extract data keys from child series
  var dataKeys = useMemo(function () {
    return barSeriesChildren.map(function (child) {
      var _child$props$dataKey;
      return (_child$props$dataKey = child.props.dataKey) != null ? _child$props$dataKey : '';
    }).filter(function (key) {
      return key;
    });
  }, [barSeriesChildren]);

  // register all child data
  useEffect(function () {
    var dataToRegister = barSeriesChildren.map(function (child) {
      var _child$props = child.props,
        key = _child$props.dataKey,
        data = _child$props.data,
        xAccessor = _child$props.xAccessor,
        yAccessor = _child$props.yAccessor;
      return {
        key: key,
        data: data,
        xAccessor: xAccessor,
        yAccessor: yAccessor
      };
    });
    registerData(dataToRegister);
    return function () {
      return unregisterData(dataKeys);
    };
  }, [registerData, unregisterData, barSeriesChildren, dataKeys]);

  // create group scale
  var groupScale = useMemo(function () {
    return scaleBand({
      domain: sortBars ? [].concat(dataKeys).sort(sortBars) : dataKeys,
      range: [0, getScaleBandwidth(horizontal ? yScale : xScale)],
      padding: padding
    });
  }, [sortBars, dataKeys, xScale, yScale, horizontal, padding]);
  var findNearestDatum = useCallback(function (params) {
    return findNearestGroupDatum(params, groupScale, horizontal);
  }, [groupScale, horizontal]);
  var ownEventSourceKey = BARGROUP_EVENT_SOURCE + "-" + dataKeys.join('-') + "}";
  var eventEmitters = useSeriesEvents({
    dataKey: dataKeys,
    enableEvents: enableEvents,
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
  var xZeroPosition = useMemo(function () {
    return xScale ? getScaleBaseline(xScale) : 0;
  }, [xScale]);
  var yZeroPosition = useMemo(function () {
    return yScale ? getScaleBaseline(yScale) : 0;
  }, [yScale]);
  var registryEntries = dataKeys.map(function (key) {
    return dataRegistry.get(key);
  });

  // if scales and data are not available in the registry, bail
  if (registryEntries.some(function (entry) {
    return entry == null;
  }) || !xScale || !yScale || !colorScale) {
    return null;
  }
  var barThickness = getScaleBandwidth(groupScale);
  var barSeries = registryEntries.map(function (_ref3) {
    var _groupScale;
    var xAccessor = _ref3.xAccessor,
      yAccessor = _ref3.yAccessor,
      data = _ref3.data,
      key = _ref3.key;
    var getLength = function getLength(d) {
      var _xScale, _yScale;
      return horizontal ? ((_xScale = xScale(xAccessor(d))) != null ? _xScale : NaN) - xZeroPosition : ((_yScale = yScale(yAccessor(d))) != null ? _yScale : NaN) - yZeroPosition;
    };
    var getGroupPosition = horizontal ? function (d) {
      var _yScale2;
      return (_yScale2 = yScale(yAccessor(d))) != null ? _yScale2 : NaN;
    } : function (d) {
      var _xScale2;
      return (_xScale2 = xScale(xAccessor(d))) != null ? _xScale2 : NaN;
    };
    var withinGroupPosition = (_groupScale = groupScale(key)) != null ? _groupScale : 0;
    var getX = horizontal ? function (d) {
      return xZeroPosition + Math.min(0, getLength(d));
    } : function (d) {
      return getGroupPosition(d) + withinGroupPosition;
    };
    var getY = horizontal ? function (d) {
      return getGroupPosition(d) + withinGroupPosition;
    } : function (d) {
      return yZeroPosition + Math.min(0, getLength(d));
    };
    var getWidth = horizontal ? function (d) {
      return Math.abs(getLength(d));
    } : function () {
      return barThickness;
    };
    var getHeight = horizontal ? function () {
      return barThickness;
    } : function (d) {
      return Math.abs(getLength(d));
    };
    // get props from child BarSeries, if available
    var childBarSeries = barSeriesChildren.find(function (child) {
      return child.props.dataKey === key;
    });
    var _ref4 = (childBarSeries == null ? void 0 : childBarSeries.props) || {},
      colorAccessor = _ref4.colorAccessor,
      radius = _ref4.radius,
      radiusAll = _ref4.radiusAll,
      radiusBottom = _ref4.radiusBottom,
      radiusLeft = _ref4.radiusLeft,
      radiusRight = _ref4.radiusRight,
      radiusTop = _ref4.radiusTop;
    return {
      key: key,
      radius: radius,
      radiusAll: radiusAll,
      radiusBottom: radiusBottom,
      radiusLeft: radiusLeft,
      radiusRight: radiusRight,
      radiusTop: radiusTop,
      bars: data.map(function (bar, index) {
        var _colorAccessor;
        var barX = getX(bar);
        if (!isValidNumber(barX)) return null;
        var barY = getY(bar);
        if (!isValidNumber(barY)) return null;
        var barWidth = getWidth(bar);
        if (!isValidNumber(barWidth)) return null;
        var barHeight = getHeight(bar);
        if (!isValidNumber(barHeight)) return null;
        return {
          key: key + "-" + index,
          x: barX,
          y: barY,
          width: barWidth,
          height: barHeight,
          fill: (_colorAccessor = colorAccessor == null ? void 0 : colorAccessor(bar, index)) != null ? _colorAccessor : colorScale(key)
        };
      }).filter(function (bar) {
        return bar;
      })
    };
  });
  return /*#__PURE__*/React.createElement("g", {
    className: "visx-bar-group"
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
BaseBarGroup.propTypes = {
  children: _pt.node.isRequired,
  padding: _pt.number,
  sortBars: _pt.func
};