/* This test verifies that these modules and types are exported correctly */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  InternSet,
  InternMap,
} from '@visx/vendor/internmap';

describe('internmap', () => {
  it('exports valid classes', () => {
    expect(InternSet).toBeDefined();
    expect(InternMap).toBeDefined();
  });
});
