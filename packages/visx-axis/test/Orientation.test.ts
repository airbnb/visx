import { Orientation } from '../src';

describe('Orientation', () => {
  test('it should be defined', () => {
    expect(Orientation).toBeDefined();
  });
  test('top should be defined', () => {
    expect(Orientation.top).toBeDefined();
  });
  test('left should be defined', () => {
    expect(Orientation.left).toBeDefined();
  });
  test('right should be defined', () => {
    expect(Orientation.right).toBeDefined();
  });
  test('bottom should be defined', () => {
    expect(Orientation.bottom).toBeDefined();
  });
});
