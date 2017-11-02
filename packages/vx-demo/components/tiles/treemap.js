import React from 'react';
import { Group } from '@vx/group';
import { Treemap } from '@vx/hierarchy';
import { hierarchy, stratify } from 'd3-hierarchy';
import { shakespeare } from '@vx/mock-data';
import { treemapSquarify } from 'd3-hierarchy';
import { scaleLinear } from '@vx/scale';
import { interpolateRgb } from 'd3-interpolate';

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 0,
    left: 30,
    right: 40,
    bottom: 80,
  },
}) => {
  if (width < 10) return null;
  const color = scaleLinear({
    domain: [0, Math.max(...shakespeare.map(d => d.size || 0))],
    range: ['#0373d9', '#00ff70'],
  });
  const nodes = stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(shakespeare).sum(d => d.size || 0);
  const data = hierarchy(nodes).sort((a, b) => b.value - a.value);
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="#3436b8" />
      <Treemap
        top={margin.top}
        root={data}
        size={[width, height - margin.top - margin.bottom]}
        tile={treemapSquarify}
        round={true}
      >
        {({ data }) => {
          return (
            <Group>
              {data
                .descendants()
                .reverse()
                .map((node, i) => (
                  <Group
                    top={node.y0}
                    left={node.x0}
                    key={`node-${i}`}
                  >
                    {node.depth == 1 && (
                      <rect
                        id={`rect-${i}`}
                        width={node.x1 - node.x0}
                        height={node.y1 - node.y0}
                        fill={'transparent'}
                        stroke={'#3436b8'}
                        strokeWidth={4}
                      />
                    )}
                    {node.depth > 2 && (
                      <rect
                        id={`rect-${i}`}
                        width={node.x1 - node.x0}
                        height={node.y1 - node.y0}
                        fill={color(node.value)}
                        stroke={'#3436b8'}
                      />
                    )}
                  </Group>
                ))}
            </Group>
          );
        }}
      </Treemap>
    </svg>
  );
};
