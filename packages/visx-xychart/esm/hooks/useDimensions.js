import React, { useCallback, useState } from 'react';
var DEFAULT_DIMS = {
  width: 0,
  height: 0,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

/** A hook for accessing and setting memoized width, height, and margin chart dimensions. */
export default function useDimensions(initialDims) {
  var _useState = useState({
    width: (initialDims == null ? void 0 : initialDims.width) == null ? DEFAULT_DIMS.width : initialDims.width,
    height: (initialDims == null ? void 0 : initialDims.height) == null ? DEFAULT_DIMS.height : initialDims.height,
    margin: (initialDims == null ? void 0 : initialDims.margin) == null ? DEFAULT_DIMS.margin : initialDims.margin
  }),
      dimensions = _useState[0],
      privateSetDimensions = _useState[1]; // expose a setter with better memoization logic


  var publicSetDimensions = useCallback(function (dims) {
    if (dims.width !== dimensions.width || dims.height !== dimensions.height || dims.margin.left !== dimensions.margin.left || dims.margin.right !== dimensions.margin.right || dims.margin.top !== dimensions.margin.top || dims.margin.bottom !== dimensions.margin.bottom) {
      privateSetDimensions(dims);
    }
  }, [dimensions.width, dimensions.height, dimensions.margin.left, dimensions.margin.right, dimensions.margin.bottom, dimensions.margin.top]);
  return [dimensions, publicSetDimensions];
}