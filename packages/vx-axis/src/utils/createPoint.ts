import { Point } from '@vx/point';

export default function createPoint({ x, y }: Partial<Point>, horizontal: boolean) {
  return new Point(horizontal ? { x, y } : { y, x });
}
