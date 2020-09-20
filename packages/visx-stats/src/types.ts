export interface BoxPlot {
  min?: number;
  firstQuartile?: number;
  median?: number;
  thirdQuartile?: number;
  max?: number;
  outliers: number[];
}

export interface BinDatum {
  value: number;
  count: number;
}

export interface LineCoords {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export type ChildRenderProps = {
  /** Output value range of the provided scale. */
  valueRange: number[] | [number, number];
  /** Center (top if horizontal=true, else left) of single boxplot. */
  center: number;
  /** Top offset if horizontal=true, else left offset. */
  offset: number;
  /** Specified width of BoxPlot */
  boxWidth?: number;
  /** Computed coordinates of the maximum line. */
  max: LineCoords;
  /** Computed coordinates of the line from maximum to third quartile. */
  maxToThird: LineCoords;
  /** Computed coordinates of the median line. */
  median: LineCoords;
  /** Computed coordinates of the line from first quartile to minimum. */
  minToFirst: LineCoords;
  /** Computed coordinates of the minimum line. */
  min: LineCoords;
  /** Computed coordinates of the boxplot box (i.e., not whiskers) rect. */
  box: LineCoords;
  /** Computed coordinates of the entire glyph container rect. */
  container: LineCoords;
};

export type SharedProps = {
  /** Left pixel offset of the glyph. */
  left?: number;
  /** Top pixel offset of the glyph. */
  top?: number;
  /** Classname to apply to parent group element. */
  className?: string;
  /** Whether the glyph should be rendered horizontally instead of vertically. */
  horizontal?: boolean;
};
