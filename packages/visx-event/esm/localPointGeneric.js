import { Point } from '@visx/point';
import { isSVGElement, isSVGGraphicsElement, isSVGSVGElement } from './typeGuards';
import getXAndYFromEvent from './getXAndYFromEvent';
export default function localPoint(node, event) {
  if (!node || !event) return null;
  var coords = getXAndYFromEvent(event); // find top-most SVG

  var svg = isSVGElement(node) ? node.ownerSVGElement : node;
  var screenCTM = isSVGGraphicsElement(svg) ? svg.getScreenCTM() : null;

  if (isSVGSVGElement(svg) && screenCTM) {
    var point = svg.createSVGPoint();
    point.x = coords.x;
    point.y = coords.y;
    point = point.matrixTransform(screenCTM.inverse());
    return new Point({
      x: point.x,
      y: point.y
    });
  } // fall back to bounding box


  var rect = node.getBoundingClientRect();
  return new Point({
    x: coords.x - rect.left - node.clientLeft,
    y: coords.y - rect.top - node.clientTop
  });
}