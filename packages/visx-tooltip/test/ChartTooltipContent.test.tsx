import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChartTooltipContent } from '../src/floating';
import type { ChartTooltipConfig, ChartTooltipItem } from '../src/floating';

type Datum = {
  series: string;
  value: number;
};

function Icon({ item }: { item: ChartTooltipItem<Datum> }) {
  return <span data-testid={`icon-${item.key}`}>icon</span>;
}

const items: ChartTooltipItem<Datum>[] = [
  {
    key: 'revenue',
    datum: { series: 'revenue', value: 10 },
    label: 'Revenue item',
    rawValue: 10,
    value: 'ten',
    color: 'blue',
  },
  {
    key: 'expenses',
    datum: { series: 'expenses', value: 4 },
    rawValue: 4,
    color: 'red',
  },
  {
    key: 'hidden',
    rawValue: 1,
    hidden: true,
  },
];

describe('<ChartTooltipContent />', () => {
  it('filters hidden items and hidden config entries', () => {
    const config = {
      expenses: { hide: true },
    } satisfies ChartTooltipConfig<Datum>;

    render(<ChartTooltipContent items={items} config={config} />);

    expect(screen.getByText('Revenue item')).toBeInTheDocument();
    expect(screen.queryByText('expenses')).not.toBeInTheDocument();
    expect(screen.queryByText('hidden')).not.toBeInTheDocument();
  });

  it('applies label, value, color, icon, and formatter precedence from config', () => {
    const config = {
      revenue: {
        label: 'Revenue config',
        color: () => 'green',
        icon: Icon,
        formatLabel: (item) => `${item.key} formatted label`,
        formatValue: (value) => `$${value}`,
      },
      expenses: {
        label: (item) => `${item.key} label`,
        formatValue: (value) => `${Number(value) * 2}`,
      },
    } satisfies ChartTooltipConfig<Datum>;

    render(<ChartTooltipContent items={items} config={config} />);

    expect(screen.getByText('revenue formatted label')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByTestId('item-revenue')).toHaveStyle('--visx-tooltip-item-color: green');
    expect(screen.getByTestId('icon-revenue')).toBeInTheDocument();
    expect(screen.getByText('expenses label')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('orders by config order, then custom sorter, then input order', () => {
    const config = {
      expenses: { order: 0 },
      revenue: { order: 1 },
    } satisfies ChartTooltipConfig<Datum>;

    const { rerender } = render(<ChartTooltipContent items={items} config={config} />);

    expect(screen.getAllByTestId(/^item-/).map((item) => item.dataset.itemKey)).toEqual([
      'expenses',
      'revenue',
    ]);

    rerender(
      <ChartTooltipContent items={items} sortItems={(a, b) => b.key.localeCompare(a.key)} />,
    );

    expect(screen.getAllByTestId(/^item-/).map((item) => item.dataset.itemKey)).toEqual([
      'revenue',
      'expenses',
    ]);
  });

  it('supports custom label, item, and value renderers', () => {
    render(
      <ChartTooltipContent
        label="March"
        items={items.slice(0, 1)}
        renderLabel={({ label }) => <h2>{label}</h2>}
        renderValue={({ value }) => <strong>value: {value}</strong>}
        renderItem={({ item, label, value }) => (
          <p data-testid="custom-item">
            {item.key}:{label}:{value}
          </p>
        )}
      />,
    );

    expect(screen.getByRole('heading', { name: 'March' })).toBeInTheDocument();
    expect(screen.getByTestId('custom-item')).toHaveTextContent('revenue:Revenue item:value: ten');
  });

  it('returns null when no visible items remain', () => {
    const { container } = render(
      <ChartTooltipContent
        items={[{ key: 'only', hidden: true }]}
        config={{ only: { hide: true } }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('uses getItemKey for row keys and renders basic data attributes', () => {
    render(
      <ChartTooltipContent
        label="Total"
        items={items.slice(0, 2)}
        getItemKey={(item) => `row-${item.key}`}
      />,
    );

    expect(screen.getByTestId('chart-tooltip-content')).toHaveAttribute(
      'data-visx-chart-tooltip',
      '',
    );
    expect(screen.getByText('Total')).toHaveAttribute('data-visx-chart-tooltip-label', '');
    expect(screen.getByTestId('item-revenue')).toHaveAttribute('data-item-key', 'revenue');
  });
});
