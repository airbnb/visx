export interface BoxPlot {
    x: string;
    min: number;
    firstQuartile: number;
    median: number;
    thirdQuartile: number;
    max: number;
    outliers: number[];
}
export interface BinData {
    value: number;
    count: number;
}
export interface Stats {
    boxPlot: BoxPlot;
    binData: BinData[];
}
export default function genStats(
/** Number of stat distributions to generate. */
number: number, 
/** Function which generates a random number. */
random?: () => number, 
/** Function which generates an offset for each data point / invocation of random. */
randomOffset?: () => number): Stats[];
//# sourceMappingURL=genStats.d.ts.map