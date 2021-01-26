import { randomNormal } from 'd3-random';
import getSeededRandom from './getSeededRandom';

export type PointConfig = [number, number, number];
export type PointsRange = [number, number, number];

const sqrt3: number = Math.sqrt(3);

function range(length: number): number[] {
  return new Array(length).fill(1);
}

export function genPointsRange(
  length: number,
  [offsetX, offsetY, index]: PointConfig,
  random: () => number = randomNormal(0, 0.2),
): PointsRange[] {
  return range(length).map(() => {
    return [random() + offsetX, random() + offsetY, index];
  });
}

export default function genPoints(
  count: number = 300,
  /** Optional random seed in the interval [0, 1). */
  seed: number | undefined = undefined,
): PointsRange[] {
  const random = seed == null ? undefined : randomNormal.source(getSeededRandom(seed))(0, 0.2);
  return [
    ...genPointsRange(count, [sqrt3, 1, 0], random),
    ...genPointsRange(count, [-sqrt3, 1, 1], random),
    ...genPointsRange(count, [0, -1, 2], random),
  ];
}
