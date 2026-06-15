import {
  ChartA11yAnnouncer,
  ChartA11yDataTable,
  normalizeChartA11yData,
  useChartA11y,
  useChartKeyboardNav,
} from '../src';

describe('@visx/a11y scaffold', () => {
  it('exposes package entry points', () => {
    expect(normalizeChartA11yData).toBeDefined();
    expect(useChartA11y).toBeDefined();
    expect(useChartKeyboardNav).toBeDefined();
    expect(ChartA11yAnnouncer).toBeDefined();
    expect(ChartA11yDataTable).toBeDefined();
  });
});
