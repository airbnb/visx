// functional definition of a PointerEvent (mouse, touch)
export function isPointerEvent(
  event?: React.PointerEvent | React.FocusEvent,
): event is React.PointerEvent {
  return !!event && ('clientX' in event || 'changedTouches' in event);
}
