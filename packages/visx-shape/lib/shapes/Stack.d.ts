import React from 'react';
import { Area as AreaType, Stack as StackType, SeriesPoint, Series } from 'd3-shape';
import { $TSFIXME, AddSVGProps, AccessorForArrayItem, StackKey, BaseStackProps, AreaPathConfig } from '../types';
export declare type StackProps<Datum, Key> = BaseStackProps<Datum, Key> & {
    /** Returns a color for a given stack key and index. */
    color?: (key: Key, index: number) => string;
    /** Override render function which is passed the configured arc generator as input. */
    children?: (args: {
        stacks: Series<Datum, Key>[];
        path: AreaType<SeriesPoint<Datum>>;
        stack: StackType<$TSFIXME, Datum, Key>;
    }) => React.ReactNode;
    /** Sets the x0 accessor function, and sets x1 to null. */
    x?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
    /** Specifies the x0 accessor function which defaults to d => d[0]. */
    x0?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
    /** Specifies the x1 accessor function which defaults to null. */
    x1?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
    /** Specifies the y0 accessor function which defaults to d => 0. */
    y0?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
    /** Specifies the y1 accessor function which defaults to d => d[1]. */
    y1?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
} & Pick<AreaPathConfig<SeriesPoint<Datum>>, 'defined' | 'curve'>;
export default function Stack<Datum, Key extends StackKey = StackKey>({ className, top, left, keys, data, curve, defined, x, x0, x1, y0, y1, value, order, offset, color, children, ...restProps }: AddSVGProps<StackProps<Datum, Key>, SVGPathElement>): JSX.Element;
//# sourceMappingURL=Stack.d.ts.map