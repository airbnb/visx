"use strict";

exports.__esModule = true;
exports.default = getSeededRandom;

var _d3Random = require("d3-random");

// returns a seeded random number generator
function getSeededRandom(
/** Seed in the interval [0, 1). */
seed) {
  return (0, _d3Random.randomLcg)(seed);
}