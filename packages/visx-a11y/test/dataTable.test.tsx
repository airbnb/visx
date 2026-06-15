import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import type { ChartA11yConfig } from '../src';
import { ChartA11yDataTable } from '../src/react';

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

function getTableText(table: HTMLElement) {
  return Array.from(table.querySelectorAll('tbody tr')).map((row) =>
    Array.from(row.children).map((cell) => cell.textContent),
  );
}

describe('ChartA11yDataTable', () => {
  it('renders a visually hidden data table by default', () => {
    const { container } = render(<ChartA11yDataTable {...lineConfig} />);
    const table = container.querySelector('table');

    expect(table?.id).toBe('revenue-chart-table');
    expect(table?.style.position).toBe('absolute');
    expect(table?.style.width).toBe('1px');
    expect(table?.querySelector('caption')?.textContent).toBe('Revenue');
    expect(
      Array.from(table?.querySelectorAll('thead th') ?? []).map((cell) => cell.textContent),
    ).toEqual(['Category', 'Revenue']);
    expect(table ? getTableText(table) : []).toEqual([
      ['Jan', '$10'],
      ['Feb', '$25'],
    ]);
  });

  it('can render a visible data table', () => {
    const { container } = render(
      <ChartA11yDataTable {...lineConfig} visible style={{ border: '1px solid red' }} />,
    );
    const table = container.querySelector('table');

    expect(table?.style.position).toBe('');
    expect(table?.style.border).toBe('1px solid red');
  });

  it('uses one value column per series for multi-series data', () => {
    const { container } = render(
      <ChartA11yDataTable
        {...lineConfig}
        data={[data, [{ label: 'Jan', value: 8 }]]}
        series={[{ label: 'Desktop' }, { label: 'Mobile' }]}
      />,
    );
    const table = container.querySelector('table');

    expect(
      Array.from(table?.querySelectorAll('thead th') ?? []).map((cell) => cell.textContent),
    ).toEqual(['Category', 'Desktop', 'Mobile']);
    expect(table ? getTableText(table) : []).toEqual([
      ['Jan', '$10', '$8'],
      ['Feb', '$25', ''],
    ]);
  });

  it('escapes table text during server rendering', () => {
    const html = renderToString(
      <ChartA11yDataTable
        {...lineConfig}
        title="Revenue <Q1>"
        data={[{ label: 'Jan & Feb', value: 10 }]}
      />,
    );

    expect(html).toContain('Revenue &lt;Q1&gt;');
    expect(html).toContain('Jan &amp; Feb');
  });
});
