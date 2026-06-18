import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChartTooltip, useChartTooltip } from '../src/floating';
import type { ChartTooltipItem } from '../src/floating';

type Datum = {
  label: string;
  value: number;
};

const item: ChartTooltipItem<Datum> = {
  key: 'value',
  datum: { label: 'A', value: 10 },
  rawValue: 10,
};

function HookProbe({ hideDelay }: { hideDelay?: number }) {
  const tooltip = useChartTooltip<Datum>({ hideDelay, placement: 'right', offset: 12 });

  return (
    <div>
      <svg ref={tooltip.containerRef} data-testid="svg">
        <circle />
      </svg>
      <output data-testid="state">
        {String(tooltip.open)}|{tooltip.anchor?.type}|{tooltip.items.length}
      </output>
      <button
        type="button"
        onClick={() => tooltip.show({ anchor: { x: 4, y: 8 }, items: [item] })}
      >
        show local
      </button>
      <button
        type="button"
        onClick={() =>
          tooltip.show({ anchor: { type: 'svg-point', x: 10, y: 20 }, items: [item] })
        }
      >
        show svg
      </button>
      <button
        type="button"
        onClick={() => tooltip.update({ items: [{ ...item, rawValue: 20 }] })}
      >
        update
      </button>
      <button type="button" onClick={tooltip.hide}>
        hide
      </button>
      <ChartTooltip {...tooltip.tooltipProps} label="Value" />
    </div>
  );
}

describe('useChartTooltip()', () => {
  it('converts local CSS pixel points into container-point anchors', () => {
    render(<HookProbe />);

    fireEvent.click(screen.getByRole('button', { name: 'show local' }));

    expect(screen.getByTestId('state')).toHaveTextContent('true|container-point|1');
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('converts shorthand SVG points using the latest container ref', () => {
    render(<HookProbe />);

    fireEvent.click(screen.getByRole('button', { name: 'show svg' }));

    expect(screen.getByTestId('state')).toHaveTextContent('true|svg-point|1');
  });

  it('updates items without replacing the current anchor', () => {
    render(<HookProbe />);

    fireEvent.click(screen.getByRole('button', { name: 'show local' }));
    fireEvent.click(screen.getByRole('button', { name: 'update' }));

    expect(screen.getByTestId('state')).toHaveTextContent('true|container-point|1');
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('supports hide delay and cancels pending hide when shown again', () => {
    vi.useFakeTimers();

    render(<HookProbe hideDelay={100} />);

    fireEvent.click(screen.getByRole('button', { name: 'show local' }));
    fireEvent.click(screen.getByRole('button', { name: 'hide' }));
    fireEvent.click(screen.getByRole('button', { name: 'show svg' }));

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByTestId('state')).toHaveTextContent('true|svg-point|1');

    vi.useRealTimers();
  });
});

describe('<ChartTooltip />', () => {
  it('renders through a portal by default and inline when portal is false', () => {
    const anchor = { type: 'point', x: 0, y: 0 } as const;
    const { container, rerender } = render(
      <div>
        <ChartTooltip open anchor={anchor} items={[item]} label="Value" />
      </div>,
    );

    expect(container).not.toHaveTextContent('10');
    expect(document.body).toHaveTextContent('10');

    rerender(
      <div>
        <ChartTooltip open anchor={anchor} items={[item]} label="Value" portal={false} />
      </div>,
    );

    expect(container).toHaveTextContent('10');
  });

  it('supports renderContent and forwards positioning/content props', () => {
    render(
      <ChartTooltip
        open
        anchor={{ type: 'point', x: 0, y: 0 }}
        items={[item]}
        placement="right"
        positionerProps={{ 'data-testid': 'positioner', className: 'custom-positioner' }}
        contentProps={{ indicator: 'square' }}
        renderContent={({ items }) => <strong>custom {items.length}</strong>}
        portal={false}
      />,
    );

    expect(screen.getByTestId('positioner')).toHaveClass('custom-positioner');
    expect(screen.getByTestId('positioner')).toHaveAttribute('data-side', 'right');
    expect(screen.getByText('custom 1')).toBeInTheDocument();
  });

  it('lets explicit props win over floatingOptions', () => {
    render(
      <ChartTooltip
        open
        anchor={{ type: 'point', x: 0, y: 0 }}
        items={[item]}
        placement="left"
        floatingOptions={{ placement: 'bottom' }}
        positionerProps={{ 'data-testid': 'positioner' }}
        portal={false}
      />,
    );

    expect(screen.getByTestId('positioner')).toHaveAttribute('data-side', 'left');
  });
});
