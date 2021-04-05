import React from 'react';
import { AxisScale } from '@visx/axis';
import { StackPathConfig } from '@visx/shape';
import { AreaProps } from '@visx/shape/lib/shapes/Area';
import { SeriesProps } from '../../../types';
import { BaseAreaSeriesProps } from './BaseAreaSeries';
declare type AreaStackChildProps<XScale extends AxisScale, YScale extends AxisScale, Datum extends object> = Omit<BaseAreaSeriesProps<XScale, YScale, Datum>, 'PathComponent' | 'curve'>;
export declare type BaseAreaStackProps<XScale extends AxisScale, YScale extends AxisScale, Datum extends object> = {
    /** `AreaSeries` elements, note we can't strictly enforce this with TS yet. */
    children: React.ReactElement<AreaStackChildProps<XScale, YScale, Datum>> | React.ReactElement<AreaStackChildProps<XScale, YScale, Datum>>[];
    /** Rendered component which is passed path props by BaseAreaStack after processing. */
    PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
    /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
    curve?: AreaProps<Datum>['curve'];
    /** Whether to render a Line along value of the Area shape (area is fill only). */
    renderLine?: boolean;
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'> & Pick<SeriesProps<XScale, YScale, Datum>, 'onPointerMove' | 'onPointerOut' | 'onPointerUp' | 'onBlur' | 'onFocus' | 'enableEvents'>;
declare function BaseAreaStack<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ PathComponent, children, curve, enableEvents, offset, onBlur, onFocus, onPointerMove, onPointerOut, onPointerUp, order, renderLine, }: BaseAreaStackProps<XScale, YScale, Datum>): JSX.Element | null;
export default BaseAreaStack;
//# sourceMappingURL=BaseAreaStack.d.ts.map