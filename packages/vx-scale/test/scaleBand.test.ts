import { scaleBand } from '../src';

describe('scaleBand', () => {
  it('should be defined', () => {
    expect(scaleBand).toBeDefined();
  });
  it('set domain', () => {
    const domain = [0, 350];
    const scale = scaleBand({ domain });
    expect(scale.domain()).toEqual(domain);
  });
  it('set range', () => {
    const scale = scaleBand({ range: [2, 3] });
    expect(scale.range()).toEqual([2, 3]);
  });
  it('set align', () => {
    expect(scaleBand({ align: 0.5 }).align()).toEqual(0.5);
  });
  it('set padding', () => {
    expect(scaleBand({ padding: 0.3 }).padding()).toEqual(0.3);
  });
  it('set paddingInner', () => {
    expect(scaleBand({ paddingInner: 0.7 }).paddingInner()).toEqual(0.7);
  });
  it('set paddingOuter', () => {
    expect(scaleBand({ paddingOuter: 0.7 }).paddingOuter()).toEqual(0.7);
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scaleBand({ domain: ['a', 'b', 'c'], range: [1.1, 3.5], round: true });
      expect(scale('a')).toEqual(2);
      expect(scale('b')).toEqual(2);
      expect(scale('c')).toEqual(2);
    });
    it('false', () => {
      const scale = scaleBand({ domain: ['a', 'b', 'c'], range: [1.1, 3.5], round: false });
      expect(scale('a')).toEqual(1.1);
      expect(scale('b')).toEqual(1.9);
      expect(scale('c')).toEqual(2.7);
    });
  });
});
