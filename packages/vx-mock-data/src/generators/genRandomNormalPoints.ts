import { randomNormal } from 'd3-random';

export type PointConfig = [number, number, number];
export type PointsRange = [number, number, number];

const random = randomNormal(0, 0.2);
const sqrt3: number = Math.sqrt(3);

function range(length: number): number[] {
  return new Array(length).fill(1);
}

export function genPointsRange(
  length: number,
  [offsetX, offsetY, index]: PointConfig,
): PointsRange[] {
  return range(length).map(() => {
    return [random() + offsetX, random() + offsetY, index];
  });
}

export default function genPoints(count: number = 300): PointsRange[] {
  return [
    ...genPointsRange(count, [sqrt3, 1, 0]),
    ...genPointsRange(count, [-sqrt3, 1, 1]),
    ...genPointsRange(count, [0, -1, 2]),
  ];
}
