/* react-spring cannot tween colors with url ids (patterns, gradients), these helpers detect and clean them. */
var neutralCleanColor = 'rgba(0,0,0,0.1)';
export var colorHasUrl = function colorHasUrl(color) {
  return Boolean(color == null ? void 0 : color.includes('url('));
};
export var cleanColor = function cleanColor(color) {
  return colorHasUrl(color) ? neutralCleanColor : color;
};