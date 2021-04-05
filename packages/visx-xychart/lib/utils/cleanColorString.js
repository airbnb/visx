"use strict";

exports.__esModule = true;
exports.cleanColor = exports.colorHasUrl = void 0;

/* react-spring cannot tween colors with url ids (patterns, gradients), these helpers detect and clean them. */
var neutralCleanColor = 'rgba(0,0,0,0.1)';

var colorHasUrl = function colorHasUrl(color) {
  return Boolean(color == null ? void 0 : color.includes('url('));
};

exports.colorHasUrl = colorHasUrl;

var cleanColor = function cleanColor(color) {
  return colorHasUrl(color) ? neutralCleanColor : color;
};

exports.cleanColor = cleanColor;