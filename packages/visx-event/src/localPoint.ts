import localPointGeneric from './localPointGeneric';
import { EventType } from './types';
import { isElement, isEvent } from './typeGuards';

/** Handles two signatures for backwards compatibility. */
export default function localPoint(nodeOrEvent: Element | EventType, maybeEvent?: EventType) {
  // localPoint(node, event)
  if (isElement(nodeOrEvent) && maybeEvent) {
    return localPointGeneric(nodeOrEvent, maybeEvent);
  }
  // localPoint(event)
  if (isEvent(nodeOrEvent)) {
    const event = nodeOrEvent;
    const node = event.target as Element;
    if (node) return localPointGeneric(node, event);
  }
  return null;
}
