import { useContext, useEffect, useMemo } from 'react';
import { stack as d3stack } from 'd3-shape';
import stackOffset from '@visx/shape/lib/util/stackOffset';
import stackOrder from '@visx/shape/lib/util/stackOrder';
import { extent } from 'd3-array';
import DataContext from '../context/DataContext';
import getBarStackRegistryData from '../utils/getBarStackRegistryData';
import combineBarStackData from '../utils/combineBarStackData';
import getChildrenAndGrandchildrenWithProps from '../utils/getChildrenAndGrandchildrenWithProps';
export default function useStackedData(_ref) {
  var children = _ref.children,
    order = _ref.order,
    offset = _ref.offset;
  var _ref2 = useContext(DataContext),
    horizontal = _ref2.horizontal,
    registerData = _ref2.registerData,
    unregisterData = _ref2.unregisterData;

  // find series children
  // @TODO: memoization doesn't work well if at all for this
  var seriesChildren = useMemo(function () {
    return getChildrenAndGrandchildrenWithProps(children);
  }, [children]);

  // extract data keys from child series
  var dataKeys = useMemo(function () {
    return seriesChildren.filter(function (child) {
      return child.props.dataKey;
    }).map(function (child) {
      return child.props.dataKey;
    });
  }, [seriesChildren]);

  // group all child data by stack value { [x | y]: { [dataKey]: value } }
  // this format is needed by d3Stack
  var combinedData = useMemo(function () {
    return combineBarStackData(seriesChildren, horizontal);
  }, [horizontal, seriesChildren]);

  // stack data
  var stackedData = useMemo(function () {
    // automatically set offset to diverging if it's undefined and negative values are present
    var hasSomeNegativeValues = offset ? null : combinedData.some(function (d) {
      return d.negativeSum < 0;
    });
    var stack = d3stack();
    stack.keys(dataKeys);
    if (order) stack.order(stackOrder(order));
    if (offset || hasSomeNegativeValues) stack.offset(stackOffset(offset || 'diverging'));
    return stack(combinedData);
  }, [combinedData, dataKeys, order, offset]);

  // update the domain to account for the (directional) stacked value
  var comprehensiveDomain = useMemo(function () {
    return extent(stackedData.reduce(function (allDatum, stack) {
      stack.forEach(function (_ref3) {
        var min = _ref3[0],
          max = _ref3[1];
        allDatum.push(min);
        allDatum.push(max);
      });
      return allDatum;
    }, []));
  }, [stackedData]);

  // register all child data using the stack-transformed values
  useEffect(function () {
    var dataToRegister = getBarStackRegistryData(stackedData, comprehensiveDomain, horizontal);
    registerData(dataToRegister);

    // unregister data on unmount
    return function () {
      return unregisterData(dataKeys);
    };
  }, [dataKeys, comprehensiveDomain, horizontal, stackedData, registerData, unregisterData, seriesChildren]);
  return {
    seriesChildren: seriesChildren,
    dataKeys: dataKeys,
    stackedData: stackedData
  };
}