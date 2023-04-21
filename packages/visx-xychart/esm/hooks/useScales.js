function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createScale, scaleCanBeZeroed } from '@visx/scale';
import { extent as d3Extent } from 'd3-array';
import { useMemo } from 'react';
import isDiscreteScale from '../utils/isDiscreteScale';

/** A hook for creating memoized x- and y-scales. */
export default function useScales(_ref) {
  var dataRegistry = _ref.dataRegistry,
    xRange = _ref.xRange,
    xScaleConfig = _ref.xScaleConfig,
    yRange = _ref.yRange,
    yScaleConfig = _ref.yScaleConfig;
  // pull out memoization keys that are less likely to change
  var registryKeys = dataRegistry.keys();
  var xMin = xRange[0],
    xMax = xRange[1];
  var yMin = yRange[0],
    yMax = yRange[1];
  var memoizedXScale = useMemo(function () {
    var registryEntries = registryKeys.map(function (key) {
      return dataRegistry.get(key);
    });
    var xValues = registryEntries.reduce(function (combined, entry) {
      return entry ? combined.concat(entry.data.map(function (d) {
        return entry.xAccessor(d);
      })) : combined;
    }, []);

    // d3Extent scale returns NaN domain for empty arrays
    if (xValues.length === 0) return undefined;
    var xDomain = isDiscreteScale(xScaleConfig) ? xValues : d3Extent(xValues);
    var xScale = scaleCanBeZeroed(xScaleConfig) ? createScale(_extends({
      range: [xMin, xMax],
      domain: xDomain,
      zero: true
    }, xScaleConfig)) : createScale(_extends({
      range: [xMin, xMax],
      domain: xDomain
    }, xScaleConfig));

    // apply any scale updates from the registry
    registryEntries.forEach(function (entry) {
      if (entry != null && entry.xScale) xScale = entry.xScale(xScale);
    });
    return xScale;
  }, [dataRegistry, xScaleConfig, registryKeys, xMin, xMax]);

  // same for yScale. this logic is hard to apply generically because of the scale types / accessors
  var memoizedYScale = useMemo(function () {
    var registryEntries = registryKeys.map(function (key) {
      return dataRegistry.get(key);
    });
    var yValues = registryEntries.reduce(function (combined, entry) {
      return entry ? combined.concat(entry.data.map(function (d) {
        return entry.yAccessor(d);
      })) : combined;
    }, []);

    // d3Extent scale returns NaN domain for empty arrays
    if (yValues.length === 0) return undefined;
    var yDomain = isDiscreteScale(yScaleConfig) ? yValues : d3Extent(yValues);
    var yScale = scaleCanBeZeroed(yScaleConfig) ? createScale(_extends({
      range: [yMin, yMax],
      domain: yDomain,
      zero: true
    }, yScaleConfig)) : createScale(_extends({
      range: [yMin, yMax],
      domain: yDomain
    }, yScaleConfig));

    // apply any scale updates from the registry
    registryEntries.forEach(function (entry) {
      if (entry != null && entry.yScale) yScale = entry.yScale(yScale);
    });
    return yScale;
  }, [dataRegistry, yScaleConfig, registryKeys, yMin, yMax]);
  return {
    xScale: memoizedXScale,
    yScale: memoizedYScale
  };
}