import Point from '@vx/point';

export default function localPoint(node, event) {
  if (!node) return;
  const svg = node.ownerSVGElement || node;
  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return new Point({
      x: point.x,
      y: point.y
    });
  }
  let rect = node.getBoundingClientRect();
  return new Point({
    x: event.clientX - rect.left - node.clientLeft,
    y: event.clientY - rect.top - node.clientTop
  });
}
