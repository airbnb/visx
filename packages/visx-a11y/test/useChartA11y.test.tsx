import { act, render, renderHook } from '@testing-library/react';

import { useChartA11y } from '../src';
import type { ChartA11yConfig } from '../src';

type Datum = {
  label: string;
  value: number;
};

const data: Datum[] = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 25 },
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

describe('useChartA11y', () => {
  it('returns chart semantics and generated description metadata', () => {
    const { result } = renderHook(() => useChartA11y(lineConfig));

    expect(result.current.descriptionId).toBe('revenue-chart-description');
    expect(result.current.description).toBe(
      'line chart of Revenue over 2 data points. Values start at $10 for Jan, end at $25 for Feb, range from $10 at Jan to $25 at Feb.',
    );
    expect(result.current.svgProps).toEqual(
      expect.objectContaining({
        role: 'graphics-document',
        'aria-roledescription': 'line chart',
        'aria-label': 'Revenue',
        'aria-describedby': 'revenue-chart-description',
        tabIndex: 0,
      }),
    );
    expect(result.current.svgProps.ref).toEqual(expect.any(Function));
    expect(result.current.svgProps.onKeyDown).toEqual(expect.any(Function));
    expect(result.current.getSeriesProps(0)).toEqual({
      role: 'graphics-object',
      'aria-roledescription': 'series',
      'aria-label': 'Revenue',
    });
    expect(result.current.getPointProps(0, 1)).toEqual(
      expect.objectContaining({
        role: 'graphics-symbol',
        'aria-roledescription': 'data point',
        'aria-label': 'Revenue, Feb, $25',
        tabIndex: -1,
      }),
    );
    expect(result.current.mode).toBe('chart');
    expect(result.current.focusedPoint).toBeNull();
  });

  it('uses React ids when the hook has no explicit id', () => {
    const { result } = renderHook(() =>
      useChartA11y({ ...lineConfig, id: undefined, idPrefix: 'chart' }),
    );

    expect(result.current.descriptionId).toMatch(/^chart-[\w-]+-description$/);
    expect(result.current.descriptionId).not.toBe('chart-revenue-description');
  });

  it('can disable keyboard navigation props while keeping semantics', () => {
    const { result } = renderHook(() => useChartA11y({ ...lineConfig, keyboardNavEnabled: false }));

    expect(result.current.svgProps).toEqual(
      expect.objectContaining({
        role: 'graphics-document',
        'aria-label': 'Revenue',
      }),
    );
    expect(result.current.svgProps.tabIndex).toBeUndefined();
    expect(result.current.svgProps.onKeyDown).toBeUndefined();
  });

  it('preserves omitted point semantics above the point description threshold', () => {
    const { result } = renderHook(() =>
      useChartA11y({ ...lineConfig, pointDescriptionThreshold: 1 }),
    );
    const pointProps = result.current.getPointProps(0, 0);

    expect(pointProps.role).toBeUndefined();
    expect(pointProps['aria-roledescription']).toBeUndefined();
    expect(pointProps['aria-label']).toBeUndefined();
    expect(pointProps.tabIndex).toBe(-1);
  });

  it('returns a pre-bound data table component', () => {
    const { result } = renderHook(() => useChartA11y(lineConfig));
    const { DataTable } = result.current;
    const { container } = render(<DataTable />);
    const table = container.querySelector('table');

    expect(table?.id).toBe('revenue-chart-table');
    expect(table?.querySelector('caption')?.textContent).toBe('Revenue');
    expect(
      Array.from(table?.querySelectorAll('tbody tr') ?? []).map((row) => row.textContent),
    ).toEqual(['Jan$10', 'Feb$25']);
  });

  it('can disable the pre-bound data table component', () => {
    const { result } = renderHook(() => useChartA11y({ ...lineConfig, dataTableEnabled: false }));
    const { DataTable } = result.current;
    const { container } = render(<DataTable />);

    expect(container.firstChild).toBeNull();
  });

  it('returns a pre-bound announcer component and imperative announce helper', () => {
    const { result } = renderHook(() => useChartA11y(lineConfig));

    act(() => {
      result.current.announce('Revenue updated');
    });

    const { Announcer } = result.current;
    const { container } = render(<Announcer />);
    const region = container.querySelector('[role="status"]');

    expect(region?.textContent).toBe('Revenue updated');
  });
});
