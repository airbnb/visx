import { SeriesPoint } from 'd3-shape';
import { BarGroupBar } from './barGroup';
import { BaseStackProps, StackKey } from './stack';
import { PositionScale } from './base';

export { SeriesPoint };

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

export type BaseBarStackProps<
  Datum,
  Key extends StackKey = StackKey,
  XScale extends PositionScale = PositionScale,
  YScale extends PositionScale = PositionScale
> = BaseStackProps<Datum, Key> & {
  /** @vx/scale or d3-scale that takes an x value and maps it to an x axis position. */
  xScale: XScale;
  /** @vx/scale or d3-scale that takes a y value and maps it to an y axis position. */
  yScale: YScale;
  /** Returns the desired color for a bar with a given key and index. */
  color: (key: Key, index: number) => string;
  /** Override render function which is passed the configured arc generator as input. */
  children?: (stacks: BarStack<Datum, Key>[]) => React.ReactNode;
};
