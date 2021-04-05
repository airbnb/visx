/// <reference types="lodash" />
export interface GetLineSegmentsConfig<Datum> {
    /** Full path `d` attribute to be broken up into `n` segments. */
    path: string;
    /**
     * Array of length `n`, where `n` is the number of resulting line segments.
     * For each segment of length `m`, `m / sampleRate` evenly spaced points will be returned.
     */
    segments: Datum[][];
    /** For each segment of length `m`, `m / sampleRate` evenly spaced points will be returned. */
    sampleRate?: number;
}
declare type LineSegments = {
    x: number;
    y: number;
}[][];
export declare function getSplitLineSegments<Datum>({ path, segments, sampleRate, }: GetLineSegmentsConfig<Datum>): LineSegments;
declare const _default: typeof getSplitLineSegments & import("lodash").MemoizedFunction;
export default _default;
//# sourceMappingURL=getSplitLineSegments.d.ts.map