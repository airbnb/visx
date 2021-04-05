/// <reference types="react" />
import { SeriesPoint } from 'd3-shape';
import { ScaleInput } from '@visx/scale';
import { PositionScale, AddSVGProps, BaseBarStackProps, StackKey, Accessor } from '../types';
export declare type BarStackProps<Datum, Key extends StackKey = StackKey, XScale extends PositionScale = PositionScale, YScale extends PositionScale = PositionScale> = BaseBarStackProps<Datum, Key, XScale, YScale> & {
    /** Returns the value mapped to the x of a bar. */
    x: Accessor<Datum, ScaleInput<XScale>>;
    /** Returns the value mapped to the y0 of a bar. */
    y0?: Accessor<SeriesPoint<Datum>, ScaleInput<YScale>>;
    /** Returns the value mapped to the y1 of a bar. */
    y1?: Accessor<SeriesPoint<Datum>, ScaleInput<YScale>>;
};
export default function BarStackComponent<Datum, Key extends StackKey = StackKey, XScale extends PositionScale = PositionScale, YScale extends PositionScale = PositionScale>({ data, className, top, left, x, y0, y1, xScale, yScale, color, keys, value, order, offset, children, ...restProps }: AddSVGProps<BarStackProps<Datum, Key, XScale, YScale>, SVGRectElement>): JSX.Element;
//# sourceMappingURL=BarStack.d.ts.map