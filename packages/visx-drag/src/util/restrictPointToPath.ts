/** Returns the point within the bounds of a path that is closest to a given point, coordinates relative to owner SVG. */
import getClosestPointOnPath from './getClosestPoint';
import getParentSVG from './getParentSvg';

export default function restrictPointToPath(
  path: SVGGeometryElement,
  point: { x: number; y: number },
) {
  const parentSVG = getParentSVG(path);
  const transform = parentSVG?.getCTM() || new DOMMatrix();
  const closestPoint = getClosestPointOnPath(path, point, transform);

  return closestPoint;
}
