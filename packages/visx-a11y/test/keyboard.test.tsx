import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import type { ChartA11yConfig } from '../src';
import { normalizeChartA11yData, useChartA11y } from '../src/react';

type Datum = {
  category: string;
  value: number;
};

const monthlyData: Datum[] = [
  { category: 'Jan', value: 10 },
  { category: 'Feb', value: 25 },
  { category: 'Mar', value: 18 },
];

function ChartHarness({
  config,
  includeAnnouncer = false,
  includeDataTable = false,
}: {
  config: ChartA11yConfig<Datum>;
  includeAnnouncer?: boolean;
  includeDataTable?: boolean;
}) {
  const a11y = useChartA11y(config);
  const normalized = normalizeChartA11yData(config);
  const { Announcer, DataTable } = a11y;

  return (
    <>
      <svg data-testid="chart" {...a11y.svgProps}>
        <desc id={a11y.descriptionId}>{a11y.description}</desc>
        {normalized.series.map((series, seriesIndex) => (
          <g key={series.label} {...a11y.getSeriesProps(seriesIndex)}>
            {series.data.map((datum, index) => (
              <circle
                key={`${series.label}-${datum.category}`}
                data-testid={`point-${seriesIndex}-${index}`}
                {...a11y.getPointProps(seriesIndex, index)}
              />
            ))}
          </g>
        ))}
      </svg>
      {includeDataTable ? <DataTable visible /> : null}
      {includeAnnouncer ? <Announcer /> : null}
    </>
  );
}

function renderKeyboardChart(
  config: ChartA11yConfig<Datum>,
  options: Pick<Parameters<typeof ChartHarness>[0], 'includeAnnouncer' | 'includeDataTable'> = {},
) {
  const view = render(<ChartHarness config={config} {...options} />);
  const chart = screen.getByTestId('chart');

  chart.focus();

  return { ...view, chart };
}

function expectFocusedPoint(seriesIndex: number, index: number) {
  const point = screen.getByTestId(`point-${seriesIndex}-${index}`);

  expect(point.getAttribute('data-a11y-focused')).toBe('true');
  expect(point.getAttribute('tabindex')).toBe('0');
  expect(document.activeElement).toBe(point);
}

const lineConfig: ChartA11yConfig<Datum> = {
  id: 'line-chart',
  title: 'Revenue',
  chartType: 'line',
  data: monthlyData,
  x: (datum) => datum.category,
  y: (datum) => datum.value,
  yLabel: 'Revenue',
  formatY: (value) => `$${value}`,
  series: [{ label: 'Revenue' }],
};

describe('chart keyboard navigation', () => {
  it('exposes a tabbable chart root and keyboard help announcement', () => {
    expect.hasAssertions();

    const { chart } = renderKeyboardChart(
      {
        ...lineConfig,
        locale: {
          keyboardHelp: 'Use arrow keys to inspect revenue points.',
        },
      },
      { includeAnnouncer: true },
    );

    expect(chart.getAttribute('tabindex')).toBe('0');
    expect(document.activeElement).toBe(chart);

    fireEvent.keyDown(chart, { key: '?' });
    expect(screen.getByRole('status').textContent).toBe(
      'Use arrow keys to inspect revenue points.',
    );

    fireEvent.keyDown(chart, { key: 'F1' });
    expect(screen.getByRole('status').textContent).toBe(
      'Use arrow keys to inspect revenue points.',
    );
  });

  it('supports line chart point traversal and exiting data mode', () => {
    expect.hasAssertions();

    const onPointFocus = vi.fn();
    const { chart } = renderKeyboardChart({ ...lineConfig, onPointFocus });

    fireEvent.keyDown(chart, { key: 'Enter' });

    expectFocusedPoint(0, 0);
    expect(onPointFocus).toHaveBeenLastCalledWith({
      seriesIndex: 0,
      index: 0,
      datum: monthlyData[0],
    });

    fireEvent.keyDown(chart, { key: 'ArrowRight' });
    expectFocusedPoint(0, 1);
    expect(onPointFocus).toHaveBeenLastCalledWith({
      seriesIndex: 0,
      index: 1,
      datum: monthlyData[1],
    });

    fireEvent.keyDown(chart, { key: 'End' });
    expectFocusedPoint(0, 2);

    fireEvent.keyDown(chart, { key: 'Home' });
    expectFocusedPoint(0, 0);

    fireEvent.keyDown(chart, { key: 'Escape' });
    expect(document.activeElement).toBe(chart);
    expect(screen.getByTestId('point-0-0').getAttribute('data-a11y-focused')).toBeNull();
  });

  it('wraps bar chart category focus with horizontal arrows', () => {
    expect.hasAssertions();

    const { chart } = renderKeyboardChart({
      ...lineConfig,
      id: 'bar-chart',
      title: 'Quarterly revenue',
      chartType: 'bar',
    });

    fireEvent.keyDown(chart, { key: 'Enter' });
    fireEvent.keyDown(chart, { key: 'ArrowLeft' });
    expectFocusedPoint(0, 2);

    fireEvent.keyDown(chart, { key: 'ArrowRight' });
    expectFocusedPoint(0, 0);
  });

  it('wraps pie slice focus and preserves point labels', () => {
    expect.hasAssertions();

    const { chart } = renderKeyboardChart({
      id: 'pie-chart',
      title: 'Traffic share',
      chartType: 'pie',
      data: [
        { category: 'Organic', value: 60 },
        { category: 'Paid', value: 40 },
      ],
      x: (datum) => datum.category,
      y: (datum) => datum.value,
      formatY: (value) => `${value}%`,
      series: [{ label: 'Traffic' }],
    });

    fireEvent.keyDown(chart, { key: 'Enter' });
    expectFocusedPoint(0, 0);
    expect(screen.getByTestId('point-0-0').getAttribute('aria-label')).toBe('Organic, 60% (60%)');

    fireEvent.keyDown(chart, { key: 'ArrowRight' });
    expectFocusedPoint(0, 1);

    fireEvent.keyDown(chart, { key: 'ArrowRight' });
    expectFocusedPoint(0, 0);
  });

  it('moves across multi-series charts and supports chart boundary keys', () => {
    expect.hasAssertions();

    const desktopData = monthlyData;
    const mobileData: Datum[] = [
      { category: 'Jan', value: 6 },
      { category: 'Feb', value: 15 },
    ];
    const onPointFocus = vi.fn();
    const { chart } = renderKeyboardChart({
      id: 'multi-series-chart',
      title: 'Revenue by device',
      chartType: 'line',
      data: [desktopData, mobileData],
      x: (datum) => datum.category,
      y: (datum) => datum.value,
      formatY: (value) => `$${value}`,
      series: [{ label: 'Desktop' }, { label: 'Mobile' }],
      onPointFocus,
    });

    fireEvent.keyDown(chart, { key: 'Enter' });
    fireEvent.keyDown(chart, { key: 'ArrowRight' });
    expectFocusedPoint(0, 1);

    fireEvent.keyDown(chart, { key: 'ArrowDown' });
    expectFocusedPoint(1, 1);
    expect(onPointFocus).toHaveBeenLastCalledWith({
      seriesIndex: 1,
      index: 1,
      datum: mobileData[1],
    });

    fireEvent.keyDown(chart, { key: 'ArrowUp' });
    expectFocusedPoint(0, 1);

    fireEvent.keyDown(chart, { key: 'End', ctrlKey: true });
    expectFocusedPoint(1, 1);

    fireEvent.keyDown(chart, { key: 'Home', ctrlKey: true });
    expectFocusedPoint(0, 0);
  });

  it('keeps the fallback table available alongside keyboard exploration', () => {
    expect.hasAssertions();

    const { chart, container } = renderKeyboardChart(lineConfig, { includeDataTable: true });
    const table = container.querySelector('table');

    expect(table?.id).toBe('line-chart-table');
    expect(table?.querySelector('caption')?.textContent).toBe('Revenue');
    expect(
      Array.from(table?.querySelectorAll('thead th') ?? []).map((cell) => cell.textContent),
    ).toEqual(['Category', 'Revenue']);
    expect(
      Array.from(table?.querySelectorAll('tbody tr') ?? []).map((row) => row.textContent),
    ).toEqual(['Jan$10', 'Feb$25', 'Mar$18']);

    fireEvent.keyDown(chart, { key: 'Enter' });
    expectFocusedPoint(0, 0);
    expect(table?.querySelectorAll('tbody tr')).toHaveLength(3);
  });
});
