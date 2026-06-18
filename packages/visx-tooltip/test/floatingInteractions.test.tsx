import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FloatingTooltip } from '../src/floating';
import type { TooltipAnchor } from '../src/floating';

function TriggerTooltip({
  anchor,
  defaultOpen = false,
  onOpenChange,
}: {
  anchor?: TooltipAnchor;
  defaultOpen?: boolean;
  onOpenChange?: ReturnType<typeof vi.fn>;
}) {
  return (
    <FloatingTooltip.Provider delay={0} closeDelay={0} skipDelay={0}>
      <FloatingTooltip.Root
        anchor={anchor}
        data="trigger data"
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <FloatingTooltip.Trigger
          render={(props, state) => (
            <button {...props} type="button" data-open={state.open}>
              Export
            </button>
          )}
        />
        <FloatingTooltip.Portal disabled>
          <FloatingTooltip.Positioner data-testid="positioner">
            <FloatingTooltip.Content>Download chart data</FloatingTooltip.Content>
          </FloatingTooltip.Positioner>
        </FloatingTooltip.Portal>
      </FloatingTooltip.Root>
    </FloatingTooltip.Provider>
  );
}

describe('<FloatingTooltip.Trigger />', () => {
  it('renders through the render prop and opens on hover', async () => {
    render(<TriggerTooltip />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    expect(trigger).toHaveAttribute('data-visx-tooltip-trigger', '');
    expect(trigger).toHaveAttribute('data-open', 'false');
    expect(screen.queryByText('Download chart data')).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByText('Download chart data')).toBeInTheDocument();
      expect(trigger).toHaveAttribute('data-open', 'true');
    });
  });

  it('opens on focus', async () => {
    render(<TriggerTooltip />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByText('Download chart data')).toBeInTheDocument();
    });
  });

  it('dismisses on Escape', async () => {
    render(<TriggerTooltip defaultOpen />);

    expect(screen.getByText('Download chart data')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText('Download chart data')).not.toBeInTheDocument();
    });
  });

  it('wires trigger ARIA props to the positioned tooltip element', async () => {
    render(<TriggerTooltip />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    fireEvent.focus(trigger);

    await waitFor(() => {
      const describedBy = trigger.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy as string)).toBe(screen.getByTestId('positioner'));
    });
  });

  it('uses the trigger as the positioning reference when no explicit anchor exists', async () => {
    render(<TriggerTooltip />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('positioner')).toBeInTheDocument();
      expect(screen.getByText('Download chart data')).toBeInTheDocument();
    });
  });

  it('keeps an explicit anchor while using the trigger for interactions', async () => {
    const onOpenChange = vi.fn();
    const anchor = { type: 'point', x: 10, y: 20 } satisfies TooltipAnchor;

    render(<TriggerTooltip anchor={anchor} onOpenChange={onOpenChange} />);

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Export' }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(
        true,
        expect.objectContaining({
          anchor,
          data: 'trigger data',
          reason: 'hover',
        }),
      );
    });
  });
});
