const MEASUREMENT_ELEMENT_ID = '__visx_splitpath_svg_path_measurement_id';
const SVG_NAMESPACE_URL = 'http://www.w3.org/2000/svg';

function getOrCreateMeasurementElement() {
  let pathElement = document.getElementById(MEASUREMENT_ELEMENT_ID) as SVGPathElement | null;

  // create a single path element if not done already
  if (!pathElement) {
    const svg = document.createElementNS(SVG_NAMESPACE_URL, 'svg');
    // not visible
    svg.style.opacity = '0';
    svg.style.width = '0';
    svg.style.height = '0';
    // off screen
    svg.style.position = 'absolute';
    svg.style.top = '-100%';
    svg.style.left = '-100%';
    // no mouse events
    svg.style.pointerEvents = 'none';
    pathElement = document.createElementNS(SVG_NAMESPACE_URL, 'path');
    pathElement.setAttribute('id', MEASUREMENT_ELEMENT_ID);
    svg.appendChild(pathElement);
    document.body.appendChild(svg);
  }

  return pathElement;
}

interface PointInSegment {
  x: number | undefined;
  y: number | undefined;
}

/**
 * Different methods to segment the line
 * - `x`: Split based on x-position,
 *  assuming x always increase only (segment[i].x > segment[i-1].x)
 *  or decrease only (segment[i].x < segment[i-1].x).
 * - `y`: Split based on y-position,
 *  assuming y always increase only (segment[i].y > segment[i-1].y)
 *  or decrease only (segment[i].y < segment[i-1].y).
 * - `length`: Assuming the path length between consecutive points are equal.
 */
export type LineSegmentation = 'x' | 'y' | 'length';

type LineSegments = { x: number; y: number }[][];

export interface GetLineSegmentsConfig {
  /** Full path `d` attribute to be broken up into `n` segments. */
  path: string;
  /**
   * Array of length `n`, where `n` is the number of resulting line segments.
   * For each segment of length `m`, `m / sampleRate` evenly spaced points will be returned.
   */
  pointsInSegments: PointInSegment[][];
  /**
   * How to segment the line
   */
  segmentation: LineSegmentation;
  /** For each segment of length `m`, `m / sampleRate` evenly spaced points will be returned. */
  sampleRate?: number;
}

export default function getSplitLineSegments({
  path,
  pointsInSegments,
  segmentation,
  sampleRate = 1,
}: GetLineSegmentsConfig): LineSegments {
  try {
    const pathElement = getOrCreateMeasurementElement();
    pathElement.setAttribute('d', path);

    const totalPathLength = pathElement.getTotalLength();

    if (segmentation === 'x') {
      const lineSegments: LineSegments = pointsInSegments.map(() => []);
      const isIncreasing =
        pathElement.getPointAtLength(totalPathLength).x > pathElement.getPointAtLength(0).x;
      const segmentBegins = pointsInSegments.map(
        s => s.find(p => typeof p.x === 'number')?.x ?? (isIncreasing ? -Infinity : Infinity),
      );
      let nextSegment = 1;
      for (let distance = 0; distance <= totalPathLength; distance += sampleRate) {
        const point = pathElement.getPointAtLength(distance);
        if (isIncreasing) {
          while (nextSegment < segmentBegins.length - 1 && point.x >= segmentBegins[nextSegment]) {
            nextSegment += 1;
          }
        } else {
          while (nextSegment < segmentBegins.length - 1 && point.x <= segmentBegins[nextSegment]) {
            nextSegment += 1;
          }
        }
        lineSegments[nextSegment].push(point);
      }
      return lineSegments;
    }

    // segmentation "length"
    const totalPieces = pointsInSegments.reduce((sum, curr) => sum + curr.length, 0);
    const pieceSize = totalPathLength / totalPieces;

    let cumulativeSize = 0;

    const lineSegments = pointsInSegments.map(segment => {
      const segmentPointCount = segment.length;
      const coords: { x: number; y: number }[] = [];

      for (let i = 0; i < segmentPointCount + sampleRate; i += sampleRate) {
        const distance = (cumulativeSize + i) * pieceSize;
        const point = pathElement.getPointAtLength(distance);
        coords.push(point);
      }

      cumulativeSize += segmentPointCount;

      return coords;
    });

    return lineSegments;
  } catch (e) {
    return [];
  }
}
