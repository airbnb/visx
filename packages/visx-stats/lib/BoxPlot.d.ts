import React from 'react';
import { PickD3Scale, ContinuousDomainScaleType } from '@visx/scale';
import { SharedProps, ChildRenderProps } from './types';
export declare type BoxPlotProps = SharedProps & {
    /** Scale for converting input values to pixel offsets. */
    valueScale: PickD3Scale<ContinuousDomainScaleType, number>;
    /** Maximum BoxPlot value. */
    max?: number;
    /** Minimum BoxPlot value. */
    min?: number;
    /** First quartile BoxPlot value. */
    firstQuartile?: number;
    /** Third quartile BoxPlot value. */
    thirdQuartile?: number;
    /** Median BoxPlot value. */
    median?: number;
    /** Width of the BoxPlot. */
    boxWidth?: number;
    /** Fill color to apply to outlier circles and BoxPlot rect. */
    fill?: string;
    /** Fill color opacity to apply to outlier circles and BoxPlot rect. */
    fillOpacity?: number | string;
    /** Stroke color to apply to outlier circles, BoxPlot rect, and min/median/max lines. */
    stroke?: string;
    /** Stroke width to apply to outlier circles, BoxPlot rect, and min/median/max lines. */
    strokeWidth?: number | string;
    /** Rx to apply to BoxPlot rect. */
    rx?: number;
    /** Ry to apply to BoxPlot rect. */
    ry?: number;
    /** Array of outlier values to be rendered. */
    outliers?: number[];
    /** Props to pass to the median glyph line. */
    medianProps?: React.SVGProps<SVGLineElement>;
    /** Props to pass to the maximum glyph line. */
    maxProps?: React.SVGProps<SVGLineElement>;
    /** Props to pass to the minimum glyph line. */
    minProps?: React.SVGProps<SVGLineElement>;
    /** Props to pass to the box glyph rect. */
    boxProps?: React.SVGProps<SVGRectElement>;
    /** Props to pass to the outlier glyph circles. */
    outlierProps?: React.SVGProps<SVGCircleElement>;
    /** Whether to render a container rect element (e.g., to capture mouse events). */
    container?: boolean;
    /** Props to pass to the container glyph rect if rendered. */
    containerProps?: React.SVGProps<SVGRectElement>;
    /** Override render function to fully control the rendering of the BoxPlot glyph. */
    children?: (childRenderProps: ChildRenderProps) => React.ReactNode;
};
export default function BoxPlot({ left, top, className, max, min, firstQuartile, thirdQuartile, median, boxWidth, fill, fillOpacity, stroke, strokeWidth, rx, ry, valueScale, outliers, horizontal, medianProps, maxProps, minProps, boxProps, outlierProps, container, containerProps, children, }: BoxPlotProps): JSX.Element;
//# sourceMappingURL=BoxPlot.d.ts.map