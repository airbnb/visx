import getOrCreateMeasurementElement from './getOrCreateMeasurementElement';

const MEASUREMENT_ELEMENT_ID = '__visx_splitpath_svg_path_measurement_id';

interface PointInSegment {
  x: number | undefined;
  y: number | undefined;
}

/** Different algorithms to segment the line */
export type LineSegmentation = 'x' | 'y' | 'length';

type LineSegments = { x: number; y: number }[][];

const TRUE = () => true;

export interface GetLineSegmentsConfig {
  /** Full path `d` attribute to be broken up into `n` segments. */
  path: string;
  /** Array of length `n`, where `n` is the number of segments. */
  pointsInSegments: PointInSegment[][];
  /**
   * How to segment the line
   * - `x`: Split based on x-position,
   *  assuming x always increase only (segment[i].x > segment[i-1].x)
   *  or decrease only (segment[i].x < segment[i-1].x).
   * - `y`: Split based on y-position,
   *  assuming y always increase only (segment[i].y > segment[i-1].y)
   *  or decrease only (segment[i].y < segment[i-1].y).
   * - `length`: Assuming the path length between consecutive points are equal.
   *
   * Default is `x`.
   */
  segmentation: LineSegmentation;
  /**
   * The `path` will be sampled every `sampleRate` pixel to generate the returned points.
   * Default is `1` pixel.
   */
  sampleRate?: number;
}

export default function getSplitLineSegments({
  path,
  pointsInSegments,
  segmentation = 'x',
  sampleRate = 1,
}: GetLineSegmentsConfig): LineSegments {
  try {
    const pathElement = getOrCreateMeasurementElement(MEASUREMENT_ELEMENT_ID);
    pathElement.setAttribute('d', path);
    const totalPathLength = pathElement.getTotalLength();

    const samples = [];
    for (let distance = 0; distance <= totalPathLength; distance += sampleRate) {
      samples.push(pathElement.getPointAtLength(distance));
    }

    const numSegments = pointsInSegments.length;

    if (segmentation === 'x' || segmentation === 'y') {
      const lineSegments: LineSegments = pointsInSegments.map(() => []);
      const segmentBegins = pointsInSegments.map(
        points => points.find(p => typeof p[segmentation] === 'number')?.[segmentation],
      );

      const isIncreasing = samples[samples.length - 1][segmentation] > samples[0][segmentation];
      const isBeyondSegments = isIncreasing
        ? segmentBegins.map(begin =>
            typeof begin === 'undefined' ? TRUE : (xOrY: number) => xOrY >= begin,
          )
        : segmentBegins.map(begin =>
            typeof begin === 'undefined' ? TRUE : (xOrY: number) => xOrY <= begin,
          );

      let current = 0;
      samples.forEach(sample => {
        const position = sample[segmentation];
        while (current < numSegments - 1 && isBeyondSegments[current + 1](position)) {
          current += 1;
        }
        lineSegments[current].push(sample);
      });

      return lineSegments;
    }

    // segmentation === "length"
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
