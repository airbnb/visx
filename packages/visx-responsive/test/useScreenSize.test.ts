import { vi } from 'vitest';
import { fireEvent, waitFor, renderHook } from '@testing-library/react';
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

  test('it should update the screen size on window resize', async () => {
    // fake timers in Jest 25 are completely unusable so I'm using real timers here
    // when it's upgraded should be updated to use advanceTimersByTime
    vi.useRealTimers();

    const { result } = renderHook(() => useScreenSize());

    expect(result.current).toEqual({ width: 1280, height: 1024 });

    setWindowSize(800, 600);
    fireEvent(window, new Event('resize'));

    await waitFor(() => expect(result.current).toEqual({ width: 800, height: 600 }));

    vi.useFakeTimers();
  });
});
