import React from 'react';
import { GenericCell, ColorScale, OpacityScale } from '../types';
export declare type HeatmapRectProps<ColumnDatum, BinDatum> = {
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
export declare type RectCell<ColumnDatum, BinDatum> = GenericCell<ColumnDatum, BinDatum> & {
    /** binWidth less grid gap (effective width). */
    width: number;
    /** binHeight less grid gap (effective height). */
    height: number;
    /** x position of the cell rect. */
    x: number;
    /** y position of the cell rect. */
    y: number;
};
export declare type ComponentProps<ColumnDatum, BinDatum> = HeatmapRectProps<ColumnDatum, BinDatum> & Omit<React.SVGProps<SVGRectElement>, keyof HeatmapRectProps<ColumnDatum, BinDatum> | 'width' | 'height' | 'x' | 'y' | 'fill' | 'fillOpacity'>;
export default function HeatmapRect<ColumnDatum, BinDatum>({ className, top, left, data, binWidth, binHeight, x0, gap, xScale, yScale, colorScale, opacityScale, bins, count, children, ...restProps }: ComponentProps<ColumnDatum, BinDatum>): JSX.Element;
//# sourceMappingURL=HeatmapRect.d.ts.map