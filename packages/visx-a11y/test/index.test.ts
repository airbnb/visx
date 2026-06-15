import { ChartA11yDataTable, normalizeChartA11yData } from '../src';

describe('@visx/a11y scaffold', () => {
  it('exposes package entry points', () => {
    expect(normalizeChartA11yData).toBeDefined();
    expect(ChartA11yDataTable).toBeDefined();
  });
});
