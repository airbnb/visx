import { getSeededRandom } from '@visx/mock-data';

export interface Circle {
  id: string;
  radius: number;
  x: number;
  y: number;
}

const generateCircles = ({ width, height }: { width: number; height: number }) => {
  const radiusRandom = getSeededRandom(0.2);
  const xRandom = getSeededRandom(0.3);
  const yRandom = getSeededRandom(0.4);

  return new Array(width < 360 ? 40 : 185).fill(1).map((d, i) => {
    const radius = 25 - radiusRandom() * 20;
    return {
      id: `${i}`,
      radius,
      x: Math.round(xRandom() * (width - radius * 2) + radius),
      y: Math.round(yRandom() * (height - radius * 2) + radius),
    };
  });
};

export default generateCircles;
