import { Point } from '@visx/point';

export default function createPoint({ x, y }: Partial<Point>, horizontal: boolean) {
  return new Point(horizontal ? { x, y } : { x: y, y: x });
}
