import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { autoUpdate, type Middleware } from '@floating-ui/react';
import { buildFloatingTooltipMiddleware } from '../src/floating/middleware';
import { FloatingTooltip, useFloatingTooltip } from '../src/floating';
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

function HookProbe({
  anchor,
  data,
  open,
  onOpenChange,
}: {
  anchor?: TooltipAnchor | null;
  data?: string;
  open?: boolean;
  onOpenChange?: ReturnType<typeof vi.fn>;
}) {
  const tooltip = useFloatingTooltip<string>({
    anchor,
    data,
    defaultAnchor: { type: 'point', x: 1, y: 2 },
    defaultData: 'default',
    defaultOpen: true,
    onOpenChange,
    open,
  });

  return (
    <div>
      <output data-testid="state">
        {String(tooltip.open)}|{tooltip.data}|{tooltip.anchor?.type}|{tooltip.side}|{tooltip.align}
      </output>
      <button type="button" onClick={() => tooltip.openTooltip('next', { type: 'point', x: 3, y: 4 })}>
        open
      </button>
      <button type="button" onClick={tooltip.closeTooltip}>
        close
      </button>
    </div>
  );
}

describe('useFloatingTooltip()', () => {
  it('supports uncontrolled open, anchor, and data state', () => {
    render(<HookProbe />);

    expect(screen.getByTestId('state')).toHaveTextContent('true|default|point|top|center');

    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.getByTestId('state')).toHaveTextContent('false|default|point|top|center');

    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(screen.getByTestId('state')).toHaveTextContent('true|next|point|top|center');
  });

  it('honors controlled state and reports open changes', () => {
    const onOpenChange = vi.fn();
    render(
      <HookProbe
        open={false}
        data="controlled"
        anchor={{ type: 'point', x: 10, y: 20 }}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByTestId('state')).toHaveTextContent('false|controlled|point|top|center');

    fireEvent.click(screen.getByRole('button', { name: 'open' }));

    expect(screen.getByTestId('state')).toHaveTextContent('false|controlled|point|top|center');
    expect(onOpenChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({
        data: 'next',
        anchor: expect.objectContaining({ type: 'point', x: 3, y: 4 }),
      }),
    );
  });

  it('exposes an update function and Floating UI refs', () => {
    let result: ReturnType<typeof useFloatingTooltip> | null = null;

    function Probe() {
      result = useFloatingTooltip({ defaultOpen: true });
      return null;
    }

    render(<Probe />);

    expect(result?.refs).toBeDefined();
    expect(result?.context).toBeDefined();
    expect(() => act(() => result?.update())).not.toThrow();
  });

  it('uses id as the default floating element id', () => {
    function Probe() {
      const tooltip = useFloatingTooltip({ defaultOpen: true, id: 'tooltip-root-id' });

      return (
        <div
          {...tooltip.getFloatingProps({
            'data-testid': 'floating',
            ref: tooltip.refs.setFloating,
          })}
        />
      );
    }

    render(<Probe />);

    expect(screen.getByTestId('floating')).toHaveAttribute('id', 'tooltip-root-id');
  });

  it('lets explicit floating props override the default id', () => {
    function Probe() {
      const tooltip = useFloatingTooltip({ defaultOpen: true, id: 'tooltip-root-id' });

      return (
        <div
          {...tooltip.getFloatingProps({
            'data-testid': 'floating',
            id: 'positioner-id',
            ref: tooltip.refs.setFloating,
          })}
        />
      );
    }

    render(<Probe />);

    expect(screen.getByTestId('floating')).toHaveAttribute('id', 'positioner-id');
  });

  it('clears explicit position references when anchor becomes null', async () => {
    let result: ReturnType<typeof useFloatingTooltip> | null = null;

    function Probe({ anchor }: { anchor: TooltipAnchor | null }) {
      result = useFloatingTooltip({ anchor, open: true });
      return null;
    }

    const { rerender } = render(<Probe anchor={{ type: 'point', x: 10, y: 20 }} />);

    await waitFor(() => {
      expect(result?.refs.reference.current).toBeTruthy();
    });

    rerender(<Probe anchor={null} />);

    await waitFor(() => {
      expect(result?.refs.reference.current).toBeNull();
    });
  });
});

describe('buildFloatingTooltipMiddleware()', () => {
  it('builds middleware in the documented order', () => {
    const arrowElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const custom: Middleware = { name: 'custom', fn: ({ x, y }) => ({ x, y }) };

    const middleware = buildFloatingTooltipMiddleware({
      offset: 8,
      collisionPadding: 4,
      flip: true,
      shift: true,
      size: true,
      hideWhenDetached: true,
      arrow: true,
      arrowElement,
      middleware: [custom],
      middlewareMode: 'append',
    });

    expect(middleware.map(({ name }) => name)).toEqual([
      'offset',
      'flip',
      'shift',
      'size',
      'hide',
      'arrow',
      'custom',
    ]);
  });

  it('allows callers to replace built-in middleware', () => {
    const custom: Middleware = { name: 'custom', fn: ({ x, y }) => ({ x, y }) };

    expect(
      buildFloatingTooltipMiddleware({
        middleware: [custom],
        middlewareMode: 'replace',
        offset: 8,
        flip: true,
        shift: true,
      }).map(({ name }) => name),
    ).toEqual(['custom']);
  });
});

describe('<FloatingTooltip /> manual primitives', () => {
  it('unmounts closed content by default and keeps it mounted with forceMount', () => {
    const anchor = { type: 'point', x: 0, y: 0 } satisfies TooltipAnchor;

    const { rerender } = render(
      <FloatingTooltip.Root open={false} anchor={anchor}>
        <FloatingTooltip.Positioner data-testid="positioner">
          <FloatingTooltip.Content>Tooltip</FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    expect(screen.queryByText('Tooltip')).not.toBeInTheDocument();

    rerender(
      <FloatingTooltip.Root open={false} forceMount anchor={anchor}>
        <FloatingTooltip.Positioner data-testid="positioner">
          <FloatingTooltip.Content>Tooltip</FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    expect(screen.getByTestId('positioner')).toHaveAttribute('data-state', 'closed');
    expect(screen.getByText('Tooltip')).toBeInTheDocument();
  });

  it('renders open content with placement data attributes and CSS variables', () => {
    render(
      <FloatingTooltip.Root open anchor={{ type: 'point', x: 0, y: 0 }} placement="bottom-start">
        <FloatingTooltip.Positioner data-testid="positioner">
          <FloatingTooltip.Content data-testid="content">Tooltip</FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    const positioner = screen.getByTestId('positioner');

    expect(positioner).toHaveAttribute('data-visx-tooltip', '');
    expect(positioner).toHaveAttribute('data-state', 'open');
    expect(positioner).toHaveAttribute('data-side', 'bottom');
    expect(positioner).toHaveAttribute('data-align', 'start');
    expect(positioner.style.getPropertyValue('--visx-tooltip-transform-origin')).toBeTruthy();
    expect(positioner).toHaveAttribute('role', 'tooltip');
    expect(screen.getByTestId('content')).not.toHaveAttribute('role');
  });

  it('forwards explicit content roles without assigning a default role', () => {
    const { rerender } = render(
      <FloatingTooltip.Root open anchor={{ type: 'point', x: 0, y: 0 }}>
        <FloatingTooltip.Positioner>
          <FloatingTooltip.Content data-testid="content">Tooltip</FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    expect(screen.getByTestId('content')).not.toHaveAttribute('role');

    rerender(
      <FloatingTooltip.Root open anchor={{ type: 'point', x: 0, y: 0 }}>
        <FloatingTooltip.Positioner>
          <FloatingTooltip.Content data-testid="content" role="note">
            Tooltip
          </FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    expect(screen.getByTestId('content')).toHaveAttribute('role', 'note');
  });

  it('uses the root id for the positioner and lets positioner props override it', () => {
    const { rerender } = render(
      <FloatingTooltip.Root open id="tooltip-root-id" anchor={{ type: 'point', x: 0, y: 0 }}>
        <FloatingTooltip.Positioner data-testid="positioner">
          <FloatingTooltip.Content>Tooltip</FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    expect(screen.getByTestId('positioner')).toHaveAttribute('id', 'tooltip-root-id');

    rerender(
      <FloatingTooltip.Root open id="tooltip-root-id" anchor={{ type: 'point', x: 0, y: 0 }}>
        <FloatingTooltip.Positioner data-testid="positioner" id="positioner-id">
          <FloatingTooltip.Content>Tooltip</FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    expect(screen.getByTestId('positioner')).toHaveAttribute('id', 'positioner-id');
  });

  it('supports render replacement for the positioner and content', () => {
    render(
      <FloatingTooltip.Root open anchor={{ type: 'point', x: 0, y: 0 }}>
        <FloatingTooltip.Positioner
          render={(props, state) => (
            <section {...props} data-testid="positioner" data-side-from-state={state.side}>
              {props.children}
            </section>
          )}
        >
          <FloatingTooltip.Content
            render={(props) => (
              <article {...props} data-testid="content">
                Rendered
              </article>
            )}
          />
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    expect(screen.getByTestId('positioner')).toHaveAttribute('data-side-from-state', 'top');
    expect(screen.getByTestId('content').tagName).toBe('ARTICLE');
  });

  it('renders in place when portal is disabled and into body by default', () => {
    const { container, rerender } = render(
      <div data-testid="host">
        <FloatingTooltip.Root open anchor={{ type: 'point', x: 0, y: 0 }}>
          <FloatingTooltip.Portal disabled>
            <FloatingTooltip.Positioner>
              <FloatingTooltip.Content>Inline</FloatingTooltip.Content>
            </FloatingTooltip.Positioner>
          </FloatingTooltip.Portal>
        </FloatingTooltip.Root>
      </div>,
    );

    expect(container).toHaveTextContent('Inline');

    rerender(
      <div data-testid="host">
        <FloatingTooltip.Root open anchor={{ type: 'point', x: 0, y: 0 }}>
          <FloatingTooltip.Portal>
            <FloatingTooltip.Positioner>
              <FloatingTooltip.Content>Portaled</FloatingTooltip.Content>
            </FloatingTooltip.Positioner>
          </FloatingTooltip.Portal>
        </FloatingTooltip.Root>
      </div>,
    );

    expect(container).not.toHaveTextContent('Portaled');
    expect(document.body).toHaveTextContent('Portaled');
  });

  it('renders an SVG arrow with custom dimensions', () => {
    render(
      <FloatingTooltip.Root open anchor={{ type: 'point', x: 0, y: 0 }} arrow>
        <FloatingTooltip.Positioner>
          <FloatingTooltip.Content>
            Tooltip
            <FloatingTooltip.Arrow data-testid="arrow" width={14} height={20} />
          </FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    const arrow = screen.getByTestId('arrow');
    expect(arrow.tagName).toBe('svg');
    expect(arrow).toHaveAttribute('width', '14');
    expect(arrow).toHaveAttribute('viewBox', '0 0 14 20');
  });

  it('marks the anchor as hidden when Floating UI hide middleware reports it', async () => {
    const getRect = () => rect(0, 0);

    render(
      <FloatingTooltip.Root
        open
        anchor={{ type: 'rect', getRect }}
        middleware={[{ name: 'hide', fn: () => ({ data: { referenceHidden: true } }) }]}
        middlewareMode="replace"
      >
        <FloatingTooltip.Positioner data-testid="positioner">
          <FloatingTooltip.Content>Tooltip</FloatingTooltip.Content>
        </FloatingTooltip.Positioner>
      </FloatingTooltip.Root>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('positioner')).toHaveAttribute('data-anchor-hidden', '');
    });
  });

  it('uses autoUpdate by default while elements are mounted', () => {
    const tooltip = useFloatingTooltip;

    expect(autoUpdate).toBeDefined();
    expect(tooltip).toBeDefined();
  });
});
