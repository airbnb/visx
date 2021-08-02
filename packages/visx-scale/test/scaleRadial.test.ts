import { scaleRadial } from '../src';

describe('sclaeRadial()', () => {
  it('should be defined', () => {
    expect(scaleRadial).toBeDefined();
  });

  it('set domain', () => {
    const domain = [1, 2];
    expect(scaleRadial({ domain: [1, 2] }).domain()).toEqual(domain);
  });

  it('set range', () => {
    const range = [1, 2];
    expect(scaleRadial({ range: [1, 2] }).range()).toEqual(range);
  });

  it('set unknown', () => {
    const scale = scaleRadial({ domain: [0, 10], unknown: 'green' });
    expect(scale('sandwich' as unknown)).toEqual('green');
  });

  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleRadial({ clamp: true });
      expect(scale(10)).toEqual(1);
    });
    it('false', () => {
      const scale = scaleRadial({ clamp: false });
      expect(scale(10)).toEqual(Math.sqrt(10));
    });
  });

  describe('set nice', () => {
    it('true', () => {
      const scale = scaleRadial({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scaleRadial({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });

  describe('set round', () => {
    it('true', () => {
      const scale = scaleRadial({ round: true });
      expect(scale(10)).toEqual(Math.round(Math.sqrt(10)));
      expect(scale(2.6)).toEqual(Math.round(Math.sqrt(2.6)));
    });
    it('false', () => {
      const scale = scaleRadial({ round: false });
      expect(scale(10)).toEqual(Math.sqrt(10));
      expect(scale(2.6)).toEqual(Math.sqrt(2.6));
    });
  });
});
