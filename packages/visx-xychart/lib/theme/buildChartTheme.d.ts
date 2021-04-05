import { CSSProperties } from 'react';
import { SVGTextProps, HTMLTextStyles, LineStyles, XYChartTheme } from '../types/theme';
export declare type ThemeConfig = {
    backgroundColor: string;
    colors: string[];
    svgLabelBig?: SVGTextProps;
    svgLabelSmall?: SVGTextProps;
    htmlLabel?: HTMLTextStyles;
    xAxisLineStyles?: LineStyles;
    yAxisLineStyles?: LineStyles;
    xTickLineStyles?: LineStyles;
    yTickLineStyles?: LineStyles;
    tickLength: number;
    gridColor: string;
    gridColorDark: string;
    gridStyles?: CSSProperties;
};
/** Provides a simplified API to build a full XYChartTheme. */
export default function buildChartTheme(config: ThemeConfig): XYChartTheme;
//# sourceMappingURL=buildChartTheme.d.ts.map