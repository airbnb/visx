import { normalizeAccessor, useStructuralMemo } from '@visx/kernel';
import type { AccessorInput } from '@visx/kernel';
import { useMemo } from 'react';
import voronoi from '../voronoi';
import type { VoronoiConfig } from '../voronoi';

export type UseVoronoiOptions<Datum> = Omit<VoronoiConfig<Datum>, 'x' | 'y'> & {
  /** Set the x-value accessor function or string key for the voronoi layout. */
  x?: AccessorInput<Datum, number>;
  /** Set the y-value accessor function or string key for the voronoi layout. */
  y?: AccessorInput<Datum, number>;
};

export default function useVoronoi<Datum>({ width, height, x, y }: UseVoronoiOptions<Datum>) {
  const normalizedX = x == null ? undefined : normalizeAccessor(x);
  const normalizedY = y == null ? undefined : normalizeAccessor(y);
  const config = useStructuralMemo(
    {
      width,
      height,
      x: normalizedX as VoronoiConfig<Datum>['x'],
      y: normalizedY as VoronoiConfig<Datum>['y'],
    },
    1,
  );

  return useMemo(() => voronoi(config), [config]);
}
