import { scaleUtc, scaleTime } from 'd3-scale';
import isUtcScale, { isLocalTimeInUtc } from '../../src/utils/isUtcScale';

describe('isUtcScale(scale)', () => {
  it('returns true for utc scale', () => {
    expect(isUtcScale(scaleUtc())).toEqual(true);
  });
  it('returns false for time scale (when local time is not UTC)', () => {
    // This check only works if local and utc time are different.
    // If the local time is equal UTC then it also returns true.
    expect(isUtcScale(scaleTime())).toEqual(isLocalTimeInUtc());
  });
});
