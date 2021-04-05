export function isElement(elem) {
  return !!elem && elem instanceof Element;
} // functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements

export function isSVGElement(elem) {
  return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
} // functional definition of SVGGElement

export function isSVGSVGElement(elem) {
  return !!elem && 'createSVGPoint' in elem;
}
export function isSVGGraphicsElement(elem) {
  return !!elem && 'getScreenCTM' in elem;
} // functional definition of TouchEvent

export function isTouchEvent(event) {
  return !!event && 'changedTouches' in event;
} // functional definition of MouseEvent

export function isMouseEvent(event) {
  return !!event && 'clientX' in event;
} // functional definition of event

export function isEvent(event) {
  return !!event && (event instanceof Event || 'nativeEvent' in event && event.nativeEvent instanceof Event);
}