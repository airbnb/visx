import React, { CSSProperties } from 'react';
import { TextProps } from '@visx/text/lib/Text';
export declare type HTMLTextStyles = React.HTMLAttributes<HTMLDivElement>['style'];
export declare type LineStyles = Omit<React.SVGAttributes<SVGLineElement>, 'Key'>;
export declare type GridStyles = CSSProperties;
export declare type SVGTextProps = TextProps;
interface AxisStyle {
    /** Axis label styles. */
    axisLabel: SVGTextProps;
    /** Axis line styles. */
    axisLine: LineStyles;
    /** Tick label styles. */
    tickLabel: SVGTextProps;
    /** Tick line styles. */
    tickLine: LineStyles;
    /** Length of axis tick lines. */
    tickLength: number;
}
/** A complete chart theme includes style definitions for all axis orientations. */
export interface XYChartTheme {
    /** Base background color. */
    backgroundColor: string;
    /** Ordinal colors to be used for default coloring by series `key`s. */
    colors: string[];
    /** Styles to applied to HMTL labels. */
    htmlLabel: HTMLTextStyles;
    /** Styles to applied to big SVG labels (axis label, annotation title, etc.). */
    svgLabelBig: SVGTextProps;
    /** Styles to applied to small SVG labels (tick label, annotation subtitle, etc.). */
    svgLabelSmall: SVGTextProps;
    /** Styles to be applied to chart grids. */
    gridStyles: GridStyles;
    /** Styles to be applied to axes (axis labels, ticks, tick labels). */
    axisStyles: {
        x: {
            top: AxisStyle;
            bottom: AxisStyle;
        };
        y: {
            left: AxisStyle;
            right: AxisStyle;
        };
    };
}
export {};
//# sourceMappingURL=theme.d.ts.map