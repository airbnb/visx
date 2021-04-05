import React from 'react';
import { PositionScale } from '@visx/shape/lib/types';
import { BarsProps, SeriesProps } from '../../../types';
export declare type BaseBarGroupProps<XScale extends PositionScale, YScale extends PositionScale, Datum extends object> = {
    /** `BarSeries` elements */
    children: JSX.Element | JSX.Element[];
    /** Group band scale padding, [0, 1] where 0 = no padding, 1 = no bar. */
    padding?: number;
    /** Comparator function to sort `dataKeys` within a bar group. By default the DOM rendering order of `BarGroup`s `children` is used. */
    sortBars?: (dataKeyA: string, dataKeyB: string) => number;
    /** Rendered component which is passed BarsProps by BaseBarGroup after processing. */
    BarsComponent: React.FC<BarsProps<XScale, YScale>>;
} & Pick<SeriesProps<XScale, YScale, Datum>, 'onPointerMove' | 'onPointerOut' | 'onPointerUp' | 'onBlur' | 'onFocus' | 'enableEvents'>;
export default function BaseBarGroup<XScale extends PositionScale, YScale extends PositionScale, Datum extends object>({ children, padding, sortBars, BarsComponent, onBlur, onFocus, onPointerMove, onPointerOut, onPointerUp, enableEvents, }: BaseBarGroupProps<XScale, YScale, Datum>): JSX.Element | null;
//# sourceMappingURL=BaseBarGroup.d.ts.map