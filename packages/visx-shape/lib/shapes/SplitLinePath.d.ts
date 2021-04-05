import React from 'react';
import { LinePathConfig } from '../types';
declare type SplitLinePathProps<Datum> = {
    /** Array of data segments, where each segment will be a separate path in the rendered line. */
    segments: Datum[][];
    /** Styles to apply to each segment. If fewer styles are specified than the number of segments, they will be re-used. */
    styles: Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'children'>[];
    /** Override render function which is passed the configured path generator as input. */
    children?: (renderProps: {
        index: number;
        segment: {
            x: number;
            y: number;
        }[];
        styles?: Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'children'>;
    }) => React.ReactNode;
    /** className applied to path element. */
    className?: string;
    /** Optionally specify the sample rate for interpolating line segments. */
    sampleRate?: number;
} & LinePathConfig<Datum>;
export default function SplitLinePath<Datum>({ children, className, curve, defined, sampleRate, segments, x, y, styles, }: SplitLinePathProps<Datum>): JSX.Element;
export {};
//# sourceMappingURL=SplitLinePath.d.ts.map