// functional definition of a PointerEvent (mouse, touch)
export function isPointerEvent(event) {
  return !!event && ('clientX' in event || 'changedTouches' in event);
}