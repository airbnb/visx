import { generateChartDescription, generateDataTableHTML, getChartAriaProps } from '../src/server';
import type { ChartA11yConfig } from '../src/server';

type Datum = {
  label: string;
  value: number;
};

const data: Datum[] = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 25 },
  { label: 'Mar', value: 15 },
];

const lineConfig: ChartA11yConfig<Datum> = {
  id: 'revenue-chart',
  title: 'Revenue',
  chartType: 'line',
  data,
  x: (datum) => datum.label,
  y: (datum) => datum.value,
  yLabel: 'Revenue',
  formatY: (value) => `$${value}`,
  series: [{ label: 'Revenue' }],
};

describe('getChartAriaProps', () => {
  it('generates svg, series, and point semantics', () => {
    expect(getChartAriaProps(lineConfig)).toEqual({
      ids: {
        rootId: 'revenue-chart',
        descriptionId: 'revenue-chart-description',
        tableId: 'revenue-chart-table',
      },
      svg: {
        role: 'graphics-document',
        'aria-roledescription': 'line chart',
        'aria-label': 'Revenue',
        'aria-describedby': 'revenue-chart-description',
      },
      series: [
        {
          role: 'graphics-object',
          'aria-roledescription': 'series',
          'aria-label': 'Revenue',
        },
      ],
      points: [
        [
          {
            role: 'graphics-symbol',
            'aria-roledescription': 'data point',
            'aria-label': 'Revenue, Jan, $10',
          },
          {
            role: 'graphics-symbol',
            'aria-roledescription': 'data point',
            'aria-label': 'Revenue, Feb, $25',
          },
          {
            role: 'graphics-symbol',
            'aria-roledescription': 'data point',
            'aria-label': 'Revenue, Mar, $15',
          },
        ],
      ],
    });
  });

  it('generates deterministic ids from the title when an explicit id is not provided', () => {
    expect(
      getChartAriaProps({ ...lineConfig, id: undefined, title: 'Quarterly Revenue' }).ids,
    ).toEqual({
      rootId: 'visx-a11y-quarterly-revenue',
      descriptionId: 'visx-a11y-quarterly-revenue-description',
      tableId: 'visx-a11y-quarterly-revenue-table',
    });
  });

  it('omits point labels above the point description threshold', () => {
    expect(getChartAriaProps({ ...lineConfig, pointDescriptionThreshold: 2 }).points).toEqual([[]]);
  });
});

describe('generateChartDescription', () => {
  it('uses consumer descriptions when provided', () => {
    expect(generateChartDescription({ ...lineConfig, description: 'Custom description.' })).toBe(
      'Custom description.',
    );
  });

  it('summarizes small cartesian charts', () => {
    expect(generateChartDescription(lineConfig)).toBe(
      'line chart of Revenue over 3 data points. Values start at $10 for Jan, end at $15 for Mar, range from $10 at Jan to $25 at Feb.',
    );
  });

  it('summarizes dense charts statistically', () => {
    expect(generateChartDescription({ ...lineConfig, pointDescriptionThreshold: 2 })).toBe(
      'line chart of Revenue. 3 data points. Values range from $10 to $25 with an average of $16.666666666666668.',
    );
  });

  it('summarizes pie charts by segment share', () => {
    expect(
      generateChartDescription({
        ...lineConfig,
        chartType: 'pie',
        formatY: (value) => String(value),
      }),
    ).toBe('pie chart of Revenue. 3 segments. Largest: Feb, 25 (50%). Smallest: Jan, 10 (20%).');
  });
});

describe('generateDataTableHTML', () => {
  it('generates an escaped hidden table fallback', () => {
    const html = generateDataTableHTML({
      ...lineConfig,
      title: 'Revenue <Q1>',
      data: [{ label: 'Jan & Feb', value: 10 }],
    });

    expect(html).toContain('<table id="revenue-chart-table" style="position:absolute;');
    expect(html).toContain('<caption>Revenue &lt;Q1&gt;</caption>');
    expect(html).toContain('<th scope="col">Category</th>');
    expect(html).toContain('<th scope="col">Revenue</th>');
    expect(html).toContain('<th scope="row">Jan &amp; Feb</th><td>$10</td>');
  });

  it('uses one value column per series for multi-series data', () => {
    const html = generateDataTableHTML({
      ...lineConfig,
      data: [data, [{ label: 'Jan', value: 8 }]],
      series: [{ label: 'Desktop' }, { label: 'Mobile' }],
    });

    expect(html).toContain('<th scope="col">Desktop</th>');
    expect(html).toContain('<th scope="col">Mobile</th>');
    expect(html).toContain('<th scope="row">Jan</th><td>$10</td><td>$8</td>');
    expect(html).toContain('<th scope="row">Feb</th><td>$25</td><td></td>');
  });
});
