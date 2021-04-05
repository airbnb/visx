"use strict";

exports.__esModule = true;
exports.default = getTickFormatter;

var _scale = require("@visx/scale");

/**
 * Returns a tick position for the given tick value
 */
function getTickFormatter(scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  var s = scale; // For point or band scales,
  // have to add offset to make the tick centered.

  if ('tickFormat' in s) {
    return s.tickFormat();
  }

  return _scale.toString;
}