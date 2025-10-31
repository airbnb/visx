import { vi } from 'vitest';
import { act, fireEvent, renderHook } from '@testing-library/react';
import useScreenSize from '../src/hooks/useScreenSize';

const setWindowSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

describe('useScreenSize', () => {
  beforeEach(() => {
    setWindowSize(1280, 1024);
  });

  afterEach(() => {
    // @ts-ignore is just a test why you heff to be mad
    delete window.innerWidth;
    // @ts-ignore
    delete window.innerHeight;
  });

  test('it should return the initial screen size', () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toEqual({ width: 1280, height: 1024 });
  });

  test('it should update the screen size on window resize', () => {
    // Use modern fake timers to gain better control of timers
    vi.useFakeTimers();

    const { result } = renderHook(() => useScreenSize());

    expect(result.current).toEqual({ width: 1280, height: 1024 });

    // Simulate the window resize event
    setWindowSize(800, 600);
    act(() => {
      fireEvent(window, new Event('resize'));
      // Move the timers forward, triggering the debounce/throttle logic in `useScreenSize`
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toEqual({ width: 800, height: 600 });

    // Reset to real timers after the test
    vi.useRealTimers();
  });
});
