import { vi, describe, it, test, expect, afterEach } from 'vitest';
import { ResizeObserver } from '@juggle/resize-observer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import type { WithParentSizeProvidedProps, ResizeObserverPolyfill } from '../src';
import { withParentSize } from '../src';

interface ComponentProps extends WithParentSizeProvidedProps {
  // only there to ensure that TS allows enhanced component to have own props, different than the ones passed by the HOC
  role: string;
}

function Component({ parentWidth, parentHeight, role }: ComponentProps) {
  return (
    <div data-testid="Component" role={role} style={{ width: parentWidth, height: parentHeight }} />
  );
}

describe('withParentSize', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('it should be defined', () => {
    expect(withParentSize).toBeDefined();
  });

  test('it should pass parentWidth and parentHeight props to its child', () => {
    const WrappedComponent = withParentSize(Component, ResizeObserver);

    // @ts-expect-error ensure unknown types still error
    render(<WrappedComponent unknown="prop" />);

    const { getByTestId } = render(
      <WrappedComponent role="img" initialWidth={200} initialHeight={200} />,
    );

    const RenderedComponent = getByTestId('Component');
    expect(RenderedComponent).toHaveStyle('width: 200px; height: 200px');
  });

  describe('two-div structure', () => {
    it('renders an outer div with position: relative and 100% dimensions', () => {
      const WrappedComponent = withParentSize(Component, ResizeObserver);
      const { container } = render(
        <WrappedComponent role="img" initialWidth={200} initialHeight={200} />,
      );
      const outer = container.firstElementChild as HTMLElement;
      expect(outer.style.position).toBe('relative');
      expect(outer.style.width).toBe('100%');
      expect(outer.style.height).toBe('100%');
    });

    it('renders an inner measurement div with position: absolute and full coverage', () => {
      const WrappedComponent = withParentSize(Component, ResizeObserver);
      const { container } = render(
        <WrappedComponent role="img" initialWidth={200} initialHeight={200} />,
      );
      const outer = container.firstElementChild as HTMLElement;
      const inner = outer.firstElementChild as HTMLElement;
      expect(inner.style.position).toBe('absolute');
      expect(inner.style.top).toBe('0px');
      expect(inner.style.right).toBe('0px');
      expect(inner.style.bottom).toBe('0px');
      expect(inner.style.left).toBe('0px');
      expect(inner.style.overflow).toBe('hidden');
    });

    it('attaches ResizeObserver to the inner measurement div', () => {
      let observedElement: Element | null = null;

      class MockResizeObserver {
        callback: unknown;
        observe = vi.fn((el: Element) => {
          observedElement = el;
        });
        unobserve = vi.fn();
        disconnect = vi.fn();
        constructor(cb: unknown) {
          this.callback = cb;
        }
      }

      const WrappedComponent = withParentSize(
        Component,
        MockResizeObserver as unknown as ResizeObserverPolyfill,
      );
      const { container } = render(
        <WrappedComponent role="img" initialWidth={200} initialHeight={200} />,
      );

      const outer = container.firstElementChild as HTMLElement;
      const inner = outer.firstElementChild as HTMLElement;
      expect(observedElement).toBe(inner);
    });
  });
});
