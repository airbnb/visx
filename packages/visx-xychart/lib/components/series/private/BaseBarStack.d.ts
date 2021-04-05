import React from 'react';
import { PositionScale, StackPathConfig } from '@visx/shape/lib/types';
import { BaseBarSeriesProps } from './BaseBarSeries';
import { BarsProps, SeriesProps } from '../../../types';
declare type BarStackChildProps<XScale extends PositionScale, YScale extends PositionScale, Datum extends object> = Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>;
export declare type BaseBarStackProps<XScale extends PositionScale, YScale extends PositionScale, Datum extends object> = {
    /** `BarSeries` elements, note we can't strictly enforce this with TS yet. */
    children: React.ReactElement<BarStackChildProps<XScale, YScale, Datum>> | React.ReactElement<BarStackChildProps<XScale, YScale, Datum>>[];
    /** Rendered component which is passed BarsProps by BaseBarStack after processing. */
    BarsComponent: React.FC<BarsProps<XScale, YScale>>;
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'> & Pick<SeriesProps<XScale, YScale, Datum>, 'onPointerMove' | 'onPointerOut' | 'onPointerUp' | 'onBlur' | 'onFocus' | 'enableEvents'>;
declare function BaseBarStack<XScale extends PositionScale, YScale extends PositionScale, Datum extends object>({ children, order, offset, BarsComponent, onBlur, onFocus, onPointerMove, onPointerOut, onPointerUp, enableEvents, }: BaseBarStackProps<XScale, YScale, Datum>): JSX.Element | null;
export default BaseBarStack;
//# sourceMappingURL=BaseBarStack.d.ts.map