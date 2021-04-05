import { Point } from '@visx/point';
export default function createPoint(_ref, horizontal) {
  var x = _ref.x,
      y = _ref.y;
  return new Point(horizontal ? {
    x: x,
    y: y
  } : {
    x: y,
    y: x
  });
}