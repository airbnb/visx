/* This test verifies that these modules and types are exported correctly */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  timeFormat,
  timeParse,
  timeFormatLocale,
  TimeLocaleObject,
  utcFormat,
  isoFormat,
} from '@visx/vendor/d3-time-format';

describe('d3-time-format', () => {
  it('exports valid functions', () => {
    expect(timeParse).toBeInstanceOf(Function);
    expect(timeFormat).toBeInstanceOf(Function);
  });
});
