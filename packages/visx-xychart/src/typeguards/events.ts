import type { FocusEvent, PointerEvent } from 'react';

type EventType = PointerEvent | FocusEvent;

// functional definition of a PointerEvent (mouse, touch)
export function isPointerEvent(event?: EventType): event is PointerEvent {
  return !!event && ('clientX' in event || 'changedTouches' in event);
}

export function isFocusEvent(event?: EventType): event is FocusEvent {
  return !!event && !isPointerEvent(event);
}
