import { renderHook } from '@testing-library/react';
import { useStableId } from '../src';

describe('useStableId', () => {
  it('creates a prefixed id that is stable across renders', () => {
    const { result, rerender } = renderHook(
      ({ prefix }: { prefix?: string }) => useStableId(prefix),
      {
        initialProps: { prefix: 'clip' },
      },
    );
    const firstId = result.current;

    expect(firstId).toMatch(/^clip-/);

    rerender({ prefix: 'clip' });

    expect(result.current).toBe(firstId);
  });

  it('keeps ids unique within a render tree', () => {
    const { result } = renderHook(() => [useStableId('gradient'), useStableId('gradient')]);

    expect(result.current[0]).not.toBe(result.current[1]);
  });

  it('supports an empty prefix', () => {
    const { result } = renderHook(() => useStableId(''));

    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current).not.toContain(':');
  });
});
