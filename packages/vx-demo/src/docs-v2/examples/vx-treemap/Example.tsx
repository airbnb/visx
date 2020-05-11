import React, { useState } from 'react';
import { Group } from '@vx/group';
import {
  Treemap,
  hierarchy,
  stratify,
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
} from '@vx/hierarchy';
import { TileMethod } from '@vx/hierarchy/lib/types';
import shakespeare, { Shakespeare } from '@vx/mock-data/lib/mocks/shakespeare';

import { scaleLinear } from '@vx/scale';

const blue = '#0373d9';
const green = '#00ff70';
const bg = '#3436b8';

const colorScale = scaleLinear<string>({
  domain: [0, Math.max(...shakespeare.map(d => d.size || 0))],
  range: [blue, green],
});

const data = stratify<Shakespeare>()
  .id(d => d.id)
  .parentId(d => d.parent)(shakespeare)
  .sum(d => d.size || 0);

const tileMethods: { [tile: string]: TileMethod<typeof data> } = {
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
};

const defaultMargin = { top: 0, left: 30, right: 40, bottom: 80 };

type Props = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function TreemapDemo({ width, height, margin = defaultMargin }: Props) {
  const [tileMethod, setTileMethod] = useState<string>('treemapSquarify');
  const yMax = height - margin.top - margin.bottom;
  const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0));

  return width < 10 ? null : (
    <div>
      <label>tile method</label>{' '}
      <select
        onClick={e => e.stopPropagation()}
        onChange={e => setTileMethod(e.target.value)}
        value={tileMethod}
      >
        {Object.keys(tileMethods).map(tile => (
          <option key={tile} value={tile}>
            {tile}
          </option>
        ))}
      </select>
      <div>
        <svg width={width} height={height}>
          <rect width={width} height={height} rx={14} fill={bg} />
          <Treemap<typeof data>
            top={margin.top}
            root={root}
            size={[width, yMax]}
            tile={tileMethods[tileMethod]}
            round
          >
            {treemap => (
              <Group>
                {treemap
                  .descendants()
                  .reverse()
                  .map((node, i) => {
                    const nodeWidth = node.x1 - node.x0;
                    const nodeHeight = node.y1 - node.y0;
                    return (
                      <Group key={`node-${i}`} top={node.y0} left={node.x0}>
                        {node.depth === 1 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={bg}
                            strokeWidth={4}
                            fill="transparent"
                          />
                        )}
                        {node.depth > 2 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={bg}
                            fill={colorScale(node.value || 0)}
                          />
                        )}
                      </Group>
                    );
                  })}
              </Group>
            )}
          </Treemap>
        </svg>
      </div>
    </div>
  );
}
