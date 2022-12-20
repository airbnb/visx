import { FocusEvent as ReactFocusEvent, PointerEvent as ReactPointerEvent } from 'react';

type EventType = PointerEvent | FocusEvent | ReactFocusEvent | ReactPointerEvent;

// functional definition of a PointerEvent (mouse, touch)
export function isPointerEvent(event?: EventType): event is PointerEvent {
  return !!event && ('clientX' in event || 'changedTouches' in event);
}

export function isFocusEvent(event?: EventType): event is FocusEvent {
  return !!event && !isPointerEvent(event);
}
