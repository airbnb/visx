import { randomNormal } from 'd3-random';
import getSeededRandom from './getSeededRandom';
var sqrt3 = Math.sqrt(3);

function range(length) {
  return new Array(length).fill(1);
}

export function genPointsRange(length, _ref, random) {
  var offsetX = _ref[0],
      offsetY = _ref[1],
      index = _ref[2];

  if (random === void 0) {
    random = randomNormal(0, 0.2);
  }

  return range(length).map(function () {
    return [random() + offsetX, random() + offsetY, index];
  });
}
export default function genPoints(count,
/** Optional random seed in the interval [0, 1). */
seed) {
  if (count === void 0) {
    count = 300;
  }

  if (seed === void 0) {
    seed = undefined;
  }

  var random = seed == null ? undefined : randomNormal.source(getSeededRandom(seed))(0, 0.2);
  return [].concat(genPointsRange(count, [sqrt3, 1, 0], random), genPointsRange(count, [-sqrt3, 1, 1], random), genPointsRange(count, [0, -1, 2], random));
}