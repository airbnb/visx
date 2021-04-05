"use strict";

exports.__esModule = true;
exports.default = genDateValue;

var _getSeededRandom = _interopRequireDefault(require("./getSeededRandom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genDateValue(length,
/** Optional random seed in the interval [0, 1). */
seed,
/** Optional start time in ms UTC. */
startTimeMs) {
  var random = seed == null ? Math.random : (0, _getSeededRandom.default)(seed);
  var startDateMs = startTimeMs == null ? Date.now() : new Date(startTimeMs).valueOf();
  return new Array(length).fill(1).map(function (_, idx) {
    return {
      date: new Date(startDateMs - idx * 3600000),
      // eslint-disable-next-line no-bitwise
      value: random() * 3000 | 0
    };
  });
}