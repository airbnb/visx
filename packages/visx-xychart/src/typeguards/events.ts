import { FocusEvent, PointerEvent } from 'react';

// functional definition of a PointerEvent (mouse, touch)
export function isPointerEvent(event?: PointerEvent | FocusEvent): event is PointerEvent {
  return !!event && ('clientX' in event || 'changedTouches' in event);
}
