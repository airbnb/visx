import React from 'react';
import { Line as LineType } from 'd3-shape';
import { AddSVGProps, LinePathConfig } from '../types';
export declare type LinePathProps<Datum> = {
    /** Array of data for which to generate a line shape. */
    data?: Datum[];
    /** React RefObject passed to the path element. */
    innerRef?: React.Ref<SVGPathElement>;
    /** Override render function which is passed the configured path generator as input. */
    children?: (args: {
        path: LineType<Datum>;
    }) => React.ReactNode;
    /** Fill color of the path element. */
    fill?: string;
    /** className applied to path element. */
    className?: string;
} & LinePathConfig<Datum>;
export default function LinePath<Datum>({ children, data, x, y, fill, className, curve, innerRef, defined, ...restProps }: AddSVGProps<LinePathProps<Datum>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LinePath.d.ts.map