import { scaleSymlog } from '../src';

describe('scaleSymlog', () => {
  it('should be defined', () => {
    expect(scaleSymlog).toBeDefined();
  });
  it('set domain', () => {
    const domain = [1, 2];
    expect(scaleSymlog({ domain: [1, 2] }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleSymlog({ range: [1, 2] }).range()).toEqual(range);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleSymlog({ clamp: true });
      expect(scale(10)).toEqual(1);
    });
    it('false', () => {
      const scale = scaleSymlog<number>({ clamp: false });
      expect(scale(10)?.toFixed(2)).toEqual('3.46');
    });
  });
  it('set constant', () => {
    const constant = 2;
    const scale = scaleSymlog({ constant });
    expect(scale.constant()).toEqual(constant);
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scaleSymlog({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scaleSymlog({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });
  describe('set zero', () => {
    it('true', () => {
      expect(scaleSymlog({ domain: [1, 2], zero: true }).domain()).toEqual([0, 2]);
      expect(scaleSymlog({ domain: [-2, -1], zero: true }).domain()).toEqual([-2, 0]);
      expect(scaleSymlog({ domain: [-2, 3], zero: true }).domain()).toEqual([-2, 3]);
    });
    it('false', () => {
      expect(scaleSymlog({ domain: [1, 2], zero: false }).domain()).toEqual([1, 2]);
      expect(scaleSymlog({ domain: [-2, -1], zero: false }).domain()).toEqual([-2, -1]);
      expect(scaleSymlog({ domain: [-2, 3], zero: false }).domain()).toEqual([-2, 3]);
    });
  });
  describe('set round', () => {
    it('true', () => {
      expect(scaleSymlog({ domain: [1, 3], round: true })(2)).toEqual(1);
    });
    it('false', () => {
      expect((scaleSymlog({ domain: [1, 3], round: false })(2) as number).toFixed(3)).toEqual(
        '0.585',
      );
    });
  });
});
