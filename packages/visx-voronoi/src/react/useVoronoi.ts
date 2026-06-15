import { useMemo } from 'react';
import voronoi from '../voronoi';
import type { VoronoiConfig } from '../voronoi';

export type UseVoronoiOptions<Datum> = VoronoiConfig<Datum>;

export default function useVoronoi<Datum>({ width, height, x, y }: UseVoronoiOptions<Datum>) {
  return useMemo(() => voronoi({ width, height, x, y }), [height, width, x, y]);
}
