import React from 'react';
import { LineProps } from '@visx/shape/lib/shapes/Line';
import { ScaleInput } from '@visx/scale';
import { CommonGridProps, GridScale } from '../types';
export declare type GridAngleProps<Scale extends GridScale> = CommonGridProps & {
    /** `@visx/scale` or `d3-scale` object used to convert value to angle. */
    scale: Scale;
    /**
     * Exact values used to generate angle grid lines using `scale`.
     * Overrides `numTicks` if specified.
     */
    tickValues?: ScaleInput<Scale>[];
    /**
     * Radius which determines the start position of angle lines.
     */
    innerRadius?: number;
    /**
     * Radius which determines the end position of angle lines.
     */
    outerRadius: number;
    /**
     * The class name applied to all angle lines.
     */
    lineClassName?: string;
};
export declare type AllGridAngleProps<Scale extends GridScale> = GridAngleProps<Scale> & Omit<LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>, keyof GridAngleProps<Scale>>;
export default function GridAngle<Scale extends GridScale>({ className, innerRadius, left, lineClassName, lineStyle, numTicks, outerRadius, scale, stroke, strokeDasharray, strokeWidth, tickValues, top, ...restProps }: AllGridAngleProps<Scale>): JSX.Element;
//# sourceMappingURL=GridAngle.d.ts.map