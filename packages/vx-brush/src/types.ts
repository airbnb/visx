export type Point = {
  x: number;
  y: number;
};

export type Bounds = {
  x0: number;
  x1: number;
  xValues?: any[];
  y0: number;
  y1: number;
  yValues?: any[];
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

export interface Scale<Input = any, Output = any> {
  (value: Input): Output;
  ticks?: (count: number) => Input[];
  domain(input: Input[]): this;
  domain(): Input[];
  range(): Output[];
  range(output: Output[]): this;
  invert?: (output: Output) => Input;
  step?: () => number;
}
