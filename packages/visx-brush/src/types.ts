import { D3Scale, NumberLike } from '@visx/scale';

export type Point = {
  x: number;
  y: number;
};

export type Bounds = {
  x0: number;
  x1: number;
  xValues?: unknown[];
  y0: number;
  y1: number;
  yValues?: unknown[];
};

export interface MarginShape {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface BrushShape extends BrushStartEnd {
  extent: Bounds;
  bounds: Bounds;
}

export interface BrushStartEnd {
  start: Point;
  end: Point;
}

export interface PartialBrushStartEnd {
  start: Partial<Point>;
  end: Partial<Point>;
}

export type ResizeTriggerAreas =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export type BrushingType = 'move' | 'select' | ResizeTriggerAreas;
export type BrushPageOffset = {
  pageX?: number;
  pageY?: number;
};

// In order to plot values on a brush, output of the scale must be number.
// Some scales return undefined.
type BrushScaleOutput = number | NumberLike | undefined;

/** A catch-all type for scales that are compatible with axis */
export type Scale<Output extends BrushScaleOutput = BrushScaleOutput> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D3Scale<Output, any, any>;
