import genBin, { Bin as BinType, BinFunction, CountFunction } from './genBin';

export type Bin = BinType;

export interface Bins {
  bin: number;
  bins: Bin[];
}

export default function genBins(
  length: number,
  height: number,
  bin?: BinFunction,
  count?: CountFunction,
): Bins[] {
  return new Array(length).fill(1).reduce((arr, _, i) => {
    return arr.concat([
      {
        bin: i,
        bins: genBin(height, bin, count),
      },
    ]);
  }, []);
}
