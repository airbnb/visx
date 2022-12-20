import type {
  FocusEvent as ReactFocusEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react';

export type EventType =
  | MouseEvent
  | TouchEvent
  | FocusEvent
  | ReactFocusEvent
  | ReactMouseEvent
  | ReactTouchEvent;
