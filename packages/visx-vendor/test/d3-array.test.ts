/* eslint-disable @typescript-eslint/no-unused-vars */
/* This test verifies that these modules and types are exported correctly */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  Adder,
  Bin,
  Bisector,
  bin,
  bisect,
  bisectCenter,
  bisectLeft,
  bisectRight,
  bisector,
  count,
} from '../esm/d3-array'; // @todo update to `@visx/vendor/d3-array`

describe('d3-array', () => {
  it('exports valid functions', () => {
    expect(bisect).toBeInstanceOf(Function);
  });
});
