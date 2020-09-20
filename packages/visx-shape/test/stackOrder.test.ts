import { stackOrder, STACK_ORDERS, STACK_ORDER_NAMES } from '../src';

describe('STACK_ORDERS', () => {
  test('it should be defined', () => {
    expect(STACK_ORDERS).toBeDefined();
  });

  test("it's keys should match STACK_ORDER_NAMES", () => {
    expect(Object.keys(STACK_ORDERS)).toEqual(STACK_ORDER_NAMES);
  });
});

describe('stackOrders()', () => {
  test('it should default to d3.stackOrderNone', () => {
    // @ts-ignore allow invalid input
    const offset = stackOrder('x');
    expect(offset).toEqual(STACK_ORDERS.none);
  });

  test('it should return corresponding order for given order name', () => {
    const offset = stackOrder('ascending');
    expect(offset).toEqual(STACK_ORDERS.ascending);
  });
});
