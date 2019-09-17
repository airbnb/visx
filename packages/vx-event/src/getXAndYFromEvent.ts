import { isTouchEvent } from './typeGuards';

export default function getXAndYFromEvent(event?: MouseEvent | TouchEvent) {
  if (!event) return { x: 0, y: 0 };

  if (isTouchEvent(event)) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientX,
    };
  } else {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
}
