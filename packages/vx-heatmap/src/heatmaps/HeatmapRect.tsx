import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { GenericCell } from '../types';

export type HeatmapRectProps<ColumnDatum, BinDatum> = {
  /** Array of column data (one per column desired) for the heatmap. */
  data?: ColumnDatum[];
  /** Left offset applied to heatmap wrapper g element. */
  left?: number;
  /** Top offset applied to heatmap wrapper g element. */
  top?: number;
  /** Width of a rect bin. */
  binWidth?: number;
  /** Height of a rect bin. */
  binHeight?: number;
  /**  */
  x0?: number;
  /** Pixel gap between heatmap rects. */
  gap?: number;
  /** Given a column index, returns the x position of a circle cell. */
  xScale: (columnIndex: number) => number;
  /** Given a row index, returns the y position of a circle cell. */
  yScale: (rowIndex: number) => number;
  /** Given a count value, returns the desired circle fill color. */
  colorScale?: (count?: number | null) => string | undefined;
  /** Given a count value, returns the desired circle fill opacity. */
  opacityScale?: (count?: number | null) => number | undefined;
  /** Accessor that returns an array of cell BinDatums (rows) for the provided ColumnData. */
  bins?: (column: ColumnDatum) => BinDatum[];
  /** Accessor that returns the count for the provided Bin. */
  count?: (bin: BinDatum) => number | undefined | null;
  /** className to apply to each heatmap circle element. */
  className?: string;
  /** Render function override, provided with heatmap. */
  children?: (cells: HeatMapCell<ColumnDatum, BinDatum>[][]) => React.ReactNode;
};

export type RectCell<ColumnDatum, BinDatum> = GenericCell<ColumnDatum, BinDatum> & {
  /** binWidth less grid gap (effective width). */
  width: number;
  /** binHeight less grid gap (effective height). */
  height: number;
  /** x position of the cell rect. */
  x: number;
  /** y position of the cell rect. */
  y: number;
};

export default function HeatmapRect<ColumnDatum, BinDatum>({
  className,
  top,
  left,
  data = [],
  binWidth = 6,
  binHeight = 6,
  x0 = 0,
  gap = 1,
  xScale,
  yScale,
  colorScale = () => undefined,
  opacityScale = () => 1,
  bins = (d: any) => d && d.bins,
  count = (d: any) => d && d.count,
  children,
  ...restProps
}: HeatmapRectProps<ColumnDatum, BinDatum> &
  Omit<
    React.SVGProps<SVGRectElement>,
    | keyof HeatmapRectProps<ColumnDatum, BinDatum>
    | 'width'
    | 'height'
    | 'x'
    | 'y'
    | 'fill'
    | 'fillOpacity'
  >) {
  const width = binWidth - gap;
  const height = binHeight - gap;

  const heatmap: HeatMapCell<ColumnDatum, BinDatum>[][] = data.map((datum, column) => {
    const x = xScale(column);
    return bins(datum).map((bin, row) => {
      const countValue = count(bin);
      return {
        bin,
        row,
        column,
        datum,
        width,
        height,
        gap,
        count: countValue,
        x: x + x0,
        y: yScale(row) + gap,
        color: colorScale(countValue),
        opacity: opacityScale(countValue),
      };
    });
  });

  if (children) return <>{children(heatmap)}</>;

  return (
    <Group className="vx-heatmap-rects" top={top} left={left}>
      {heatmap.map(_bins =>
        _bins.map(bin => (
          <rect
            key={`heatmap-tile-rect-${bin.row}-${bin.column}`}
            className={cx('vx-heatmap-rect', className)}
            width={bin.width}
            height={bin.height}
            x={bin.x}
            y={bin.y}
            fill={bin.color}
            fillOpacity={bin.opacity}
            {...restProps}
          />
        )),
      )}
    </Group>
  );
}
