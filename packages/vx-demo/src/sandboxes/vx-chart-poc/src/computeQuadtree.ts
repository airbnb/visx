import { quadtree as d3Quadtree } from 'd3-quadtree';
import { DataRegistry, DatumWithKey, ScaleType } from './types';

export default function computeQuadtree({
  data,
  dataRegistry,
  xScale,
  yScale,
}: {
  data: DatumWithKey[];
  dataRegistry: DataRegistry;
  xScale: ScaleType<unknown>;
  yScale: ScaleType<unknown>;
}) {
  const quadtree = d3Quadtree<DatumWithKey>()
    .x(d => xScale(dataRegistry[d.key].xAccessor(d.datum)) as number)
    .y(d => yScale(dataRegistry[d.key].yAccessor(d.datum)) as number)
    .addAll(data);

  return quadtree;
}
