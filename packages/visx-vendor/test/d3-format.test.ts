/* This test verifies that these modules and types are exported correctly */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  format,
  formatDefaultLocale,
  formatLocale,
  formatPrefix,
  formatSpecifier,
  FormatSpecifierObject,
} from '@visx/vendor/d3-format';

describe('d3-format', () => {
  it('exports valid functions', () => {
    expect(format).toBeInstanceOf(Function);
  });
});
