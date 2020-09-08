import { EventType } from './types';
import { isTouchEvent } from './typeGuards';

const DEFAULT_POINT = { x: 0, y: 0 };

export default function getXAndYFromEvent(event?: EventType) {
  if (!event) return { ...DEFAULT_POINT };

  if (isTouchEvent(event)) {
    return event.changedTouches.length > 0
      ? {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        }
      : { ...DEFAULT_POINT };
  }

  return {
    x: event.clientX,
    y: event.clientY,
  };
}
