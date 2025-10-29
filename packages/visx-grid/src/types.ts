import { CSSProperties, ReactNode } from 'react';
import { D3Scale, NumberLike, ScaleInput } from '@visx/scale';

// In order to plot values on an axis, output of the scale must be number.
// Some scales return undefined.
export type GridScaleOutput = number | NumberLike | undefined;

/** A catch-all type for scales that are compatible with grid */
export type GridScale<Output extends GridScaleOutput = GridScaleOutput> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D3Scale<Output, any, any>;

export type GridLines = {
  from: { x?: number; y?: number };
  to: { x?: number; y?: number };
  index: number;
}[];

export type CommonGridProps = {
  /** classname to apply to line group element. */
  className?: string;
  /** Optionally override rendering of grid lines. */
  children?: (props: { lines: GridLines }) => ReactNode;
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
  /** Approximate number of grid lines. Approximate due to d3 alogrithm, specify `rowTickValues` or `columnTickValues` for precise control. */
  numTicks?: number;
  /** Exact values to be used for GridRows lines, passed to yScale. Use this if you need precise control over GridRows values.  */
  rowTickValues?: ScaleInput<GridScale>[];
  /** Exact values to be used for GridColumns lines, passed to xScale. Use this if you need precise control over GridColumns values.  */
  columnTickValues?: ScaleInput<GridScale>[];
  /** Styles to apply as grid line style. */
  lineStyle?: CSSProperties;
  /** Pixel offset to apply as a translation (y- for Rows, x- for Columns) to each grid lines. */
  offset?: number;
};
