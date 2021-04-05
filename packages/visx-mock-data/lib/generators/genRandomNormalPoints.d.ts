export declare type PointConfig = [number, number, number];
export declare type PointsRange = [number, number, number];
export declare function genPointsRange(length: number, [offsetX, offsetY, index]: PointConfig, random?: () => number): PointsRange[];
export default function genPoints(count?: number, 
/** Optional random seed in the interval [0, 1). */
seed?: number | undefined): PointsRange[];
//# sourceMappingURL=genRandomNormalPoints.d.ts.map