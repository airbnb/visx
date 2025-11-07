import type { EventType } from './types';

export function isElement(elem?: Element | EventType): elem is Element {
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
export function isTouchEvent(event?: EventType): event is TouchEvent {
  return !!event && 'changedTouches' in event;
}

// functional definition of MouseEvent
export function isMouseEvent(event?: EventType): event is MouseEvent {
  return !!event && 'clientX' in event;
}

function isNativeEvent(event: any): event is Event {
  return event && typeof event === 'object' && 'target' in event && 'currentTarget' in event;
}

function isReactSyntheticEvent(event: any): event is React.SyntheticEvent {
  return (
    event &&
    typeof event === 'object' &&
    'nativeEvent' in event &&
    isNativeEvent((event as React.SyntheticEvent).nativeEvent)
  );
}

export function isEvent(event?: EventType | Element): event is EventType {
  return !!event && (isNativeEvent(event) || isReactSyntheticEvent(event));
}
