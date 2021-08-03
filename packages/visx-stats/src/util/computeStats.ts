import { BoxPlot, BinDatum } from '../types';

function calcMedian(dataSet: number[]) {
  const half = Math.floor(dataSet.length / 2);
  if (dataSet.length % 2) return dataSet[half];
  return (dataSet[half - 1] + dataSet[half]) / 2;
}

export default function computeStats(numericalArray: number[]) {
  const points = [...numericalArray].sort((a, b) => a - b);
  const sampleSize = points.length;

  const median = calcMedian(points);

  // calculate median of first half i.e. firstQuartile
  const lowerHalfLength = Math.floor(sampleSize / 2);
  const lowerHalf = points.slice(0, lowerHalfLength);
  const firstQuartile = calcMedian(lowerHalf);

  // calculate median of first half i.e. secondQuartile
  const upperHalfLength = Math.ceil(sampleSize / 2);
  const upperHalf = points.slice(upperHalfLength);
  const thirdQuartile = calcMedian(upperHalf);
  const IQR = thirdQuartile - firstQuartile;

  let min = firstQuartile - 1.5 * IQR;
  let max = thirdQuartile + 1.5 * IQR;

  const outliers = points.filter((p) => p < min || p > max);
  if (outliers.length === 0) {
    min = Math.min(...points);
    max = Math.max(...points);
  }
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
    .filter((p) => p >= min && p <= max)
    .forEach((p) => {
      bins[Math.floor((p - min) / actualBinWidth) + 1] += 1;
    });

  const binData: BinDatum[] = values.map((v, i) => ({
    value: v,
    count: bins[i],
  }));

  const boxPlot: BoxPlot = {
    min,
    firstQuartile,
    median,
    thirdQuartile,
    max,
    outliers,
  };

  return {
    boxPlot,
    binData,
  };
}
