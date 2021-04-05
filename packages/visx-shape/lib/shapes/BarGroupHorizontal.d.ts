import React from 'react';
import { ScaleInput } from '@visx/scale';
import { PositionScale, AnyScaleBand, DatumObject, AddSVGProps, BarGroupHorizontal, BaseBarGroupProps, GroupKey, Accessor } from '../types';
export declare type BarGroupHorizontalProps<Datum extends DatumObject, Key extends GroupKey = GroupKey, Y0Scale extends AnyScaleBand = AnyScaleBand, Y1Scale extends AnyScaleBand = AnyScaleBand> = BaseBarGroupProps<Datum, Key> & {
    /** Returns the value (Datum[key]) mapped to the x of a bar */
    x?: (barValue: number) => number;
    /** Returns the value mapped to the y0 (position of group) of a bar */
    y0: Accessor<Datum, ScaleInput<Y0Scale>>;
    /** @visx/scale or d3-scale that takes a key value (Datum[key]) and maps it to an x axis position (width of bar). */
    xScale: PositionScale;
    /** @visx/scale or d3-scale that takes a y0 value (position of group) and maps it to a y axis position. */
    y0Scale: Y0Scale;
    /** @visx/scale or d3-scale that takes a group key and maps it to an y axis position (within a group). */
    y1Scale: Y1Scale;
    /** Total width of the x-axis. */
    width: number;
    /** Override render function which is passed the computed Ba/rGroups. */
    children?: (barGroups: BarGroupHorizontal<Key>[]) => React.ReactNode;
};
export default function BarGroupHorizontalComponent<Datum extends DatumObject, Key extends GroupKey = GroupKey, Y0Scale extends AnyScaleBand = AnyScaleBand, Y1Scale extends AnyScaleBand = AnyScaleBand>({ data, className, top, left, x, y0, y0Scale, y1Scale, xScale, color, keys, width, children, ...restProps }: AddSVGProps<BarGroupHorizontalProps<Datum, Key, Y0Scale, Y1Scale>, SVGRectElement>): JSX.Element;
//# sourceMappingURL=BarGroupHorizontal.d.ts.map