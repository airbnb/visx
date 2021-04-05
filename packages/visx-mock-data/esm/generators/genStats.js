import { randomNormal } from 'd3-random';
var defaultRandom = randomNormal(4, 3);

var defaultRandomOffset = function defaultRandomOffset() {
  return Math.random() * 10;
};

var sampleSize = 1000;
export default function genStats(
/** Number of stat distributions to generate. */
number,
/** Function which generates a random number. */
random,
/** Function which generates an offset for each data point / invocation of random. */
randomOffset) {
  if (random === void 0) {
    random = defaultRandom;
  }

  if (randomOffset === void 0) {
    randomOffset = defaultRandomOffset;
  }

  var data = [];

  var _loop = function _loop(i) {
    var points = [];
    var offset = randomOffset();

    for (var j = 0; j < sampleSize; j += 1) {
      points.push(offset + random());
    }

    points.sort(function (a, b) {
      return a - b;
    });
    var firstQuartile = points[Math.round(sampleSize / 4)];
    var thirdQuartile = points[Math.round(3 * sampleSize / 4)];
    var IQR = thirdQuartile - firstQuartile;
    var min = firstQuartile - 1.5 * IQR;
    var max = thirdQuartile + 1.5 * IQR;
    var outliers = points.filter(function (p) {
      return p < min || p > max;
    });
    var binWidth = 2 * IQR * Math.pow(sampleSize - outliers.length, -1 / 3);
    var binNum = Math.round((max - min) / binWidth);
    var actualBinWidth = (max - min) / binNum;
    var bins = new Array(binNum + 2).fill(0);
    var values = new Array(binNum + 2).fill(min);

    for (var ii = 1; ii <= binNum; ii += 1) {
      values[ii] += actualBinWidth * (ii - 0.5);
    }

    values[values.length - 1] = max;
    points.filter(function (p) {
      return p >= min && p <= max;
    }).forEach(function (p) {
      bins[Math.floor((p - min) / actualBinWidth) + 1] += 1;
    });
    var binData = values.map(function (v, index) {
      return {
        value: v,
        count: bins[index]
      };
    });
    var boxPlot = {
      x: "Statistics " + i,
      min: min,
      firstQuartile: firstQuartile,
      median: points[Math.round(sampleSize / 2)],
      thirdQuartile: thirdQuartile,
      max: max,
      outliers: outliers
    };
    data.push({
      boxPlot: boxPlot,
      binData: binData
    });
  };

  for (var i = 0; i < number; i += 1) {
    _loop(i);
  }

  return data;
}