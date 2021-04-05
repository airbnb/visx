function calcMedian(dataSet) {
  var half = Math.floor(dataSet.length / 2);
  if (dataSet.length % 2) return dataSet[half];
  return (dataSet[half - 1] + dataSet[half]) / 2;
}

export default function computeStats(numericalArray) {
  var points = [].concat(numericalArray).sort(function (a, b) {
    return a - b;
  });
  var sampleSize = points.length;
  var median = calcMedian(points); // calculate median of first half i.e. firstQuartile

  var lowerHalfLength = Math.floor(sampleSize / 2);
  var lowerHalf = points.slice(0, lowerHalfLength);
  var firstQuartile = calcMedian(lowerHalf); // calculate median of first half i.e. secondQuartile

  var upperHalfLength = Math.ceil(sampleSize / 2);
  var upperHalf = points.slice(upperHalfLength);
  var thirdQuartile = calcMedian(upperHalf);
  var IQR = thirdQuartile - firstQuartile;
  var min = firstQuartile - 1.5 * IQR;
  var max = thirdQuartile + 1.5 * IQR;
  var outliers = points.filter(function (p) {
    return p < min || p > max;
  });

  if (outliers.length === 0) {
    min = Math.min.apply(Math, points);
    max = Math.max.apply(Math, points);
  }

  var binWidth = 2 * IQR * Math.pow(sampleSize - outliers.length, -1 / 3);
  var binCount = Math.round((max - min) / binWidth);
  var actualBinWidth = (max - min) / binCount;
  var bins = new Array(binCount + 2).fill(0);
  var values = new Array(binCount + 2).fill(min);

  for (var i = 1; i <= binCount; i += 1) {
    values[i] += actualBinWidth * (i - 0.5);
  }

  values[values.length - 1] = max;
  points.filter(function (p) {
    return p >= min && p <= max;
  }).forEach(function (p) {
    bins[Math.floor((p - min) / actualBinWidth) + 1] += 1;
  });
  var binData = values.map(function (v, i) {
    return {
      value: v,
      count: bins[i]
    };
  });
  var boxPlot = {
    min: min,
    firstQuartile: firstQuartile,
    median: median,
    thirdQuartile: thirdQuartile,
    max: max,
    outliers: outliers
  };
  return {
    boxPlot: boxPlot,
    binData: binData
  };
}