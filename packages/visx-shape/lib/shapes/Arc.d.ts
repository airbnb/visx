import React from 'react';
import { Arc as ArcType } from 'd3-shape';
import { $TSFIXME, AddSVGProps, ArcPathConfig } from '../types';
export declare type ArcProps<Datum> = {
    /** className applied to path element. */
    className?: string;
    /** A Datum for which to generate an arc. */
    data?: Datum;
    /** Override render function which is passed the configured arc generator as input. */
    children?: (args: {
        path: ArcType<$TSFIXME, Datum>;
    }) => React.ReactNode;
    /** React ref to the path element. */
    innerRef?: React.Ref<SVGPathElement>;
} & ArcPathConfig<Datum>;
export default function Arc<Datum>({ className, data, innerRadius, outerRadius, cornerRadius, startAngle, endAngle, padAngle, padRadius, children, innerRef, ...restProps }: AddSVGProps<ArcProps<Datum>, SVGPathElement>): JSX.Element | null;
//# sourceMappingURL=Arc.d.ts.map