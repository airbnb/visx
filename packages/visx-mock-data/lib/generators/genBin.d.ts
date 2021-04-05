export declare type CountFunction = (idx: number, number: number) => number;
export declare type BinFunction = (idx: number, number?: number) => number;
export interface Bin {
    bin: number;
    count: number;
}
export default function genBin(length: number, bin?: BinFunction, count?: CountFunction): Bin[];
//# sourceMappingURL=genBin.d.ts.map