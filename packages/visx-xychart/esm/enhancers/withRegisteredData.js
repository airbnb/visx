function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';

/**
 * An HOC that handles registering the Series's data and renders the
 * `BaseSeriesComponent`
 * - only if x and y scales are available in context, and
 * - overrides `props.data/xAccessor/yAccessor` with the values from context.
 * This is useful for avoiding nasty syntax with undefined scales when using
 * hooks, and ensures that data + scales are always matched in the case of
 * prop changes, etc.
 */
export default function withRegisteredData(BaseSeriesComponent) {
  function WrappedComponent( // WrappedComponent props include SeriesProps with appropriate generics
  // and any props in BaseComponentProps that are not in WithRegisteredDataProps
  props) {
    var dataKey = props.dataKey,
        data = props.data,
        xAccessor = props.xAccessor,
        yAccessor = props.yAccessor;

    var _ref = useContext(DataContext),
        xScale = _ref.xScale,
        yScale = _ref.yScale,
        dataRegistry = _ref.dataRegistry;

    useEffect(function () {
      if (dataRegistry) dataRegistry.registerData({
        key: dataKey,
        data: data,
        xAccessor: xAccessor,
        yAccessor: yAccessor
      });
      return function () {
        return dataRegistry == null ? void 0 : dataRegistry.unregisterData(dataKey);
      };
    }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);
    var registryEntry = dataRegistry == null ? void 0 : dataRegistry.get(dataKey); // if scales or data are not available in context, render nothing

    if (!xScale || !yScale || !registryEntry) return null; // TODO coercion might be avoidable with variadic tuples in TS 4

    var BaseComponent = BaseSeriesComponent; // otherwise pass props + over-write data/accessors

    return /*#__PURE__*/React.createElement(BaseComponent, _extends({}, props, {
      xScale: xScale,
      yScale: yScale,
      data: registryEntry.data,
      xAccessor: registryEntry.xAccessor,
      yAccessor: registryEntry.yAccessor
    }));
  }

  return WrappedComponent;
}