import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FloatingTooltip } from '../src/floating';
import type { TooltipAnchor } from '../src/floating';

function rect(left: number, top: number, width = 0, height = 0) {
  return {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  } as DOMRect;
}

function TriggerTooltip({
  anchor,
  defaultOpen = false,
  id,
  onOpenChange,
  positionerId,
  role,
  triggerDisabled = false,
}: {
  anchor?: TooltipAnchor;
  defaultOpen?: boolean;
  id?: string;
  onOpenChange?: ReturnType<typeof vi.fn>;
  positionerId?: string;
  role?: 'tooltip' | 'label';
  triggerDisabled?: boolean;
}) {
  return (
    <FloatingTooltip.Provider delay={0} closeDelay={0} skipDelay={0}>
      <FloatingTooltip.Root
        anchor={anchor}
        data="trigger data"
        defaultOpen={defaultOpen}
        id={id}
        onOpenChange={onOpenChange}
        role={role}
      >
        <FloatingTooltip.Trigger
          disabled={triggerDisabled}
          render={(props, state) => (
            <button {...props} type="button" data-open={state.open}>
              Export
            </button>
          )}
        />
        <FloatingTooltip.Portal disabled>
          <FloatingTooltip.Positioner data-testid="positioner" id={positionerId}>
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

  it('does not wire interactions for disabled triggers', async () => {
    const onOpenChange = vi.fn();
    let triggerProps: React.HTMLProps<Element> | undefined;

    render(
      <FloatingTooltip.Provider delay={0} closeDelay={0} skipDelay={0}>
        <FloatingTooltip.Root data="trigger data" onOpenChange={onOpenChange}>
          <FloatingTooltip.Trigger
            disabled
            render={(props, state) => {
              triggerProps = props;

              return (
                <button {...props} type="button" data-open={state.open}>
                  Export
                </button>
              );
            }}
          />
          <FloatingTooltip.Portal disabled>
            <FloatingTooltip.Positioner data-testid="positioner">
              <FloatingTooltip.Content>Download chart data</FloatingTooltip.Content>
            </FloatingTooltip.Positioner>
          </FloatingTooltip.Portal>
        </FloatingTooltip.Root>
      </FloatingTooltip.Provider>,
    );

    const trigger = screen.getByRole('button', { name: 'Export' });

    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    expect(trigger).toHaveAttribute('data-disabled', '');
    expect(triggerProps?.onMouseEnter).toBeUndefined();
    expect(triggerProps?.onFocus).toBeUndefined();

    fireEvent.mouseEnter(trigger);
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(trigger).toHaveAttribute('data-open', 'false');
      expect(screen.queryByText('Download chart data')).not.toBeInTheDocument();
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

  it('uses a stable root id for trigger ARIA wiring', async () => {
    render(<TriggerTooltip id="export-tooltip" />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('positioner')).toHaveAttribute('id', 'export-tooltip');
      expect(trigger).toHaveAttribute('aria-describedby', 'export-tooltip');
    });
  });

  it('supports label role ARIA wiring', async () => {
    render(<TriggerTooltip id="export-tooltip" role="label" />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('positioner')).toHaveAttribute('id', 'export-tooltip');
      expect(trigger).toHaveAttribute('aria-labelledby', 'export-tooltip');
      expect(trigger).not.toHaveAttribute('aria-describedby');
    });
  });

  it('lets a positioner id override the root id for trigger ARIA wiring', async () => {
    render(<TriggerTooltip id="export-tooltip" positionerId="custom-positioner-id" />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('positioner')).toHaveAttribute('id', 'custom-positioner-id');
      expect(trigger).toHaveAttribute('aria-describedby', 'custom-positioner-id');
    });
  });

  it('uses the trigger as the positioning reference when no explicit anchor exists', async () => {
    const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
    rectSpy.mockImplementation(function getRect() {
      return this.textContent === 'Export'
        ? rect(120, 160, 40, 20)
        : rect(0, 0, 80, 30);
    });

    render(<TriggerTooltip />);

    const trigger = screen.getByRole('button', { name: 'Export' });
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('positioner')).toBeInTheDocument();
      expect(screen.getByText('Download chart data')).toBeInTheDocument();
      expect(screen.getByTestId('positioner').style.transform).not.toBe('translate(0px, 0px)');
    });

    rectSpy.mockRestore();
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
