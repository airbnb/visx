import genBin from './genBin';

export default function genBins(x, y, bin, count) {
  return Array(x)
    .fill(1)
    .reduce((data, d, i) => {
      return data.concat([
        {
          bin: i,
          bins: genBin(y, bin, count)
        }
      ]);
    }, []);
}
