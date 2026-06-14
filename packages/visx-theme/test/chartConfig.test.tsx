import { render } from '@testing-library/react';
import { createRuntimeTheme } from '../src';
import type { ChartConfig } from '../src';
import { ThemeProvider, useChartConfig } from '../src/react';

const chartConfig = {
  revenue: { label: 'Revenue', color: 'var(--revenue-color)' },
  costs: { label: 'Costs' },
  profit: { label: 'Profit' },
} satisfies ChartConfig;

type ChartConfigResult = ReturnType<typeof useChartConfig<keyof typeof chartConfig>>;

function ChartConfigProbe({ onResult }: { onResult: (result: ChartConfigResult) => void }) {
  const result = useChartConfig(chartConfig, {
    order: ['revenue', 'costs', 'profit'],
  });

  onResult(result);

  return null;
}

function InvalidOrderProbe({ onResult }: { onResult: (result: ChartConfigResult) => void }) {
  const result = useChartConfig(chartConfig, {
    order: ['profit', 'profit', 'unknown' as never],
  });

  onResult(result);

  return null;
}

function IntegerKeyProbe({
  onResult,
}: {
  onResult: (result: ReturnType<typeof useChartConfig<'1' | '2' | 'alpha'>>) => void;
}) {
  const result = useChartConfig({
    '2': { label: 'Second' },
    '1': { label: 'First' },
    alpha: { label: 'Alpha' },
  });

  onResult(result);

  return null;
}

describe('useChartConfig', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns series metadata and accessors in explicit order', () => {
    const onResult = vi.fn();
    const theme = createRuntimeTheme('auto');

    render(<ChartConfigProbe onResult={onResult} />);

    expect(onResult).toHaveBeenCalledWith({
      series: [
        {
          key: 'revenue',
          label: 'Revenue',
          color: 'var(--revenue-color)',
        },
        {
          key: 'costs',
          label: 'Costs',
          color: theme.colors.categorical[1],
        },
        {
          key: 'profit',
          label: 'Profit',
          color: theme.colors.categorical[2],
        },
      ],
      getColor: expect.any(Function),
      getLabel: expect.any(Function),
    });

    const result = onResult.mock.calls[0][0] as ChartConfigResult;

    expect(result.getColor('revenue')).toBe('var(--revenue-color)');
    expect(result.getColor('costs')).toBe(theme.colors.categorical[1]);
    expect(result.getColor('profit')).toBe(theme.colors.categorical[2]);
    expect(result.getLabel('profit')).toBe('Profit');
  });

  it('keeps fallback color indices based on resolved order positions', () => {
    const onResult = vi.fn();

    render(<ChartConfigProbe onResult={onResult} />);

    const result = onResult.mock.calls[0][0] as ChartConfigResult;

    expect(result.series.map((series) => series.color)).toEqual([
      'var(--revenue-color)',
      'var(--chart-2, #10b981)',
      'var(--chart-3, #f59e0b)',
    ]);
  });

  it('uses the provider runtime theme for fallback colors', () => {
    const onResult = vi.fn();

    render(
      <ThemeProvider theme="dark">
        <ChartConfigProbe onResult={onResult} />
      </ThemeProvider>,
    );

    const result = onResult.mock.calls[0][0] as ChartConfigResult;

    expect(result.getColor('costs')).toBe('var(--chart-2, #34d399)');
  });

  it('treats options.order as a strict complete ordering control', () => {
    const onResult = vi.fn();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<InvalidOrderProbe onResult={onResult} />);

    const result = onResult.mock.calls[0][0] as ChartConfigResult;

    expect(result.series).toEqual([
      {
        key: 'profit',
        label: 'Profit',
        color: 'var(--chart-1, #3b82f6)',
      },
    ]);
    expect(result.getColor('revenue')).toBe('var(--chart-1, #3b82f6)');
    expect(result.getLabel('revenue')).toBe('revenue');
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useChartConfig ignored duplicate order key "profit".',
    );
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useChartConfig ignored order key "unknown" because it is not present in config.',
    );
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useChartConfig omitted config key "revenue" because it is absent from options.order.',
    );
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useChartConfig omitted config key "costs" because it is absent from options.order.',
    );
  });

  it('warns for integer-like config keys when explicit order is omitted', () => {
    const onResult = vi.fn();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<IntegerKeyProbe onResult={onResult} />);

    const result = onResult.mock.calls[0][0] as ReturnType<
      typeof useChartConfig<'1' | '2' | 'alpha'>
    >;

    expect(result.series.map(({ key }) => key)).toEqual(['1', '2', 'alpha']);
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useChartConfig received integer-like config keys (1, 2) without an explicit order; pass options.order to make series order stable.',
    );
  });
});
