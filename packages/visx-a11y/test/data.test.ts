import {
  DEFAULT_POINT_DESCRIPTION_THRESHOLD,
  DEFAULT_CHART_A11Y_ID_PREFIX,
  normalizeChartA11yData,
} from '../src';

type Datum = {
  label: string;
  value: number;
};

const data: Datum[] = [
  { label: 'A', value: 1 },
  { label: 'B', value: 2 },
];

describe('normalizeChartA11yData', () => {
  it('normalizes a single flat series', () => {
    expect(normalizeChartA11yData({ data })).toEqual({
      series: [{ index: 0, label: 'Data', data }],
      isMultiSeries: false,
      pointCount: 2,
      maxSeriesLength: 2,
    });
  });

  it('normalizes nested multi-series data with labels', () => {
    expect(
      normalizeChartA11yData({
        data: [data, [data[0]]],
        series: [{ label: 'Desktop' }, { label: (index) => `Series ${index + 1}` }],
      }),
    ).toEqual({
      series: [
        { index: 0, label: 'Desktop', data },
        { index: 1, label: 'Series 2', data: [data[0]] },
      ],
      isMultiSeries: true,
      pointCount: 3,
      maxSeriesLength: 2,
    });
  });

  it('uses per-series data when flat data is paired with series configs', () => {
    const mobile = [{ label: 'A', value: 3 }];

    expect(
      normalizeChartA11yData({
        data,
        series: [
          { label: 'Desktop', data },
          { label: 'Mobile', data: mobile },
        ],
      }),
    ).toEqual({
      series: [
        { index: 0, label: 'Desktop', data },
        { index: 1, label: 'Mobile', data: mobile },
      ],
      isMultiSeries: true,
      pointCount: 3,
      maxSeriesLength: 2,
    });
  });
});

describe('@visx/a11y constants', () => {
  it('exposes defaults used across client and server helpers', () => {
    expect(DEFAULT_CHART_A11Y_ID_PREFIX).toBe('visx-a11y');
    expect(DEFAULT_POINT_DESCRIPTION_THRESHOLD).toBe(150);
  });
});
