import { renderHook } from '@testing-library/react';
import useSamplesAlongPath from '../src/util/useSamplesAlongPath';

function createPath(y: number, length = 2) {
  return {
    getTotalLength: () => length,
    getCTM: () => ({}),
    getPointAtLength: (x: number) => ({ matrixTransform: () => ({ x, y }) }),
  } as unknown as SVGGeometryElement;
}

describe('useSamplesAlongPath', () => {
  it('resamples when a different path has the same length', () => {
    const first = createPath(0);
    const second = createPath(10);
    const { result, rerender } = renderHook(({ path }) => useSamplesAlongPath(path), {
      initialProps: { path: first },
    });
    expect(result.current.map(({ y }) => y)).toEqual([0, 0, 0]);

    rerender({ path: second });
    expect(result.current.map(({ y }) => y)).toEqual([10, 10, 10]);
  });

  it('reuses samples for an unchanged path', () => {
    const path = createPath(0);
    const { result, rerender } = renderHook(() => useSamplesAlongPath(path));
    const samples = result.current;
    rerender();
    expect(result.current).toBe(samples);
  });
});
