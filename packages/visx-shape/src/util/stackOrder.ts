import {
  stackOrderAscending,
  stackOrderDescending,
  stackOrderInsideOut,
  stackOrderNone,
  stackOrderReverse,
} from '@visx/vendor/d3-shape';

export const STACK_ORDERS = {
  ascending: stackOrderAscending,
  descending: stackOrderDescending,
  insideout: stackOrderInsideOut,
  none: stackOrderNone,
  reverse: stackOrderReverse,
} as const;

export type StackOrder = keyof typeof STACK_ORDERS;

export const STACK_ORDER_NAMES = Object.keys(STACK_ORDERS) as StackOrder[];

export default function stackOrder(order?: keyof typeof STACK_ORDERS) {
  return (order && STACK_ORDERS[order]) || STACK_ORDERS.none;
}
