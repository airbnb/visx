import _pt from "prop-types";
import React, { useContext, useMemo } from 'react';
import createOrdinalScale from '@visx/scale/lib/scales/ordinal';
import ThemeContext from '../context/ThemeContext';
import DataContext from '../context/DataContext';
import useDataRegistry from '../hooks/useDataRegistry';
import useDimensions from '../hooks/useDimensions';
import useScales from '../hooks/useScales';
import isDiscreteScale from '../utils/isDiscreteScale';
/** Props that can be passed to initialize/update the provider config. */

export default function DataProvider(_ref) {
  var initialDimensions = _ref.initialDimensions,
      propsTheme = _ref.theme,
      xScaleConfig = _ref.xScale,
      yScaleConfig = _ref.yScale,
      children = _ref.children,
      _ref$horizontal = _ref.horizontal,
      initialHorizontal = _ref$horizontal === void 0 ? 'auto' : _ref$horizontal;
  // `DataProvider` provides a theme so that `ThemeProvider` is not strictly needed.
  // `props.theme` takes precedent over `context.theme`, which has a default even if
  // a ThemeProvider is not present.
  var contextTheme = useContext(ThemeContext);
  var theme = propsTheme || contextTheme;

  var _useDimensions = useDimensions(initialDimensions),
      _useDimensions$ = _useDimensions[0],
      width = _useDimensions$.width,
      height = _useDimensions$.height,
      margin = _useDimensions$.margin,
      setDimensions = _useDimensions[1];

  var innerWidth = Math.max(0, width - margin.left - margin.right);
  var innerHeight = Math.max(0, height - margin.top - margin.bottom);
  var dataRegistry = useDataRegistry();

  var _useScales = useScales({
    dataRegistry: dataRegistry,
    xScaleConfig: xScaleConfig,
    yScaleConfig: yScaleConfig,
    xRange: [margin.left, Math.max(0, width - margin.right)],
    yRange: [Math.max(0, height - margin.bottom), margin.top]
  }),
      xScale = _useScales.xScale,
      yScale = _useScales.yScale;

  var registryKeys = dataRegistry.keys();
  var colorScale = useMemo(function () {
    return createOrdinalScale({
      domain: registryKeys,
      range: theme.colors
    });
  }, [registryKeys, theme.colors]);
  var horizontal = initialHorizontal === 'auto' ? isDiscreteScale(yScaleConfig) || yScaleConfig.type === 'time' || yScaleConfig.type === 'utc' : initialHorizontal;
  return /*#__PURE__*/React.createElement(DataContext.Provider, {
    // everything returned here should be memoized between renders
    // to avoid child re-renders
    value: {
      dataRegistry: dataRegistry,
      registerData: dataRegistry.registerData,
      unregisterData: dataRegistry.unregisterData,
      xScale: xScale,
      yScale: yScale,
      colorScale: colorScale,
      theme: theme,
      width: width,
      height: height,
      margin: margin,
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      setDimensions: setDimensions,
      horizontal: horizontal
    }
  }, children);
}
DataProvider.propTypes = {
  children: _pt.node.isRequired,
  horizontal: _pt.oneOfType([_pt.bool, _pt.oneOf(['auto'])])
};