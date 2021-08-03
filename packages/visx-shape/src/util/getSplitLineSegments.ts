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
   *  assuming x values increase only (`segment[i].x > segment[i-1].x`)
   *  or decrease only (`segment[i].x < segment[i-1].x`).
   * - `y`: Split based on y-position,
   *  assuming y values increase only (`segment[i].y > segment[i-1].y`)
   *  or decrease only (`segment[i].y < segment[i-1].y`).
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
    const totalLength = pathElement.getTotalLength();

    const numSegments = pointsInSegments.length;
    const lineSegments: LineSegments = pointsInSegments.map(() => []);

    if (segmentation === 'x' || segmentation === 'y') {
      const segmentStarts = pointsInSegments.map(
        (points) => points.find((p) => typeof p[segmentation] === 'number')?.[segmentation],
      );

      const first = pathElement.getPointAtLength(0);
      const last = pathElement.getPointAtLength(totalLength);
      const isIncreasing = last[segmentation] > first[segmentation];
      const isBeyondSegmentStart = isIncreasing
        ? segmentStarts.map((start) =>
            typeof start === 'undefined' ? TRUE : (xOrY: number) => xOrY >= start,
          )
        : segmentStarts.map((start) =>
            typeof start === 'undefined' ? TRUE : (xOrY: number) => xOrY <= start,
          );

      let currentSegment = 0;
      for (let distance = 0; distance <= totalLength; distance += sampleRate) {
        const sample = pathElement.getPointAtLength(distance);
        const position = sample[segmentation];
        // find the current segment to which this sample belongs
        while (
          currentSegment < numSegments - 1 &&
          isBeyondSegmentStart[currentSegment + 1](position)
        ) {
          currentSegment += 1;
        }
        // add sample to segment
        lineSegments[currentSegment].push(sample);
      }
    } else {
      // segmentation === "length"
      const numPointsInSegment = pointsInSegments.map((points) => points.length);
      const numPoints = numPointsInSegment.reduce((sum, curr) => sum + curr, 0);
      const lengthBetweenPoints = totalLength / Math.max(1, numPoints - 1);

      const segmentStarts = numPointsInSegment.slice(0, numSegments - 1);
      segmentStarts.unshift(0);
      for (let i = 2; i < numSegments; i += 1) {
        segmentStarts[i] += segmentStarts[i - 1];
      }
      for (let i = 0; i < numSegments; i += 1) {
        segmentStarts[i] *= lengthBetweenPoints;
      }

      let currentSegment = 0;
      for (let distance = 0; distance <= totalLength; distance += sampleRate) {
        const sample = pathElement.getPointAtLength(distance);
        // find the current segment to which this sample belongs
        while (currentSegment < numSegments - 1 && distance >= segmentStarts[currentSegment + 1]) {
          currentSegment += 1;
        }
        // add sample to segment
        lineSegments[currentSegment].push(sample);
      }
    }

    return lineSegments;
  } catch (e) {
    return [];
  }
}
