import localPointGeneric from './localPointGeneric';
import { EventType } from './types';
import { isElement, isEvent } from './typeGuards';

export default function localPoint(nodeOrEvent: Element | EventType, maybeEvent?: EventType) {
  if (isElement(nodeOrEvent) && maybeEvent) {
    return localPointGeneric(nodeOrEvent, maybeEvent);
  }
  if (isEvent(nodeOrEvent)) {
    const node = nodeOrEvent.target as Element;
    if (node) return localPointGeneric(node, nodeOrEvent);
  }
  return undefined;
}
