import { Point } from '@vx/point';

export default function createPoint({ x, y }: Partial<Point>, horizontal: boolean) {
  return horizontal ? new Point({ x, y }) : new Point({ y, x });
}
