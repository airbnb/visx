import { render } from '@testing-library/react';
import { ThemeScope } from '../src';
import type { ChartConfig } from '../src';
import { ThemeProvider, useAxisStyle, useChartConfig, useGridStyle } from '../src/react';

const shadcnChartConfig = {
  revenue: { label: 'Revenue' },
  expenses: { label: 'Expenses', color: 'var(--destructive)' },
} satisfies ChartConfig<'revenue' | 'expenses'>;

function ShadcnChart({ onRender }: { onRender: () => void }) {
  const axisStyle = useAxisStyle('bottom');
  const gridStyle = useGridStyle();
  const { getColor, getLabel } = useChartConfig(shadcnChartConfig, {
    order: ['revenue', 'expenses'],
  });

  onRender();

  return (
    <svg aria-label="Revenue chart" width={320} height={180}>
      <rect data-testid="surface" width={320} height={180} fill="var(--background, #ffffff)" />
      <line
        data-testid="grid"
        x1={24}
        x2={296}
        y1={120}
        y2={120}
        stroke={gridStyle.stroke}
        strokeWidth={gridStyle.strokeWidth}
      />
      <path
        data-testid="revenue"
        d="M24 140 L112 90 L208 104 L296 56"
        fill="none"
        stroke={getColor('revenue')}
        strokeWidth={2}
      />
      <rect
        data-testid="expenses"
        x={48}
        y={96}
        width={36}
        height={44}
        fill={getColor('expenses')}
      />
      <text
        data-testid="tick"
        x={24}
        y={160}
        fill={axisStyle.tickLabelProps.fill}
        fontFamily={axisStyle.tickLabelProps.fontFamily}
        fontSize={axisStyle.tickLabelProps.fontSize}
      >
        {getLabel('revenue')}
      </text>
    </svg>
  );
}

describe('shadcn/ui integration smoke', () => {
  it('lets ThemeScope wrap shadcn chart variables without generating theme variables', () => {
    const { container } = render(
      <ThemeScope theme="auto" className="chart-shell" style={{ '--chart-1': 'var(--brand)' }}>
        <span>chart</span>
      </ThemeScope>,
    );
    const scope = container.firstElementChild as HTMLElement;

    expect(scope.className).toBe('chart-shell');
    expect(scope.style.getPropertyValue('--chart-1')).toBe('var(--brand)');
    expect(scope.style.getPropertyValue('--chart-2')).toBe('');
    expect(scope.style.getPropertyValue('--background')).toBe('');
  });

  it('passes shadcn CSS variables through auto mode and updates on class toggles', () => {
    const onRender = vi.fn();
    const { container } = render(
      <div data-testid="chart-shell" className="light">
        <style>
          {`
            .light {
              --chart-1: #2563eb;
              --background: #ffffff;
              --border: #e5e7eb;
              --muted-foreground: #64748b;
              --destructive: #dc2626;
            }

            .dark {
              --chart-1: #60a5fa;
              --background: #020617;
              --border: #334155;
              --muted-foreground: #94a3b8;
              --destructive: #f87171;
            }
          `}
        </style>
        <ThemeProvider theme="auto">
          <ShadcnChart onRender={onRender} />
        </ThemeProvider>
      </div>,
    );
    const shell = container.querySelector('[data-testid="chart-shell"]') as HTMLElement;
    const providerScope = shell.querySelector('div') as HTMLElement;
    const grid = container.querySelector('[data-testid="grid"]') as SVGLineElement;
    const revenue = container.querySelector('[data-testid="revenue"]') as SVGPathElement;
    const expenses = container.querySelector('[data-testid="expenses"]') as SVGRectElement;
    const surface = container.querySelector('[data-testid="surface"]') as SVGRectElement;
    const tick = container.querySelector('[data-testid="tick"]') as SVGTextElement;

    expect(providerScope.style.getPropertyValue('--chart-1')).toBe('');
    expect(providerScope.style.getPropertyValue('--background')).toBe('');
    expect(getComputedStyle(shell).getPropertyValue('--chart-1').trim()).toBe('#2563eb');
    expect(revenue.getAttribute('stroke')).toBe('var(--chart-1, #3b82f6)');
    expect(expenses.getAttribute('fill')).toBe('var(--destructive)');
    expect(surface.getAttribute('fill')).toBe('var(--background, #ffffff)');
    expect(grid.getAttribute('stroke')).toBe('var(--visx-grid-stroke, var(--border, #e5e7eb))');
    expect(tick.getAttribute('fill')).toBe('var(--muted-foreground, #6b7280)');

    shell.className = 'dark';

    expect(getComputedStyle(shell).getPropertyValue('--chart-1').trim()).toBe('#60a5fa');
    expect(onRender).toHaveBeenCalledTimes(1);
    expect(revenue.getAttribute('stroke')).toBe('var(--chart-1, #3b82f6)');
    expect(grid.getAttribute('stroke')).toBe('var(--visx-grid-stroke, var(--border, #e5e7eb))');
  });
});
