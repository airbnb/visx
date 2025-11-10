/** Re-export useful types from d3-hierarchy. */
import type { HierarchyRectangularNode } from 'd3-hierarchy';

export type {
  HierarchyNode,
  HierarchyRectangularNode,
  HierarchyCircularNode,
  HierarchyPointLink,
  HierarchyPointNode,
  HierarchyCircularLink,
  HierarchyRectangularLink,
  HierarchyLink,
} from 'd3-hierarchy';

export type TileMethod<Datum> = (
  n: HierarchyRectangularNode<Datum>,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
) => void;
