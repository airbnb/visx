import { BoxPlot, BinDatum } from '../types';

export default function computeStats(numericalArray: number[]) {
  const points = [...numericalArray].sort((a, b) => a - b);
  const sampleSize = points.length;
  const firstQuartile = points[Math.round(sampleSize / 4)];
  const thirdQuartile = points[Math.round((3 * sampleSize) / 4)];
  const IQR = thirdQuartile - firstQuartile;

  const min = firstQuartile - 1.5 * IQR;
  const max = thirdQuartile + 1.5 * IQR;

  const outliers = points.filter(p => p < min || p > max);
  const binWidth = 2 * IQR * (sampleSize - outliers.length) ** (-1 / 3);
  const binCount = Math.round((max - min) / binWidth);
  const actualBinWidth = (max - min) / binCount;

  const bins = new Array(binCount + 2).fill(0);
  const values = new Array(binCount + 2).fill(min);

  for (let i = 1; i <= binCount; i += 1) {
    values[i] += actualBinWidth * (i - 0.5);
  }

  values[values.length - 1] = max;

  points
    .filter(p => p >= min && p <= max)
    .forEach(p => {
      bins[Math.floor((p - min) / actualBinWidth) + 1] += 1;
    });

  const binData: BinDatum[] = values.map((v, i) => ({
    value: v,
    count: bins[i],
  }));

  const boxPlot: BoxPlot = {
    min,
    firstQuartile,
    median: points[Math.round(sampleSize / 2)],
    thirdQuartile,
    max,
    outliers,
  };

  return {
    boxPlot,
    binData,
  };
}
