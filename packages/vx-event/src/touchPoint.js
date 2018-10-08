import { Point } from '@vx/point';

export default function touchPoint(node, event) {
  if (!node) return;
  const svg = node.ownerSVGElement || node;
  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint();
    point.x = event.changedTouches[0].clientX;
    point.y = event.changedTouches[0].clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return new Point({
      x: point.x,
      y: point.y
    });
  }
  const rect = node.getBoundingClientRect();
  return new Point({
    x: event.changedTouches[0].clientX - rect.left - node.clientLeft,
    y: event.changedTouches[0].clientY - rect.top - node.clientTop
  });
}
