/* This test verifies that these modules and types are exported correctly */
import {
  InternSet,
  InternMap,
  // @ts-expect-error no types
} from '@visx/vendor/internmap';

describe('internmap', () => {
  it('exports valid classes', () => {
    expect(InternSet).toBeDefined();
    expect(InternMap).toBeDefined();
  });
});
