import Point from './Point';

export default function sumPoints(point1: Point, point2: Point) {
  return new Point({
    x: point1.x + point2.x,
    y: point1.y + point2.y,
  });
}
