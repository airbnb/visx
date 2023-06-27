/* This test verifies that these modules and types are exported correctly */
import { InternSet, InternMap } from '@visx/vendor/internmap';

describe('internmap', () => {
  it('exports valid classes', () => {
    expect(InternSet).toBeDefined();
    expect(InternMap).toBeDefined();
  });
});
