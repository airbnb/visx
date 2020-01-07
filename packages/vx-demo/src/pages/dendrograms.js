import React from 'react';
import Dendrogram from '../components/tiles/dendrogram';
import Show from '../components/Show.tsx';

export default () => {
  return (
    <Show
      events
      title="Dendrograms"
      component={Dendrogram}
      margin={{
        top: 80,
        left: 10,
        right: 10,
        bottom: 80,
      }}
    >
      {`import React from 'react';
import { Group } from '@vx/group';
import { Cluster } from '@vx/hierarchy';
import { LinkVertical } from '@vx/shape';
import { hierarchy } from 'd3-hierarchy';
import { LinearGradient } from '@vx/gradient';

const citrus = '#ddf163';
const white = '#ffffff';
const green = '#79d259';
const aqua = '#37ac8c';
const merlinsbeard = '#f7f7f3';
const bg = '#306c90';

const cluster = {
  "name": "T",
  "children": [{ 
    "name": "A",
    "children": [
      { "name": "A1" },
      { "name": "A2" },
      { "name": "C",
        "children": [{
          "name": "C1"
        }]},
    ]}, {
    "name": "B",
    "children": [
      { "name": "B1"},
      { "name": "B2"},
      { "name": "B3"},
    ]},{
      "name": "X",
      "children": [{
      "name": "Z"
    }]}
  ],
};


function Node({ node }) {
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;

  return (
    <Group top={node.y} left={node.x}>
      {node.depth !== 0 && (
        <circle
          r={12}
          fill={bg}
          stroke={isParent ? white : citrus}
          onClick={() => {
            alert(\`clicked: \${JSON.stringify(node.data.name)}\`);
          }}
        />
      )}
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={isParent ? white : citrus}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function RootNode({ node }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.y} left={node.x}>
      <rect width={width} height={height} y={centerY} x={centerX} fill="url('#top')" />
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={bg}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

export default ({
  width,
  height,
  margin = {
    top: 40,
    left: 0,
    right: 0,
    bottom: 110
  }
}) => {
  const data = hierarchy(cluster);
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  return (
    <svg width={width} height={height}>
      <LinearGradient id="top" from={green} to={aqua} />
      <rect width={width} height={height} rx={14} fill={bg} />
      <Cluster root={data} size={[xMax, yMax]}>
        {cluster => {
          return (
            <Group top={margin.top} left={margin.left}>
              {cluster.links().map((link, i) => {
                return (
                  <LinkVertical
                    key={\`cluster-link-\${i}\`}
                    data={link}
                    stroke={merlinsbeard}
                    strokeWidth="1"
                    strokeOpacity={0.2}
                    fill="none"
                  />
                );
              })}
              {cluster.descendants().map((node, i) => {
                return <Node key={\`cluster-node-\${i}\`} node={node} />;
              })}
            </Group>
          );
        }}
      </Cluster>
    </svg>
  );
};
`}
    </Show>
  );
};
