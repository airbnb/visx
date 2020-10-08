import TimezoneMock from 'timezone-mock';
import { scaleTime } from '../src';

describe('scaleTime()', () => {
  let domain: [Date, Date];
  let unniceDomain: [Date, Date];

  beforeAll(() => {
    TimezoneMock.register('US/Pacific');
    domain = [new Date(2020, 0, 1), new Date(2020, 0, 10)];
    unniceDomain = [new Date(2020, 0, 1), new Date(2020, 0, 9, 20)];
  });

  afterAll(() => {
    TimezoneMock.unregister();
  });

  it('should be defined', () => {
    expect(scaleTime).toBeDefined();
  });
  it('set domain', () => {
    expect(scaleTime({ domain }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleTime({ range: [1, 2] }).range()).toEqual(range);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleTime({ domain, range: [0, 10], clamp: true });
      expect(scale(new Date(2019, 11, 31))).toEqual(0);
    });
    it('false', () => {
      const scale = scaleTime({ domain, range: [0, 10], clamp: false });
      expect(scale(new Date(2019, 11, 31))?.toFixed(2)).toEqual('-1.11');
    });
  });
  it('set (color) interpolate', () => {
    const scale = scaleTime({
      domain,
      range: ['#ff0000', '#000000'],
      interpolate: 'lab',
    });
    expect(scale(new Date(2020, 0, 5))).toEqual('rgb(136, 28, 11)');
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scaleTime({
        domain: unniceDomain,
        nice: true,
      });
      expect(scale.domain()).toEqual(domain);
    });
    it('false', () => {
      const scale = scaleTime({ domain: unniceDomain, nice: false });
      expect(scale.domain()).toEqual(unniceDomain);
    });
    it('number', () => {
      const scale = scaleTime({ domain: unniceDomain, nice: 5 });
      expect(scale.domain()).toEqual([new Date(2020, 0, 1), new Date(2020, 0, 11)]);
    });
    it('time unit string', () => {
      const scale = scaleTime({ domain: unniceDomain, nice: 'hour' });
      expect(scale.domain()).toEqual(unniceDomain);
    });
    it('nice object', () => {
      const scale = scaleTime({ domain: unniceDomain, nice: { interval: 'hour', step: 3 } });
      expect(scale.domain()).toEqual([new Date(2020, 0, 1), new Date(2020, 0, 9, 21)]);
    });
    it('invalid nice object', () => {
      const scale = scaleTime({ domain: unniceDomain, nice: { interval: 'hour', step: NaN } });
      expect(scale.domain()).toEqual(unniceDomain);
    });
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scaleTime({
        domain,
        range: [1, 5],
        round: true,
      });
      expect(scale(new Date(2020, 0, 5))).toEqual(3);
    });
    it('false', () => {
      const scale = scaleTime({
        domain,
        range: [1, 5],
        round: false,
      });
      expect(scale(new Date(2020, 0, 5))?.toFixed(2)).toEqual('2.78');
    });
  });
});
