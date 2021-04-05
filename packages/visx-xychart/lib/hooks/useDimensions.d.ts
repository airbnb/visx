declare const DEFAULT_DIMS: {
    width: number;
    height: number;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
};
export declare type Dimensions = typeof DEFAULT_DIMS;
/** A hook for accessing and setting memoized width, height, and margin chart dimensions. */
export default function useDimensions(initialDims?: Partial<Dimensions>): [Dimensions, (dims: Dimensions) => void];
export {};
//# sourceMappingURL=useDimensions.d.ts.map