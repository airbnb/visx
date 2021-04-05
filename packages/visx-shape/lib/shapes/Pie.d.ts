import React from 'react';
import { Arc as ArcType, PieArcDatum as PieArcDatumType, Pie as PieType } from 'd3-shape';
import { $TSFIXME, AddSVGProps, ArcPathConfig, PiePathConfig } from '../types';
export declare type PieArcDatum<Datum> = PieArcDatumType<Datum>;
export declare type ProvidedProps<Datum> = {
    path: ArcType<$TSFIXME, PieArcDatum<Datum>>;
    arcs: PieArcDatum<Datum>[];
    pie: PieType<$TSFIXME, Datum>;
};
export declare type PieProps<Datum> = {
    /** className applied to path element. */
    className?: string;
    /** Top offset of rendered Pie. */
    top?: number;
    /** Left offset of rendered Pie. */
    left?: number;
    /** Array of data to generate a Pie for. */
    data?: Datum[];
    /** Optional render function invoked for each Datum to render something (e.g., a Label) at each pie centroid. */
    centroid?: (xyCoords: [number, number], arc: PieArcDatum<Datum>) => React.ReactNode;
    /** Invoked for each datum, returns the value for a given Pie segment/arc datum. */
    pieValue?: PiePathConfig<Datum>['value'];
    /** Comparator function to sort *arcs*, overridden by pieSortValues if defined. If pieSort and pieSortValues are null, arcs match input data order. */
    pieSort?: PiePathConfig<Datum>['sort'];
    /** Comparator function to sort arc *values*, overrides pieSort if defined. If pieSort and pieSortValues are null, arcs match input data order. */
    pieSortValues?: PiePathConfig<Datum>['sortValues'];
    /** Render function override which is passed the configured arc generator as input. */
    children?: (provided: ProvidedProps<Datum>) => React.ReactNode;
} & Pick<PiePathConfig<Datum>, 'startAngle' | 'endAngle' | 'padAngle'> & Pick<ArcPathConfig<PieArcDatum<Datum>>, 'innerRadius' | 'outerRadius' | 'cornerRadius' | 'padRadius'>;
export default function Pie<Datum>({ className, top, left, data, centroid, innerRadius, outerRadius, cornerRadius, startAngle, endAngle, padAngle, padRadius, pieSort, pieSortValues, pieValue, children, ...restProps }: AddSVGProps<PieProps<Datum>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=Pie.d.ts.map