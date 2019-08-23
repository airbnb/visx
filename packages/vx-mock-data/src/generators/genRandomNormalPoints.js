import { randomNormal } from 'd3-random';

const random = randomNormal(0, 0.2);
const sqrt3 = Math.sqrt(3);

function range(n) {
  return Array(n).fill(1);
}

export function genPointsRange(n, [offsetX, offsetY, index]) {
  return range(n).map(() => {
    return [random() + offsetX, random() + offsetY, index];
  });
}

export default function genPoints(count = 300) {
  return [
    ...genPointsRange(count, [sqrt3, 1, 0]),
    ...genPointsRange(count, [-sqrt3, 1, 1]),
    ...genPointsRange(count, [0, -1, 2]),
  ];
}
