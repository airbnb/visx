import { EventType } from './types';
import { isTouchEvent } from './typeGuards';

export default function getXAndYFromEvent(event?: EventType) {
  if (!event) return { x: 0, y: 0 };

  if (isTouchEvent(event)) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientX,
    };
  }

  return {
    x: event.clientX,
    y: event.clientY,
  };
}
