export type Point = {
  x: number;
  y: number;
};

export type Bound = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};

export type GeneralStyleShape = {
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
  fill: string;
  fillOpacity: number;
};

export type MarginShape = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type BrushShape = {
  start: Point;
  end: Point;
  extent: Bound;
  bounds: Bound;
};

export type DragShape = {
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
  isDragging?: boolean;
  dragEnd?: Function;
  dragMove?: Function;
  dragStart?: Function;
  width: number;
  height: number;
};
