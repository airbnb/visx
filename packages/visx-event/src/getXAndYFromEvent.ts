import type { EventType } from './types';
import { isMouseEvent, isTouchEvent } from './typeGuards';

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

  if (isMouseEvent(event)) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  // for focus events try to extract the center position of the target element
  const target = event?.target;
  const boundingClientRect =
    target && 'getBoundingClientRect' in target ? target.getBoundingClientRect() : null;

  if (!boundingClientRect) return { ...DEFAULT_POINT };

  return {
    x: boundingClientRect.x + boundingClientRect.width / 2,
    y: boundingClientRect.y + boundingClientRect.height / 2,
  };
}
