"use strict";

exports.__esModule = true;
exports.isPointerEvent = isPointerEvent;

// functional definition of a PointerEvent (mouse, touch)
function isPointerEvent(event) {
  return !!event && ('clientX' in event || 'changedTouches' in event);
}