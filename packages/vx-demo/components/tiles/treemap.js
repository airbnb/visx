import React from 'react';
import { Group } from '@vx/group';
import { Treemap } from '@vx/hierarchy';
import { hierarchy, stratify } from 'd3-hierarchy';
import { shakespeare } from '@vx/mock-data';
import { treemapSquarify } from 'd3-hierarchy';
import { scaleLinear } from '@vx/scale';

const blue = '#0373d9';
const green = '#00ff70';
const bg = '#3436b8';

const colorScale = scaleLinear({
  domain: [0, Math.max(...shakespeare.map(d => d.size || 0))],
  range: [blue, green]
});

const data = stratify()
  .id(d => d.id)
  .parentId(d => d.parent)(shakespeare)
  .sum(d => d.size || 0);

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 0,
    left: 30,
    right: 40,
    bottom: 80
  }
}) => {
  if (width < 10) return null;

  const yMax = height - margin.top - margin.bottom;
  const root = hierarchy(data).sort((a, b) => b.value - a.value);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={bg} />
      <Treemap
        top={margin.top}
        root={root}
        size={[width, yMax]}
        tile={treemapSquarify}
        round={true}
      >
        {treemap => {
          const nodes = treemap.descendants().reverse();
          return (
            <Group>
              {nodes.map((node, i) => {
                const width = node.x1 - node.x0;
                const height = node.y1 - node.y0;
                return (
                  <Group key={`node-${i}`} top={node.y0} left={node.x0}>
                    {node.depth == 1 && (
                      <rect
                        width={width}
                        height={height}
                        stroke={bg}
                        strokeWidth={4}
                        fill={'transparent'}
                      />
                    )}
                    {node.depth > 2 && (
                      <rect
                        width={width}
                        height={height}
                        stroke={bg}
                        fill={colorScale(node.value)}
                      />
                    )}
                  </Group>
                );
              })}
            </Group>
          );
        }}
      </Treemap>
    </svg>
  );
};
