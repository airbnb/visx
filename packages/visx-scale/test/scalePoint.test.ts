import { scalePoint } from '../src';

describe('scalePoint', () => {
  it('should be defined', () => {
    expect(scalePoint).toBeDefined();
  });
  it('set domain', () => {
    const domain = [0, 350];
    const scale = scalePoint({ domain });
    expect(scale.domain()).toEqual(domain);
  });
  it('set range', () => {
    const scale = scalePoint({ range: [2, 3] });
    expect(scale.range()).toEqual([2, 3]);
  });
  it('set reverse', () => {
    expect(scalePoint({ reverse: true }).range()).toEqual([1, 0]);
    expect(scalePoint({ range: [1, 2], reverse: true }).range()).toEqual([2, 1]);
  });
  it('set align', () => {
    expect(scalePoint({ align: 0.5 }).align()).toEqual(0.5);
  });
  it('set padding', () => {
    expect(scalePoint({ padding: 0.5 }).padding()).toEqual(0.5);
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scalePoint({ domain: ['a', 'b', 'c'], range: [1.1, 3.5], round: true });
      expect(scale('a')).toEqual(1);
      expect(scale('b')).toEqual(2);
      expect(scale('c')).toEqual(3);
    });
    it('false', () => {
      const scale = scalePoint({ domain: ['a', 'b', 'c'], range: [1.1, 3.5], round: false });
      expect(scale('a')).toEqual(1.1);
      expect(scale('b')).toEqual(2.3);
      expect(scale('c')).toEqual(3.5);
    });
  });
});
