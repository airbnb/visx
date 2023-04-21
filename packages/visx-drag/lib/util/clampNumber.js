"use strict";

exports.__esModule = true;
exports.default = clampNumber;
/** Clamps number within the inclusive lower and upper bounds. */
function clampNumber(number, lower, upper) {
  return Math.min(Math.max(number, lower), upper);
}