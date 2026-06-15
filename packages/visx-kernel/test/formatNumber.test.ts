import { formatNumber } from '../src';

describe('formatNumber', () => {
  it('formats numbers with Intl options', () => {
    expect(
      formatNumber(1234.56, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
        useGrouping: false,
      }),
    ).toBe('1234.6');
  });

  it('accepts a locale override', () => {
    expect(formatNumber(1234.56, { locale: 'en-US' })).toBe('1,234.56');
  });
});
