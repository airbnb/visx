"use strict";

exports.__esModule = true;
exports.STACK_OFFSET_NAMES = exports.STACK_OFFSETS = void 0;
exports.default = stackOffset;
var _d3Shape = require("d3-shape");
var STACK_OFFSETS = {
  expand: _d3Shape.stackOffsetExpand,
  diverging: _d3Shape.stackOffsetDiverging,
  none: _d3Shape.stackOffsetNone,
  silhouette: _d3Shape.stackOffsetSilhouette,
  wiggle: _d3Shape.stackOffsetWiggle
};
exports.STACK_OFFSETS = STACK_OFFSETS;
var STACK_OFFSET_NAMES = Object.keys(STACK_OFFSETS);
exports.STACK_OFFSET_NAMES = STACK_OFFSET_NAMES;
function stackOffset(offset) {
  return offset && STACK_OFFSETS[offset] || STACK_OFFSETS.none;
}