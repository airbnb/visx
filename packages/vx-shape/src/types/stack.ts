import { SeriesPoint } from 'd3-shape';

import { STACK_ORDERS } from '../util/stackOrder';
import { STACK_OFFSETS } from '../util/stackOffset';
import { BarGroupBar } from './bar';

export type BaseStackProps<Datum, Key> = {
  /** Array of data for which to generate a stack. */
  data: Datum[];
  /** className applied to path element. */
  className?: string;
  /** Top offset of rendered Stack. */
  top?: number;
  /** Left offset of rendered Stack. */
  left?: number;
  /** Array of keys corresponding to stack layers. */
  keys?: Key[];
  /** Sets the stack offset to the pre-defined d3 offset, see https://github.com/d3/d3-shape#stack_offset. */
  offset?: keyof typeof STACK_OFFSETS;
  /** Sets the stack order to the pre-defined d3 function, see https://github.com/d3/d3-shape#stack_order. */
  order?: keyof typeof STACK_ORDERS;
  /** Sets the value accessor for a Datum, which defaults to d[key]. */
  value?: number | ((d: Datum, key: Key) => number);
};

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

export type BaseBarStackProps<Datum, Key> = BaseStackProps<Datum, Key> & {
  /** Returns the desired color for a bar with a given key and index. */
  color: (key: Key, index: number) => string;
  /** Override render function which is passed the configured arc generator as input. */
  children?: (stacks: BarStack<Datum, Key>[]) => React.ReactNode;
};
