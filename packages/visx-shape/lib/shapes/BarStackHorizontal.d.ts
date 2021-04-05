/// <reference types="react" />
import { SeriesPoint } from 'd3-shape';
import { ScaleInput } from '@visx/scale';
import { AddSVGProps, PositionScale, BaseBarStackProps, StackKey, Accessor } from '../types';
export declare type BarStackHorizontalProps<Datum, Key extends StackKey = StackKey, XScale extends PositionScale = PositionScale, YScale extends PositionScale = PositionScale> = BaseBarStackProps<Datum, Key, XScale, YScale> & {
    /** Returns the value mapped to the x0 of a bar. */
    x0?: Accessor<SeriesPoint<Datum>, ScaleInput<XScale>>;
    /** Returns the value mapped to the x1 of a bar. */
    x1?: Accessor<SeriesPoint<Datum>, ScaleInput<XScale>>;
    /** Returns the value mapped to the y of a bar. */
    y: Accessor<Datum, ScaleInput<YScale>>;
};
export default function BarStackHorizontal<Datum, Key extends StackKey = StackKey, XScale extends PositionScale = PositionScale, YScale extends PositionScale = PositionScale>({ data, className, top, left, y, x0, x1, xScale, yScale, color, keys, value, order, offset, children, ...restProps }: AddSVGProps<BarStackHorizontalProps<Datum, Key, XScale, YScale>, SVGRectElement>): JSX.Element;
//# sourceMappingURL=BarStackHorizontal.d.ts.map