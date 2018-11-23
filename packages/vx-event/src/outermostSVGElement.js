import { Point } from '@vx/point';

export default function outermostSVGElement(node) {
  // called with no args
  if (!node) return;

  // find the outermost svg
  while (node.ownerSVGElement) {
    node = node.ownerSVGElement;
  }

  return node;
}
