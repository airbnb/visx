import { getSeededRandom } from '@visx/mock-data';

const random = getSeededRandom(0.65);

const getPoints = (array: number[], pointCount: number) => {
  const x = 1 / (0.1 + random());
  const y = 2 * random() - 0.5;
  const z = 10 / (0.1 + random());
  for (let i = 0; i < pointCount; i += 1) {
    const w = (i / pointCount - y) * z;
    array[i] += x * Math.exp(-w * w);
  }
};

const generateData = (pointCount: number, bumpCount: number): number[] => {
  const arr = [];
  let i: number;
  for (i = 0; i < pointCount; i += 1) arr[i] = 0;
  for (i = 0; i < bumpCount; i += 1) getPoints(arr, pointCount);
  return arr;
};

export default generateData;
