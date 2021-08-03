import generateSinPoints from './generateSinPoints';

type Point = { x: number; y: number };

export default function generateSinSegments({
  width,
  height,
  numberOfWaves = 10,
  pointsPerWave = 10,
  direction = 'left-to-right',
}: {
  width: number;
  height: number;
  numberOfWaves?: number;
  pointsPerWave?: number;
  direction?: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
}) {
  const isHorizontal = direction === 'left-to-right' || direction === 'right-to-left';

  // Generate points
  const data = generateSinPoints({
    width: isHorizontal ? width : height,
    height: isHorizontal ? height : width,
    numberOfWaves,
    pointsPerWave,
  });

  // Create empty segments
  const segments: Point[][] = [];
  for (let i = 0; i < numberOfWaves; i += 1) {
    segments.push([]);
  }

  // Split into equal width or height segments
  const segmentSize = (isHorizontal ? width : height) / numberOfWaves;
  data.forEach((d) => {
    segments[Math.min(Math.floor(d.x / segmentSize), segments.length - 1)].push(d);
  });

  switch (direction) {
    case 'right-to-left':
      return segments.map((segment) => segment.map(({ x, y }) => ({ x: -x, y })));
    case 'top-to-bottom':
      return segments.map((segment) => segment.map(({ x, y }) => ({ x: y, y: x })));
    case 'bottom-to-top':
      return segments.map((segment) => segment.map(({ x, y }) => ({ x: y, y: -x })));
    default:
    case 'left-to-right':
      return segments;
  }
}
