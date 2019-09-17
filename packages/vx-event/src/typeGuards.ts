export function isElement(elem?: Element | Event): elem is Element {
  return !!elem && elem instanceof Element;
}

// functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements
export function isSVGElement(elem?: Element): elem is SVGElement {
  return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
}

// functional definition of SVGGElement
export function isSVGSVGElement(elem?: Element | null): elem is SVGSVGElement {
  return !!elem && 'createSVGPoint' in elem;
}

export function isSVGGraphicsElement(elem?: Element | null): elem is SVGGraphicsElement {
  return !!elem && 'getScreenCTM' in elem;
}

// functional definition of TouchEvent
export function isTouchEvent(event?: Event): event is TouchEvent {
  return !!event && 'changedTouches' in event;
}

// functional definition of event
export function isEvent(event?: Event | Element): event is Event {
  return !!event && 'target' in event;
}
