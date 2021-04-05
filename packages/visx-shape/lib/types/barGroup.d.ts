import { DatumObject } from './base';
/** Unique key for item in a group. */
export declare type GroupKey = string | number;
export interface BarGroupBar<Key> {
    /** group key */
    key: Key;
    /** index of BarGroup (matches input Datum index). */
    index: number;
    /** group value (Datum[key]) */
    value: number;
    /** height of bar. */
    height: number;
    /** width of bar. */
    width: number;
    /** x position of bar. */
    x: number;
    /** y position of bar. */
    y: number;
    /** color of bar. */
    color: string;
}
interface BaseBarGroup<Key> {
    /** index of BarGroup (matches input Datum index). */
    index: number;
    /** bars within group, one for each key. */
    bars: BarGroupBar<Key>[];
}
/** One BarGroup is returned for each datum, which has multiple sub-bars (based on keys). */
export interface BarGroup<Key> extends BaseBarGroup<Key> {
    /** x0 position of bar group */
    x0: number;
}
/** One BarGroup is returned for each datum, which has multiple sub-bars (based on keys). */
export interface BarGroupHorizontal<Key> extends BaseBarGroup<Key> {
    /** y0 position of bar group */
    y0: number;
}
export interface BaseBarGroupProps<Datum extends DatumObject, Key extends GroupKey = GroupKey> {
    /** Array of data for which to generate grouped bars. */
    data: Datum[];
    /** Returns the desired color for a bar with a given key and index. */
    color: (key: Key, index: number) => string;
    /** Array of keys corresponding to stack layers. */
    keys: Key[];
    /** className applied to Bars. */
    className?: string;
    /** Top offset of rendered Bars. */
    top?: number;
    /** Left offset of rendered Bars. */
    left?: number;
}
export {};
//# sourceMappingURL=barGroup.d.ts.map