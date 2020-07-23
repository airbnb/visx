import { scaleUtc, scaleTime } from 'd3-scale';
import TimezoneMock from 'timezone-mock';
import isUtcScale from '../../src/utils/isUtcScale';

describe('isUtcScale(scale)', () => {
  it('returns true for utc scale', () => {
    expect(isUtcScale(scaleUtc())).toEqual(true);
  });
  describe('for time scale', () => {
    it('returns false when local time is not UTC', () => {
      TimezoneMock.register('US/Pacific');
      expect(isUtcScale(scaleTime())).toEqual(false);
      TimezoneMock.unregister();
    });
    it('returns true when local time is UTC', () => {
      TimezoneMock.register('UTC');
      expect(isUtcScale(scaleTime())).toEqual(true);
      TimezoneMock.unregister();
    });
  });
});
