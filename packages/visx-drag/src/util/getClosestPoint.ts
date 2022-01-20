/** Gets closest point from list of points */
export default function getClosestPoint(point: { x: number; y: number }, samples: DOMPoint[]) {
  let closestPoint = point;
  let minDistance = Infinity;
  for (const sample of samples) {
    const distance = Math.sqrt((sample.x - point.x) ** 2 + (sample.y - point.y) ** 2);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = { x: sample.x, y: sample.y };
    }
  }
  return closestPoint;
}
