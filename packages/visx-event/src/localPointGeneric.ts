import { Point } from '@visx/point';
import type { EventType } from './types';
import { isSVGElement, isSVGGraphicsElement, isSVGSVGElement } from './typeGuards';
import getXAndYFromEvent from './getXAndYFromEvent';

const CHILD_ID = '__visx-child-ctm-workaround';

/**
 * Gets the screen CTM applied to children.
 *
 * Normally this is equivalent to `node.getScreenCTM()` but
 * when `node` is a nested `SVGSVGElement` Firefox returns
 * the screen CTM of the parent `SVGSVGElement`. See:
 * - https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
 * - https://bugzilla.mozilla.org/show_bug.cgi?id=1446011
 */
function getChildScreenCTM(node: SVGGraphicsElement): DOMMatrix | null {
  if (!(node instanceof SVGSVGElement)) return node.getScreenCTM();
  let child = node.children.namedItem(CHILD_ID) as SVGGraphicsElement;
  if (child === null) {
    child = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    child.id = CHILD_ID;
    node.appendChild(child);
  }
  const screenCTM = child.getScreenCTM();
  return screenCTM;
}

export default function localPoint(node: Element, event: EventType) {
  if (!node || !event) return null;

  const coords = getXAndYFromEvent(event);

  // find top-most SVG
  const svg = isSVGElement(node) ? node.ownerSVGElement : node;
  const screenCTM = isSVGGraphicsElement(svg) ? getChildScreenCTM(svg) : null;

  if (isSVGSVGElement(svg) && screenCTM) {
    let point = svg.createSVGPoint();
    point.x = coords.x;
    point.y = coords.y;
    point = point.matrixTransform(screenCTM.inverse());

    return new Point({
      x: point.x,
      y: point.y,
    });
  }

  // fall back to bounding box
  const rect = node.getBoundingClientRect();

  return new Point({
    x: coords.x - rect.left - node.clientLeft,
    y: coords.y - rect.top - node.clientTop,
  });
}
