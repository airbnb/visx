import { useCallback, useState } from 'react';

const INITIAL_DIMENSIONS = {
  width: 0,
  height: 0,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

export type Dimensions = typeof INITIAL_DIMENSIONS;

/** A hook for accessing and setting memoized width, height, and margin chart dimensions. */
export default function useDimensions(
  initialDimensions?: Partial<Dimensions>,
): [Dimensions, (dims: Dimensions) => void] {
  const [dimensions, privateSetDimensions] = useState<Dimensions>({
    ...INITIAL_DIMENSIONS,
    ...initialDimensions,
  });

  // expose a setter with better memoization logic
  const publicSetDimensions = useCallback(
    (dims: Dimensions) => {
      if (
        dims.width !== dimensions.width ||
        dims.height !== dimensions.height ||
        dims.margin.left !== dimensions.margin.left ||
        dims.margin.right !== dimensions.margin.right ||
        dims.margin.top !== dimensions.margin.top ||
        dims.margin.bottom !== dimensions.margin.bottom
      ) {
        privateSetDimensions(dims);
      }
    },
    [
      dimensions.width,
      dimensions.height,
      dimensions.margin.left,
      dimensions.margin.right,
      dimensions.margin.bottom,
      dimensions.margin.top,
    ],
  );

  return [dimensions, publicSetDimensions];
}
