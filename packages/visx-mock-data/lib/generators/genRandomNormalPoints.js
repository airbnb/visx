"use strict";

exports.__esModule = true;
exports.genPointsRange = genPointsRange;
exports.default = genPoints;

var _d3Random = require("d3-random");

var _getSeededRandom = _interopRequireDefault(require("./getSeededRandom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt3 = Math.sqrt(3);

function range(length) {
  return new Array(length).fill(1);
}

function genPointsRange(length, _ref, random) {
  var offsetX = _ref[0],
      offsetY = _ref[1],
      index = _ref[2];

  if (random === void 0) {
    random = (0, _d3Random.randomNormal)(0, 0.2);
  }

  return range(length).map(function () {
    return [random() + offsetX, random() + offsetY, index];
  });
}

function genPoints(count,
/** Optional random seed in the interval [0, 1). */
seed) {
  if (count === void 0) {
    count = 300;
  }

  if (seed === void 0) {
    seed = undefined;
  }

  var random = seed == null ? undefined : _d3Random.randomNormal.source((0, _getSeededRandom.default)(seed))(0, 0.2);
  return [].concat(genPointsRange(count, [sqrt3, 1, 0], random), genPointsRange(count, [-sqrt3, 1, 1], random), genPointsRange(count, [0, -1, 2], random));
}