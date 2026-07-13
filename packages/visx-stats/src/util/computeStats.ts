import type { BoxPlot, BinDatum } from '../types';

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
  // For n < 2 the half-slices are empty; fall back to the sample median.
  const firstQuartile = lowerHalf.length ? calcMedian(lowerHalf) : median;

  // calculate median of second half i.e. thirdQuartile
  const upperHalfLength = Math.ceil(sampleSize / 2);
  const upperHalf = points.slice(upperHalfLength);
  const thirdQuartile = upperHalf.length ? calcMedian(upperHalf) : median;
  const IQR = thirdQuartile - firstQuartile;

  let min = firstQuartile - 1.5 * IQR;
  let max = thirdQuartile + 1.5 * IQR;

  const outliers = points.filter((p) => p < min || p > max);
  if (outliers.length === 0) {
    min = Math.min(...points);
    max = Math.max(...points);
  }

  const inliers = points.filter((p) => p >= min && p <= max);
  const binWidth = 2 * IQR * inliers.length ** (-1 / 3);
  const range = max - min;

  // Freedman–Diaconis yields binWidth 0 (and binCount NaN) when IQR is 0 or the
  // inlier range collapses. Guard before allocating histogram arrays (#1772).
  let binData: BinDatum[];
  if (!Number.isFinite(binWidth) || binWidth <= 0 || !Number.isFinite(range) || range === 0) {
    binData = [
      { value: min, count: 0 },
      { value: min, count: inliers.length },
      { value: max, count: 0 },
    ];
  } else {
    const binCount = Math.max(1, Math.round(range / binWidth));
    const actualBinWidth = range / binCount;

    const bins = new Array(binCount + 2).fill(0);
    const values = new Array(binCount + 2).fill(min);

    for (let i = 1; i <= binCount; i += 1) {
      values[i] += actualBinWidth * (i - 0.5);
    }

    values[values.length - 1] = max;

    inliers.forEach((p) => {
      bins[Math.floor((p - min) / actualBinWidth) + 1] += 1;
    });

    binData = values.map((v, i) => ({
      value: v,
      count: bins[i],
    }));
  }

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
