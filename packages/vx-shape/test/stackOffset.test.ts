import { stackOffset, STACK_OFFSETS, STACK_OFFSET_NAMES } from '../src';

describe('STACK_OFFSETS', () => {
  test('it should be defined', () => {
    expect(STACK_OFFSETS).toBeDefined();
  });

  test("it's keys should match STACK_OFFSET_NAMES", () => {
    expect(Object.keys(STACK_OFFSETS)).toEqual(STACK_OFFSET_NAMES);
  });
});

describe('stackOffset()', () => {
  test('it should default to d3.stackOffsetNone', () => {
    // @ts-ignore allow invalid input
    const offset = stackOffset('x');
    expect(offset).toEqual(STACK_OFFSETS.none);
  });

  test('it should return corresponding offset for given offset name', () => {
    const offset = stackOffset('expand');
    expect(offset).toEqual(STACK_OFFSETS.expand);
  });
});
