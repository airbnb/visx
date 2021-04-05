import { Bin as BinType, BinFunction, CountFunction } from './genBin';
export declare type Bin = BinType;
export interface Bins {
    bin: number;
    bins: Bin[];
}
export default function genBins(length: number, height: number, bin?: BinFunction, count?: CountFunction): Bins[];
//# sourceMappingURL=genBins.d.ts.map