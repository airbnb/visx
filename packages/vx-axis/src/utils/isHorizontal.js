import ORIENTATION from '../constants/orientation';

export default function isHorizontal(orient) {
  return orient !== ORIENTATION.left && orient !== ORIENTATION.right;
}
