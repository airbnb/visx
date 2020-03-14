export interface Circle {
  id: string;
  radius: number;
  x: number;
  y: number;
}

const generateCircles = ({ width, height }: { width: number; height: number }) =>
  new Array(width < 360 ? 40 : 185).fill(1).map((d, i) => {
    const radius = 25 - Math.random() * 20;
    return {
      id: `${i}`,
      radius,
      x: Math.round(Math.random() * (width - radius * 2) + radius),
      y: Math.round(Math.random() * (height - radius * 2) + radius),
    };
  });

export default generateCircles;
