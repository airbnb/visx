import type { RefObject } from 'react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useParentSize from '../src/hooks/useParentSize';
import type { ResizeObserverPolyfill } from '../src/types';

// --- Mock ResizeObserver class (newable) ---
type ROEntry = { contentRect: { left: number; top: number; width: number; height: number } };
type ROCallback = (entries: ROEntry[]) => void;

class MockResizeObserver {
  static instances: MockResizeObserver[] = [];
  callback: ROCallback;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(cb: ROCallback) {
    this.callback = cb;
    MockResizeObserver.instances.push(this);
  }

  /** Helper: simulate the observer firing */
  trigger(rect: { width: number; height: number; top?: number; left?: number }) {
    this.callback([{ contentRect: { left: 0, top: 0, ...rect } }]);
  }
}

// --- Tests ---

describe('useParentSize', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Make rAF execute synchronously for predictable tests
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    MockResizeObserver.instances = [];
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should return initial dimensions of 0x0 by default', () => {
    const { result } = renderHook(() =>
      useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
      }),
    );

    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);
    expect(result.current.top).toBe(0);
    expect(result.current.left).toBe(0);
  });

  it('should respect initialSize', () => {
    const { result } = renderHook(() =>
      useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
        initialSize: { width: 100, height: 50 },
      }),
    );

    expect(result.current.width).toBe(100);
    expect(result.current.height).toBe(50);
  });

  it('should observe the element when parentRef callback is called', () => {
    const { result } = renderHook(() =>
      useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
      }),
    );

    const div = document.createElement('div');

    // Attach the ref — this should trigger observation
    act(() => {
      result.current.parentRef(div);
    });

    const observer = MockResizeObserver.instances.at(-1)!;
    expect(observer.observe).toHaveBeenCalledWith(div);
  });

  it('should update dimensions when ResizeObserver fires', () => {
    const { result } = renderHook(() =>
      useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
        enableDebounceLeadingCall: true,
      }),
    );

    const div = document.createElement('div');
    act(() => {
      result.current.parentRef(div);
    });

    const observer = MockResizeObserver.instances.at(-1)!;

    // Simulate a resize observation
    act(() => {
      observer.trigger({ width: 400, height: 300, top: 10, left: 20 });
    });

    expect(result.current.width).toBe(400);
    expect(result.current.height).toBe(300);
    expect(result.current.top).toBe(10);
    expect(result.current.left).toBe(20);
  });

  it('should disconnect observer on unmount', () => {
    const { result, unmount } = renderHook(() =>
      useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
      }),
    );

    const div = document.createElement('div');
    act(() => {
      result.current.parentRef(div);
    });

    const observer = MockResizeObserver.instances.at(-1)!;

    unmount();

    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('should re-observe when node changes', () => {
    const { result } = renderHook(() =>
      useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
      }),
    );

    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    // Attach first element
    act(() => {
      result.current.parentRef(div1);
    });

    const firstObserver = MockResizeObserver.instances.at(-1)!;
    expect(firstObserver.observe).toHaveBeenCalledWith(div1);

    // Detach then attach second element — simulates remount
    act(() => {
      result.current.parentRef(null);
    });
    act(() => {
      result.current.parentRef(div2);
    });

    expect(firstObserver.disconnect).toHaveBeenCalled();
    const lastObserver = MockResizeObserver.instances.at(-1)!;
    expect(lastObserver.observe).toHaveBeenCalledWith(div2);
  });

  it('should return the current node', () => {
    const { result } = renderHook(() =>
      useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
      }),
    );

    expect(result.current.node).toBeNull();

    const div = document.createElement('div');
    act(() => {
      result.current.parentRef(div);
    });

    expect(result.current.node).toBe(div);
  });

  describe('external ref support', () => {
    it('should forward the node to an external RefObject', () => {
      const externalRef = { current: null } satisfies RefObject<HTMLDivElement | null>;
      const { result } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef,
        }),
      );

      const div = document.createElement('div');
      act(() => {
        result.current.parentRef(div);
      });

      expect(externalRef.current).toBe(div);
    });

    it('should clear external RefObject when parentRef is called with null', () => {
      const externalRef = { current: null } satisfies RefObject<HTMLDivElement | null>;
      const { result } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef,
        }),
      );

      const div = document.createElement('div');
      act(() => {
        result.current.parentRef(div);
      });
      act(() => {
        result.current.parentRef(null);
      });

      expect(externalRef.current).toBeNull();
    });

    it('should call an external callback ref with the node', () => {
      const callbackRef = vi.fn();
      const { result } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef: callbackRef,
        }),
      );

      const div = document.createElement('div');
      act(() => {
        result.current.parentRef(div);
      });

      expect(callbackRef).toHaveBeenCalledWith(div);
    });

    it('should call external callback ref with null on detach', () => {
      const callbackRef = vi.fn();
      const { result } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef: callbackRef,
        }),
      );

      const div = document.createElement('div');
      act(() => {
        result.current.parentRef(div);
      });
      act(() => {
        result.current.parentRef(null);
      });

      expect(callbackRef).toHaveBeenCalledWith(null);
    });

    it('should still set the internal node when an external ref is provided', () => {
      const externalRef = { current: null } satisfies RefObject<HTMLDivElement | null>;
      const { result } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef,
        }),
      );

      const div = document.createElement('div');
      act(() => {
        result.current.parentRef(div);
      });

      expect(result.current.node).toBe(div);
    });

    it('should still observe the element and report dimensions with an external ref', () => {
      const externalRef = { current: null } satisfies RefObject<HTMLDivElement | null>;
      const { result } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef,
          enableDebounceLeadingCall: true,
        }),
      );

      const div = document.createElement('div');
      act(() => {
        result.current.parentRef(div);
      });

      const observer = MockResizeObserver.instances.at(-1)!;
      act(() => {
        observer.trigger({ width: 500, height: 400 });
      });

      expect(result.current.width).toBe(500);
      expect(result.current.height).toBe(400);
    });

    it('should not throw when ref is null', () => {
      const { result } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef: null,
        }),
      );

      const div = document.createElement('div');
      expect(() => {
        act(() => {
          result.current.parentRef(div);
        });
      }).not.toThrow();
    });

    it('should return a stable parentRef when the external ref is a stable RefObject', () => {
      const externalRef = { current: null } satisfies RefObject<HTMLDivElement | null>;
      const { result, rerender } = renderHook(() =>
        useParentSize({
          resizeObserverPolyfill: MockResizeObserver as unknown as ResizeObserverPolyfill,
          externalRef,
        }),
      );

      const firstParentRef = result.current.parentRef;
      rerender();
      expect(result.current.parentRef).toBe(firstParentRef);
    });
  });
});
