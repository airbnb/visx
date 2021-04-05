import React from 'react';
import { RadialLine } from 'd3-shape';
import { LinePathProps } from './LinePath';
import { AddSVGProps, RadialLinePathConfig } from '../types';
export declare type LineRadialProps<Datum> = Pick<LinePathProps<Datum>, 'className' | 'data' | 'fill' | 'innerRef'> & {
    /** Override render function which is passed the configured path generator as input. */
    children?: (args: {
        path: RadialLine<Datum>;
    }) => React.ReactNode;
} & RadialLinePathConfig<Datum>;
export default function LineRadial<Datum>({ className, angle, radius, defined, curve, data, innerRef, children, fill, ...restProps }: AddSVGProps<LineRadialProps<Datum>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=LineRadial.d.ts.map