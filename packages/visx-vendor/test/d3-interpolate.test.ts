/* This test verifies that these modules and types are exported correctly */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  interpolate,
  NumberArray,
} from '@visx/vendor/d3-interpolate';

describe('d3-interpolate', () => {
  it('exports valid functions', () => {
    expect(interpolate).toBeInstanceOf(Function);
  });
});
