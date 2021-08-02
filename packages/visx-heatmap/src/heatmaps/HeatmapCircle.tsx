import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { GenericCell, ColorScale, OpacityScale } from '../types';

export type HeatmapCircleProps<ColumnDatum, BinDatum> = {
  /** Array of column data (one per column desired) for the heatmap. */
  data?: ColumnDatum[];
  /** Left offset applied to heatmap wrapper g element. */
  left?: number;
  /** Top offset applied to heatmap wrapper g element. */
  top?: number;
  /** Pixel gap between heatmap circles. */
  gap?: number;
  /** Pixel radius of heatmap circles. */
  radius?: number;
  /** Given a column index, returns the x position of a circle cell. */
  xScale: (columnIndex: number) => number;
  /** Given a row index, returns the y position of a circle cell. */
  yScale: (rowIndex: number) => number;
  /** Given a count value, returns the desired circle fill color. */
  colorScale?: ColorScale;
  /** Given a count value, returns the desired circle fill opacity. */
  opacityScale?: OpacityScale;
  /** Accessor that returns an array of cell BinDatums (rows) for the provided ColumnData. */
  bins?: (column: ColumnDatum) => BinDatum[];
  /** Accessor that returns the count for the provided Bin. */
  count?: (bin: BinDatum) => number;
  /** className to apply to each heatmap circle element. */
  className?: string;
  /** Render function override, provided with heatmap. */
  children?: (cells: CircleCell<ColumnDatum, BinDatum>[][]) => React.ReactNode;
};

export type CircleCell<ColumnDatum, BinDatum> = GenericCell<ColumnDatum, BinDatum> & {
  /** Computed radius for the circle (radius - gap). */
  r: number;
  /** Input radius for the circle including specified gap. */
  radius: number;
  /** x position of the cell circle center. */
  cx: number;
  /** y position of the cell circle center. */
  cy: number;
};

export default function HeatmapCircle<ColumnDatum, BinDatum>({
  className,
  top,
  left,
  data = [],
  gap = 1,
  radius = 6,
  xScale,
  yScale,
  colorScale = () => undefined,
  opacityScale = () => 1,
  bins = (column: any) => (column)?.bins,
  count = (cell: any) => (cell)?.count,
  children,
  ...restProps
}: HeatmapCircleProps<ColumnDatum, BinDatum> &
  Omit<
    React.SVGProps<SVGCircleElement>,
    keyof HeatmapCircleProps<ColumnDatum, BinDatum> | 'r' | 'cx' | 'cy' | 'fill' | 'fillOpacity'
  >) {
  const innerRadius = radius - gap;

  const heatmap: CircleCell<ColumnDatum, BinDatum>[][] = data.map((columnDatum, column) => {
    const x = xScale(column);
    return bins(columnDatum).map((bin, row) => {
      const countValue = count(bin);
      return {
        bin,
        row,
        column,
        datum: columnDatum,
        radius,
        gap,
        count: countValue,
        cx: radius + x,
        cy: yScale(row) + gap + radius,
        r: innerRadius,
        opacity: opacityScale(countValue),
        color: colorScale(countValue),
      };
    });
  });

  if (children) return <>{children(heatmap)}</>;

  return (
    <Group className="visx-heatmap-circles" top={top} left={left}>
      {heatmap.map((columns) =>
        columns.map((bin) => (
          <circle
            key={`heatmap-tile-circle-${bin.row}-${bin.column}`}
            className={cx('visx-heatmap-circle', className)}
            r={bin.r}
            cx={bin.cx}
            cy={bin.cy}
            fill={bin.color}
            fillOpacity={bin.opacity}
            {...restProps}
          />
        )),
      )}
    </Group>
  );
}
