import React from 'react';
import Dendrogram from '../components/tiles/dendrogram';
import Show from '../components/show';

export default ({}) => {
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

const raw = {
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

function Node({ node, events }) {
  const width = 40;
  const height = 20;
  return (
    <Group top={node.y} left={node.x}>
      {node.depth === 0 &&
        <rect
          width={width}
          height={height}
          y={-height / 2}
          x={-width / 2}
          fill="url('#top')"
        />
      }
      {node.depth !== 0 &&
        <circle
          r={12}
          fill="#306c90"
          stroke={node.children ? "white" : "#ddf163"}
          onClick={() => {
            alert(\`clicked: \${JSON.stringify(node.data.name)}\`)
          }}
        />
      }
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={node.depth === 0 ? "#286875" : node.children ? "white" : "#ddf163"}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function Link({ link }) {
  return (
    <LinkVertical
      data={link}
      stroke="#f7f7f3"
      strokeWidth="1"
      strokeOpacity={0.2}
      fill="none"
    />
  );
}

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 40,
    left: 0,
    right: 0,
    bottom: 110,
  }
}) => {
  const data = hierarchy(raw);
  return (
    <svg width={width} height={height}>
      <LinearGradient id="top" from="#79d259" to="#37ac8c" />
      <rect
        width={width}
        height={height}
        rx={14}
        fill="#306c90"
      />
      <Cluster
        top={margin.top}
        left={margin.left}
        root={data}
        size={[
          width - margin.left - margin.right,
          height - margin.top - margin.bottom
        ]}
        nodeComponent={Node}
        linkComponent={Link}
      />
    </svg>
  );
}`}
    </Show>
  );
}