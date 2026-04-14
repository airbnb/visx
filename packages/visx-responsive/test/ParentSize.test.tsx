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
});
