import React from 'react';
import { ArcProps } from '@visx/shape/lib/shapes/Arc';
import { ScaleInput } from '@visx/scale';
import { CommonGridProps, GridScale } from '../types';
export declare type GridRadialProps<Scale extends GridScale> = CommonGridProps & {
    /** `@visx/scale` or `d3-scale` object used to convert value to position. */
    scale: Scale;
    /**
     * Exact values used to generate grid lines using `scale`.
     * Overrides `numTicks` if specified.
     */
    tickValues?: ScaleInput<Scale>[];
    /**
     * If specified, the arc of each radial grid line will have this thickness, useful for fills.
     */
    arcThickness?: number;
    /**
     * The end angle of the arc of radial grid lines in radians.
     */
    endAngle?: number;
    /**
     * The class name applied to all radial lines.
     */
    lineClassName?: string;
    /**
     * The color applied to the fill of the radial lines.
     */
    fill?: string;
    /**
     * The fill opacity applied to the fill of the radial lines.
     */
    fillOpacity?: number;
    /**
     * The start angle of the arc of radial grid lines in radians.
     */
    startAngle?: number;
    /**
     * Child components to the Arc.
     */
    children?: () => React.ReactNode;
};
export declare type AllGridRadialProps<Scale extends GridScale, Datum> = GridRadialProps<Scale> & Omit<ArcProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof ArcProps<Datum>>, keyof GridRadialProps<Scale>>;
export default function GridRadial<Scale extends GridScale, Datum>({ arcThickness, className, endAngle, fill, fillOpacity, left, lineClassName, lineStyle, numTicks, scale, startAngle, stroke, strokeWidth, strokeDasharray, tickValues, top, ...restProps }: AllGridRadialProps<Scale, Datum>): JSX.Element;
//# sourceMappingURL=GridRadial.d.ts.map