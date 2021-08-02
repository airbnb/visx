import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { GenericCell, ColorScale, OpacityScale } from '../types';

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
  /** Given a column index, returns the x position of a rect cell. */
  xScale: (columnIndex: number) => number;
  /** Given a row index, returns the y position of a rect cell. */
  yScale: (rowIndex: number) => number;
  /** Given a count value, returns the desired rect fill color. */
  colorScale?: ColorScale;
  /** Given a count value, returns the desired rect fill opacity. */
  opacityScale?: OpacityScale;
  /** Accessor that returns an array of cell BinDatums (rows) for the provided ColumnData. */
  bins?: (column: ColumnDatum) => BinDatum[];
  /** Accessor that returns the count for the provided Bin. */
  count?: (bin: BinDatum) => number;
  /** className to apply to each heatmap rect element. */
  className?: string;
  /** Render function override, provided with heatmap. */
  children?: (cells: RectCell<ColumnDatum, BinDatum>[][]) => React.ReactNode;
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

export type ComponentProps<ColumnDatum, BinDatum> = HeatmapRectProps<ColumnDatum, BinDatum> &
  Omit<
    React.SVGProps<SVGRectElement>,
    | keyof HeatmapRectProps<ColumnDatum, BinDatum>
    | 'width'
    | 'height'
    | 'x'
    | 'y'
    | 'fill'
    | 'fillOpacity'
  >;

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
  bins = (d: any) => d?.bins,
  count = (d: any) => d?.count,
  children,
  ...restProps
}: ComponentProps<ColumnDatum, BinDatum>) {
  const width = binWidth - gap;
  const height = binHeight - gap;

  const heatmap: RectCell<ColumnDatum, BinDatum>[][] = data.map((datum, column) => {
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
    <Group className="visx-heatmap-rects" top={top} left={left}>
      {heatmap.map((_bins) =>
        _bins.map((bin) => (
          <rect
            key={`heatmap-tile-rect-${bin.row}-${bin.column}`}
            className={cx('visx-heatmap-rect', className)}
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
