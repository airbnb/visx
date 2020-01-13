/** Generic d3 scale type. */
export interface Scale<Input = unknown, Output = unknown> {
  (value: Input): Output | undefined;
  ticks?: (count?: number) => Input[];
  domain(): Input[];
  range(): Output[] | [Output];
}

export type CommonGridProps = {
  /** classname to apply to line group element. */
  className?: string;
  /** Top offset to apply to glyph g element container. */
  top?: number;
  /** Left offset to apply to glyph g element container. */
  left?: number;
  /** Grid line stroke color. */
  stroke?: string;
  /** Grid line stroke thickness. */
  strokeWidth?: string | number;
  /** Grid line stroke-dasharray attribute. */
  strokeDasharray?: string;
  /** Approximate number of  grid lines. Approximate due to d3 alogrithm, specify `tickValues` for precise control. */
  numTicks?: number;
  /** Styles to apply as grid line style. */
  lineStyle?: React.CSSProperties;
  /** Pixel offset to apply as a translation (y- for Rows, x- for Columns) to each grid lines. */
  offset?: number;
  /** Exact values used to generate grid cordinates (y- for Rows, x- for Columns) lines using `scale`. Overrides `numTicks` if specified. */
  tickValues?: number[];
};
