import { useCallback, useState } from 'react';

const DEFAULT_DIMS = {
  width: 0,
  height: 0,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

export type Dimensions = typeof DEFAULT_DIMS;
type Margin = { top: number; right: number; bottom: number; left: number };
export type PartialDimensions = { width?: number; height?: number; margin?: Partial<Margin> };

/** A hook for accessing and setting memoized width, height, and margin chart dimensions. */
export default function useDimensions(
  initialDims: PartialDimensions = {},
): [Dimensions, (dims: PartialDimensions) => void] {
  const [dimensions, privateSetDimensions] = useState<Dimensions>({
    // using || instead of ?? to include 0 as falsy
    width: initialDims.width || DEFAULT_DIMS.width,
    height: initialDims.height || DEFAULT_DIMS.height,
    margin: {
      ...DEFAULT_DIMS.margin,
      ...(initialDims.margin ?? {}),
    },
  });

  // expose a setter with better memoization logic
  const publicSetDimensions = useCallback(
    (dims: PartialDimensions) => {
      if (
        dims.width !== dimensions.width ||
        dims.height !== dimensions.height ||
        dims.margin?.left !== dimensions.margin.left ||
        dims.margin?.right !== dimensions.margin.right ||
        dims.margin?.top !== dimensions.margin.top ||
        dims.margin?.bottom !== dimensions.margin.bottom
      ) {
        privateSetDimensions((previous) => {
          return {
            // using || instead of ?? to include 0 as falsy
            width: dims.width || previous.width,
            height: dims.height || previous.height,
            margin: {
              ...previous.margin,
              ...(dims.margin ?? {}),
            },
          };
        });
      }
    },
    [
      dimensions.width,
      dimensions.height,
      dimensions.margin?.left,
      dimensions.margin?.right,
      dimensions.margin?.bottom,
      dimensions.margin?.top,
    ],
  );

  return [dimensions, publicSetDimensions];
}
