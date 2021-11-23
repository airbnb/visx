/** Gets closest point on path to a given point */
export default function getClosestPointOnPath(
  path: SVGGeometryElement,
  referencePoint: { x: number; y: number },
  transform = new DOMMatrix(),
  precision = 1,
) {
  let closestPoint = referencePoint;
  let minDistance = Infinity;

  // Sample points along the path and return the closest one
  const pathLength = path.getTotalLength();
  for (let sampleLength = 0; sampleLength <= pathLength; sampleLength += precision) {
    const sample = path.getPointAtLength(sampleLength);
    const distance = Math.sqrt(
      (sample.x - referencePoint.x + transform.e) ** 2 +
        (sample.y - referencePoint.y + transform.f) ** 2,
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = { x: sample.x + transform.e, y: sample.y + transform.f };
    }
  }

  return closestPoint;
}
