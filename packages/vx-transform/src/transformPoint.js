import { fromObject, applyToPoint, inverse } from 'transformation-matrix';

export default function transformPoint(matrix, x, y) {
  const im = inverse(matrix);
  return applyToPoint(im, { x, y });
}
