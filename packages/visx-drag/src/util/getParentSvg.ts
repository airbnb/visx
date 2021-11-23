/** Gets closest parent that is an SVG element, that coordinates of the element will be relative to. */
import { isSVGGraphicsElement } from '@visx/event/src/typeGuards';

export default function getParentSVG(element: Element) {
  let parentSvg = element.parentElement;
  while (!isSVGGraphicsElement(parentSvg)) {
    if (!parentSvg) return null;
    parentSvg = parentSvg.parentElement;
  }
  return parentSvg;
}
