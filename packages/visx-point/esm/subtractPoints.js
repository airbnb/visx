import Point from './Point';
export default function subtractPoints(point1, point2) {
  return new Point({
    x: point1.x - point2.x,
    y: point1.y - point2.y
  });
}