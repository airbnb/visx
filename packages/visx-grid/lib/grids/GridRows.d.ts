import React from 'react';
import { LineProps } from '@visx/shape/lib/shapes/Line';
import { ScaleInput } from '@visx/scale';
import { CommonGridProps, GridScale } from '../types';
export declare type GridRowsProps<Scale extends GridScale> = CommonGridProps & {
    /** `@visx/scale` or `d3-scale` object used to convert value to position. */
    scale: Scale;
    /**
     * Exact values used to generate grid lines using `scale`.
     * Overrides `numTicks` if specified.
     */
    tickValues?: ScaleInput<Scale>[];
    /** Total width of each grid row line. */
    width: number;
};
export declare type AllGridRowsProps<Scale extends GridScale> = GridRowsProps<Scale> & Omit<LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>, keyof GridRowsProps<Scale>>;
export default function GridRows<Scale extends GridScale>({ top, left, scale, width, stroke, strokeWidth, strokeDasharray, className, children, numTicks, lineStyle, offset, tickValues, ...restProps }: AllGridRowsProps<Scale>): JSX.Element;
//# sourceMappingURL=GridRows.d.ts.map