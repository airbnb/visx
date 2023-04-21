import genBin from './genBin';
export default function genBins(length, height, bin, count) {
  return new Array(length).fill(1).reduce(function (arr, _, i) {
    return arr.concat([{
      bin: i,
      bins: genBin(height, bin, count)
    }]);
  }, []);
}