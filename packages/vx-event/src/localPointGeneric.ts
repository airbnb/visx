import { Point } from '@vx/point';
import { EventType } from './types';
import { isSVGElement, isSVGGraphicsElement, isSVGSVGElement } from './typeGuards';
import getXAndYFromEvent from './getXAndYFromEvent';

export default function localPoint(node: Element, event: EventType) {
  if (!node || !event) return new Point({ x: 0, y: 0 });

  const coords = getXAndYFromEvent(event);

  // find top-most SVG
  const svg = isSVGElement(node) ? node.ownerSVGElement : node;
  const screenCTM = isSVGGraphicsElement(node) ? node.getScreenCTM() : null;

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
