import { vi, describe, it, expect, afterEach } from 'vitest';
import { ResizeObserver } from '@juggle/resize-observer';
import { act, render } from '@testing-library/react';
import { ParentSize } from '../src';
import type { ResizeObserverPolyfill } from '../src/types';

describe('<ParentSize />', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(ParentSize).toBeDefined();
  });
  it('does not throw', () => {
    const wrapper = render(
      <ParentSize resizeObserverPolyfill={ResizeObserver}>
        {() => <div data-testid="test" />}
      </ParentSize>,
    );
    expect(wrapper.findByTestId('test')).not.toBeNull();
  });

  it('should report dimensions to children after ResizeObserver fires', () => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    type ROEntry = { contentRect: { left: number; top: number; width: number; height: number } };
    type ROCallback = (entries: ROEntry[]) => void;
    let observerCallback: ROCallback | null = null;

    class MockResizeObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      constructor(cb: ROCallback) {
        observerCallback = cb;
      }
    }

    let reportedDimensions = { width: -1, height: -1, top: -1, left: -1 };

    render(
      <ParentSize resizeObserverPolyfill={MockResizeObserver as unknown as ResizeObserverPolyfill}>
        {({ width, height, top, left }) => {
          reportedDimensions = { width, height, top, left };
          return <div data-testid="child" />;
        }}
      </ParentSize>,
    );

    // Simulate the ResizeObserver firing with dimensions
    act(() => {
      observerCallback?.([{ contentRect: { width: 800, height: 600, top: 0, left: 0 } }]);
    });

    expect(reportedDimensions.width).toBe(800);
    expect(reportedDimensions.height).toBe(600);
  });

  describe('two-div structure', () => {
    it('renders an outer div with position: relative and 100% dimensions', () => {
      const { container } = render(
        <ParentSize resizeObserverPolyfill={ResizeObserver}>
          {() => <div data-testid="child" />}
        </ParentSize>,
      );
      const outer = container.firstElementChild as HTMLElement;
      expect(outer.style.position).toBe('relative');
      expect(outer.style.width).toBe('100%');
      expect(outer.style.height).toBe('100%');
    });

    it('renders an inner measurement div with position: absolute and full coverage', () => {
      const { container } = render(
        <ParentSize resizeObserverPolyfill={ResizeObserver}>
          {() => <div data-testid="child" />}
        </ParentSize>,
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

    it('attaches parentRef to the inner measurement div', () => {
      vi.useFakeTimers();
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        cb(0);
        return 0;
      });
      vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

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

      const { container } = render(
        <ParentSize
          resizeObserverPolyfill={MockResizeObserver as unknown as ResizeObserverPolyfill}
        >
          {() => <div />}
        </ParentSize>,
      );

      const outer = container.firstElementChild as HTMLElement;
      const inner = outer.firstElementChild as HTMLElement;
      expect(observedElement).toBe(inner);
    });

    it('applies className and restProps to the outer div', () => {
      const { container } = render(
        <ParentSize
          resizeObserverPolyfill={ResizeObserver}
          className="my-class"
          data-testid="parent-wrapper"
          id="outer"
        >
          {() => <div />}
        </ParentSize>,
      );
      const outer = container.firstElementChild as HTMLElement;
      expect(outer.className).toBe('my-class');
      expect(outer.getAttribute('data-testid')).toBe('parent-wrapper');
      expect(outer.id).toBe('outer');
    });

    it('merges custom style prop into the outer div styles', () => {
      const { container } = render(
        <ParentSize resizeObserverPolyfill={ResizeObserver} style={{ background: 'red' }}>
          {() => <div />}
        </ParentSize>,
      );
      const outer = container.firstElementChild as HTMLElement;
      expect(outer.style.position).toBe('relative');
      expect(outer.style.width).toBe('100%');
      expect(outer.style.background).toBe('red');
    });

    it('allows parentSizeStyles to override the outer div styles', () => {
      const { container } = render(
        <ParentSize
          resizeObserverPolyfill={ResizeObserver}
          parentSizeStyles={{ width: '50%', height: '300px' }}
        >
          {() => <div />}
        </ParentSize>,
      );
      const outer = container.firstElementChild as HTMLElement;
      expect(outer.style.width).toBe('50%');
      expect(outer.style.height).toBe('300px');
      // position: relative is still applied so inner absolute div works
      expect(outer.style.position).toBe('relative');
    });

    it('merges style with parentSizeStyles when both are provided', () => {
      const { container } = render(
        <ParentSize
          resizeObserverPolyfill={ResizeObserver}
          parentSizeStyles={{ width: '50%', height: '300px' }}
          style={{ background: 'blue' }}
        >
          {() => <div />}
        </ParentSize>,
      );
      const outer = container.firstElementChild as HTMLElement;
      expect(outer.style.width).toBe('50%');
      expect(outer.style.height).toBe('300px');
      expect(outer.style.background).toBe('blue');
      expect(outer.style.position).toBe('relative');
    });
  });
});
