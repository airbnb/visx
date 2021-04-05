import React from 'react';
import { ScaleInput } from '@visx/scale';
import { PositionScale, DatumObject, AnyScaleBand, AddSVGProps, BaseBarGroupProps, BarGroup, GroupKey, Accessor } from '../types';
export declare type BarGroupProps<Datum extends DatumObject, Key extends GroupKey = GroupKey, X0Scale extends AnyScaleBand = AnyScaleBand, X1Scale extends AnyScaleBand = AnyScaleBand> = BaseBarGroupProps<Datum, Key> & {
    /** Returns the value mapped to the x0 (group position) of a bar */
    x0: Accessor<Datum, ScaleInput<X0Scale>>;
    /** @visx/scale or d3-scale that takes an x0 value (position of group) and maps it to an x0 axis position of the group. */
    x0Scale: X0Scale;
    /** @visx/scale or d3-scale that takes a group key and maps it to an x axis position (within a group). */
    x1Scale: X1Scale;
    /** @visx/scale or d3-scale that takes an y value (Datum[key]) and maps it to a y axis position. */
    yScale: PositionScale;
    /** Total height of the y-axis. */
    height: number;
    /** Override render function which is passed the computed BarGroups. */
    children?: (barGroups: BarGroup<Key>[]) => React.ReactNode;
};
/**
 * Generates bar groups as an array of objects and renders `<rect />`s for each datum grouped by `key`. A general setup might look like this:
 *
 * ```js
 * const data = [{
 *  date: date1,
 *  key1: value,
 *  key2: value,
 *  key3: value
 * }, {
 *  date: date2,
 *  key1: value,
 *  key2: value,
 *  key3: value,
 * }];
 *
 * const x0 = d => d.date;
 * const keys = [key1, key2, key3];
 *
 * const x0Scale = scaleBand({
 *  domain: data.map(x0),
 *  padding: 0.2
 * });
 * const x1Scale = scaleBand({
 *  domain: keys,
 *  padding: 0.1
 * });
 * const yScale = scaleLinear({
 *   domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => d[key]))))]
 * });
 * const color = scaleOrdinal({
 *   domain: keys,
 *   range: [blue, green, purple]
 * });
 * ```
 *
 * Example: [https://airbnb.io/visx/bargroup](https://airbnb.io/visx/bargroup)
 */
export default function BarGroupComponent<Datum extends DatumObject, Key extends GroupKey = GroupKey, X0Scale extends AnyScaleBand = AnyScaleBand, X1Scale extends AnyScaleBand = AnyScaleBand>({ data, className, top, left, x0, x0Scale, x1Scale, yScale, color, keys, height, children, ...restProps }: AddSVGProps<BarGroupProps<Datum, Key, X0Scale, X1Scale>, SVGRectElement>): JSX.Element;
//# sourceMappingURL=BarGroup.d.ts.map