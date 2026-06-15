import { renderHook } from '@testing-library/react';
import { useLatestRef, useStableCallback } from '../src';

describe('useLatestRef', () => {
  it('keeps the ref stable while updating the current value during render', () => {
    const { result, rerender } = renderHook(({ value }: { value: number }) => useLatestRef(value), {
      initialProps: { value: 1 },
    });
    const firstRef = result.current;

    rerender({ value: 2 });

    expect(result.current).toBe(firstRef);
    expect(result.current.current).toBe(2);
  });
});

describe('useStableCallback', () => {
  it('keeps callback identity stable while reading the latest callback body', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useStableCallback((increment: number) => value + increment),
      {
        initialProps: { value: 1 },
      },
    );
    const firstCallback = result.current;

    expect(firstCallback(4)).toBe(5);

    rerender({ value: 10 });

    expect(result.current).toBe(firstCallback);
    expect(result.current(4)).toBe(14);
  });
});
