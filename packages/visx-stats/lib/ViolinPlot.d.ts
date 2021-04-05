import React from 'react';
import { PickD3Scale, ContinuousDomainScaleType } from '@visx/scale';
import { SharedProps } from './types';
export declare type ViolinPlotProps<Datum extends object> = SharedProps & {
    /** Scale for converting values to pixel offsets. */
    valueScale: PickD3Scale<ContinuousDomainScaleType, number>;
    /** Data used to draw the violin plot glyph. Violin plot values and counts should be able to be derived from data. */
    data: Datum[];
    /** Given an datum, returns the count for it. */
    count?: (d: Datum) => number;
    /** Given an datum, returns the value for it. */
    value?: (d: Datum) => number;
    /** Width of the violin plot glyph. */
    width?: number;
    /** Override render function to fully control the rendering of the ViolinPlot glyph. */
    children?: (providedProps: {
        path: string;
    }) => React.ReactNode;
};
export default function ViolinPlot<Datum extends object>({ left, top, className, data, width, count, value, valueScale, horizontal, children, ...restProps }: ViolinPlotProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof ViolinPlotProps<Datum>>): JSX.Element;
//# sourceMappingURL=ViolinPlot.d.ts.map