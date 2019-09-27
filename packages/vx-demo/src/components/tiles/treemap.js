import React from 'react';
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
import { shakespeare } from '@vx/mock-data';

import { scaleLinear } from '@vx/scale';

const blue = '#0373d9';
const green = '#00ff70';
const bg = '#3436b8';

const colorScale = scaleLinear({
  domain: [0, Math.max(...shakespeare.map(d => d.size || 0))],
  range: [blue, green],
});

const data = stratify()
  .id(d => d.id)
  .parentId(d => d.parent)(shakespeare)
  .sum(d => d.size || 0);

const tileMethods = {
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
};

export default class extends React.Component {
  state = {
    tileMethod: 'treemapSquarify',
  };

  render() {
    const {
      width,
      height,
      // events = false,
      margin = {
        top: 0,
        left: 30,
        right: 40,
        bottom: 80,
      },
    } = this.props;

    const { tileMethod } = this.state;

    if (width < 10) return null;

    const yMax = height - margin.top - margin.bottom;
    const root = hierarchy(data).sort((a, b) => b.value - a.value);

    return (
      <div>
        <label>tile method</label>{' '}
        <select
          onClick={e => e.stopPropagation()}
          onChange={e => this.setState({ tileMethod: e.target.value })}
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
            <Treemap
              top={margin.top}
              root={root}
              size={[width, yMax]}
              tile={tileMethods[tileMethod]}
              round
            >
              {treemap => {
                const nodes = treemap.descendants().reverse();
                return (
                  <Group>
                    {nodes.map((node, i) => {
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
        </div>
      </div>
    );
  }
}
