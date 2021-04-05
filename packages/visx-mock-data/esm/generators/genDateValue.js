import getSeededRandom from './getSeededRandom';
export default function genDateValue(length,
/** Optional random seed in the interval [0, 1). */
seed,
/** Optional start time in ms UTC. */
startTimeMs) {
  var random = seed == null ? Math.random : getSeededRandom(seed);
  var startDateMs = startTimeMs == null ? Date.now() : new Date(startTimeMs).valueOf();
  return new Array(length).fill(1).map(function (_, idx) {
    return {
      date: new Date(startDateMs - idx * 3600000),
      // eslint-disable-next-line no-bitwise
      value: random() * 3000 | 0
    };
  });
}