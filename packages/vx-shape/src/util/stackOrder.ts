import {
  stackOrderAscending,
  stackOrderDescending,
  stackOrderInsideOut,
  stackOrderNone,
  stackOrderReverse,
} from 'd3-shape';

export const STACK_ORDERS = {
  ascending: stackOrderAscending,
  descending: stackOrderDescending,
  insideout: stackOrderInsideOut,
  none: stackOrderNone,
  reverse: stackOrderReverse,
};

export const STACK_ORDER_NAMES = Object.keys(STACK_ORDERS);

export default function stackOrder(order?: keyof typeof STACK_ORDERS) {
  return (order && STACK_ORDERS[order]) || STACK_ORDERS.none;
}
