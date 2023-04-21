"use strict";

exports.__esModule = true;
exports.isFocusEvent = isFocusEvent;
exports.isPointerEvent = isPointerEvent;
// functional definition of a PointerEvent (mouse, touch)
function isPointerEvent(event) {
  return !!event && ('clientX' in event || 'changedTouches' in event);
}
function isFocusEvent(event) {
  return !!event && !isPointerEvent(event);
}