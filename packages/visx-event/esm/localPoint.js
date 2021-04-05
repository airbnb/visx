import localPointGeneric from './localPointGeneric';
import { isElement, isEvent } from './typeGuards';
/** Handles two signatures for backwards compatibility. */

export default function localPoint(nodeOrEvent, maybeEvent) {
  // localPoint(node, event)
  if (isElement(nodeOrEvent) && maybeEvent) {
    return localPointGeneric(nodeOrEvent, maybeEvent);
  } // localPoint(event)


  if (isEvent(nodeOrEvent)) {
    var event = nodeOrEvent;
    var node = event.target;
    if (node) return localPointGeneric(node, event);
  }

  return null;
}