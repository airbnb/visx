import { scaleBand } from '../src';

describe('scaleBand', () => {
  test('it should be defined', () => {
    expect(scaleBand).toBeDefined();
  });

  test('range param should set scale range', () => {
    const range = [2, 3] as [number, number];
    const scale = scaleBand({ range });
    expect(scale.range()).toEqual(range);
  });

  describe('round param should set rounding', () => {
    test('round = true', () => {
      const scale = scaleBand({ domain: ['a', 'b', 'c'], range: [1.1, 3.5], round: true });
      expect(scale('a')).toEqual(2);
      expect(scale('b')).toEqual(2);
      expect(scale('c')).toEqual(2);
    });
    test('round = false', () => {
      const scale = scaleBand({ domain: ['a', 'b', 'c'], range: [1.1, 3.5], round: false });
      expect(scale('a')).toEqual(1.1);
      expect(scale('b')).toEqual(1.9);
      expect(scale('c')).toEqual(2.7);
    });
  });

  test('domain param should set scale domain', () => {
    const domain = ['a', 'b'];
    const scale = scaleBand({ domain });
    expect(scale.domain()).toEqual(domain);
  });

  test('padding param should set scale padding inner & outer', () => {
    const padding = 0.75;
    const range = [0, 1] as [number, number];
    const domain = ['a', 'b'];
    const scale = scaleBand({ padding, range, domain });
    expect(scale.paddingInner()).toEqual(padding);
    expect(scale.paddingOuter()).toEqual(padding);
  });
});
