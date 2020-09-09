import memoize from 'lodash/memoize';

const MEASUREMENT_ELEMENT_ID = '__visx_splitpath_svg_path_measurement_id';
const SVG_NAMESPACE_URL = 'http://www.w3.org/2000/svg';

export interface GetLineSegmentsConfig<Datum> {
  /** Full path `d` attribute to be broken up into `n` segments. */
  path: string;
  /**
   * Array of length `n`, where `n` is the number of resulting line segments.
   * For each segment of length `m`, `m / sampleRate` evenly spaced points will be returned.
   */
  segments: Datum[][];
  /** For each segment of length `m`, `m / sampleRate` evenly spaced points will be returned. */
  sampleRate?: number;
}

type LineSegments = { x: number; y: number }[][];

export function getSplitLineSegments<Datum>({
  path,
  segments,
  sampleRate = 0.25,
}: GetLineSegmentsConfig<Datum>): LineSegments {
  try {
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

    pathElement.setAttribute('d', path);

    const totalPathLength = pathElement.getTotalLength();
    const totalPieces = segments.reduce((sum, curr) => sum + curr.length, 0);
    const pieceSize = totalPathLength / totalPieces;

    let cumulativeSize = 0;

    const lineSegments = segments.map(segment => {
      const segmentPointCount = segment.length;
      const coords: { x: number; y: number }[] = [];

      for (let i = 0; i < segmentPointCount + sampleRate; i += sampleRate) {
        const distance = (cumulativeSize + i) * pieceSize;
        const point = pathElement!.getPointAtLength(distance);
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

export default memoize(
  getSplitLineSegments,
  ({ path, segments, sampleRate }: GetLineSegmentsConfig<any>) =>
    `${path}_${segments.length}_${segments.map(segment => segment.length).join('-')}_${sampleRate}`,
);
