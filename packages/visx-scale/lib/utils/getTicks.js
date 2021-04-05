"use strict";

exports.__esModule = true;
exports.default = getTicks;

function getTicks(scale, numTicks) {
  // Because `Scale` is generic type which maybe a subset of AnyD3Scale
  // that may not have `ticks` field,
  // TypeScript will not let us do the `'ticks' in scale` check directly.
  // Have to manually cast and expand type first.
  var s = scale;

  if ('ticks' in s) {
    return s.ticks(numTicks);
  }

  return s.domain().filter(function (_, index, arr) {
    return numTicks == null || arr.length <= numTicks || index % Math.round((arr.length - 1) / numTicks) === 0;
  });
}