import React from 'react';
import { AreaProps as AreaOwnProps } from '@visx/shape/lib/shapes/Area';
declare type AreaProps<Datum> = AreaOwnProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof AreaOwnProps<Datum>>;
declare type NumberAccessor<Datum> = (datum: Datum, index: number, data: Datum[]) => number;
export declare type ThresholdProps<Datum> = {
    /** className applied to container g element. */
    className?: string;
    /** Sets the curve factory (from @visx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
    curve?: AreaProps<Datum>['curve'];
    /** Specifies a constant value, or an accessor called per datum, above which the *upper area* is clipped. */
    clipAboveTo: NumberAccessor<Datum> | number;
    /** Specifies a constant value, or an accessor called per datum, below which the *lower area* is clipped. */
    clipBelowTo: NumberAccessor<Datum> | number;
    /** id for this threshold. If not set, multiple Threshold's on a page may conflict and interfere with each other. */
    id: string;
    /** Array of data for which to generate a threshold area shape. */
    data: Datum[];
    /**
     * The defined accessor for the shape. The final area shape includes all points for which this
     * function returns true. By default all points are defined.
     */
    defined?: (datum: Datum, index: number, data: Datum[]) => boolean;
    /**
     * For the Area shape, specifies the x accessor function for a datum, which defaults to `d => d[0]`.
     * Alternatively this may be a constant x value.
     */
    x: NumberAccessor<Datum> | number;
    /**
     * For the Area shape, specifies the accessor function (or constant value) which generates
     * the "lower" area bound to which "belowAreaProps" and "clipBelow" props apply. Defaults to `d => 0`.
     */
    y0: NumberAccessor<Datum> | number;
    /**
     * For the Area shape, specifies the accessor function (or constant value) which generates
     * the "upper" area bound to which "aboveAreaProps" and "clipAbove" props apply. Defaults to `d => d[1]`.
     */
    y1: NumberAccessor<Datum> | number;
    /** Additional props passed to the "above" Area shape. */
    aboveAreaProps?: AreaProps<Datum>;
    /** Additional props passed to the "below" Area shape. */
    belowAreaProps?: AreaProps<Datum>;
};
export default function Threshold<Datum>({ className, curve, clipAboveTo, clipBelowTo, data, defined, x, y0, y1, aboveAreaProps, belowAreaProps, id, }: ThresholdProps<Datum>): JSX.Element;
export {};
//# sourceMappingURL=Threshold.d.ts.map