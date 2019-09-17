import localPointGeneric from './localPointGeneric';
import { isElement, isEvent } from './typeGuards';

export default function localPoint(
  nodeOrEvent: Element | MouseEvent | TouchEvent,
  maybeEvent?: MouseEvent | TouchEvent,
) {
  if (isElement(nodeOrEvent) && maybeEvent) {
    return localPointGeneric(nodeOrEvent, maybeEvent);
  } else if (isEvent(nodeOrEvent)) {
    const node = nodeOrEvent.target as Element;
    if (node) return localPointGeneric(node, nodeOrEvent);
  }
  return;
}
