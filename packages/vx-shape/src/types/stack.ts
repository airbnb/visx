import { STACK_ORDERS } from '../util/stackOrder';
import { STACK_OFFSETS } from '../util/stackOffset';

/** Unique key for item in a stack. */
export type StackKey = string | number;

export type BaseStackProps<Datum, Key> = {
  /** Array of data for which generates a stack. */
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
