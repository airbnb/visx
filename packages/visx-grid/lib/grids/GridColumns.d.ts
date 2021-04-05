import React from 'react';
import { LineProps } from '@visx/shape/lib/shapes/Line';
import { ScaleInput } from '@visx/scale';
import { CommonGridProps, GridScale } from '../types';
export declare type GridColumnsProps<Scale extends GridScale> = CommonGridProps & {
    /** `@visx/scale` or `d3-scale` object used to convert value to position. */
    scale: Scale;
    /**
     * Exact values used to generate grid lines using `scale`.
     * Overrides `numTicks` if specified.
     */
    tickValues?: ScaleInput<Scale>[];
    /** Total height of each grid column line. */
    height: number;
};
export declare type AllGridColumnsProps<Scale extends GridScale> = GridColumnsProps<Scale> & Omit<LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>, keyof GridColumnsProps<Scale>>;
export default function GridColumns<Scale extends GridScale>({ top, left, scale, height, stroke, strokeWidth, strokeDasharray, className, numTicks, lineStyle, offset, tickValues, children, ...restProps }: AllGridColumnsProps<Scale>): JSX.Element;
//# sourceMappingURL=GridColumns.d.ts.map