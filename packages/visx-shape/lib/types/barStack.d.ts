/// <reference types="react" />
import { BarGroupBar } from './barGroup';
import { BaseStackProps, StackKey } from './stack';
import { PositionScale } from './base';
/**
 * Each series point j in a stack chart corresponds to the jth element in the input data.
 * Each point is represented as an array [y0, y1] where y0 is the lower value (baseline) and y1 is the upper value (topline);
 * the difference between y0 and y1 corresponds to the computed value for this point.
 *
 * SeriesPoint is a [number, number] two-element Array with added data and index properties
 * related to the data element which formed the basis for theSeriesPoint.
 */
export interface SeriesPoint<Datum> extends Array<number> {
    /**
     * Corresponds to y0, the lower value (baseline).
     */
    0: number;
    /**
     * Corresponds to y1, the upper value (topline).
     */
    1: number;
    /**
     * The data element underlying the series point.
     */
    data: Datum;
}
/** One BarStack is returned for each datum, which has multiple sub-bars (based on keys). */
export interface BarStack<Datum, Key> {
    index: number;
    key: Key;
    bars: (Omit<BarGroupBar<Key>, 'key' | 'value'> & {
        /** Processed bar Datum with bar bounds and original datum. */
        bar: SeriesPoint<Datum>;
        /** stack key */
        key: Key;
    })[];
}
export declare type BaseBarStackProps<Datum, Key extends StackKey = StackKey, XScale extends PositionScale = PositionScale, YScale extends PositionScale = PositionScale> = BaseStackProps<Datum, Key> & {
    /** @visx/scale or d3-scale that takes an x value and maps it to an x axis position. */
    xScale: XScale;
    /** @visx/scale or d3-scale that takes a y value and maps it to an y axis position. */
    yScale: YScale;
    /** Returns the desired color for a bar with a given key and index. */
    color: (key: Key, index: number) => string;
    /** Override render function which is passed the configured stack generator as input. */
    children?: (stacks: BarStack<Datum, Key>[]) => React.ReactNode;
};
//# sourceMappingURL=barStack.d.ts.map