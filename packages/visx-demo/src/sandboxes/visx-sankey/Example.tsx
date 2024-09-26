import React, { useState } from 'react';
import { Sankey, sankeyCenter, sankeyRight, sankeyLeft, sankeyJustify } from '@visx/sankey';
import energy from './energy.json';

console.log({ energy });

const controlStyles = { fontSize: 10 };

type NodeDatum = { name: string };
type LinkDatum = {};

const nodeAlignments = {
  sankeyCenter,
  sankeyJustify,
  sankeyLeft,
  sankeyRight,
} as const;

export type SankeyDemoProps = {
  width: number;
  height: number;
};

export default function SankeyDemo({ width, height }) {
  const [nodeAlignment, setTileMethod] = useState<keyof typeof nodeAlignments>('sankeyCenter');
  const [nodePadding, setNodePadding] = useState(10);
  const [nodeWidth, setNodeWidth] = useState(10);

  return (
    <div>
      <div style={controlStyles}>
        <label>
          node alignment{' '}
          <select
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setTileMethod(e.target.value as keyof typeof nodeAlignments)}
            value={nodeAlignment}
          >
            {Object.keys(nodeAlignments).map((alignment) => (
              <option key={alignment} value={alignment}>
                {alignment}
              </option>
            ))}
          </select>
        </label>{' '}
        <label>
          node padding{' '}
          <input
            type="number"
            value={nodePadding}
            onChange={(e) => setNodePadding(Number(e.target.value))}
          />
        </label>{' '}
        <label>
          node width{' '}
          <input
            type="number"
            value={nodeWidth}
            onChange={(e) => setNodeWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <svg width={width} height={height}>
          <Sankey<NodeDatum, LinkDatum>
            root={energy}
            nodeWidth={nodeWidth}
            size={[width, height]}
            nodePadding={nodePadding}
            nodeAlign={nodeAlignments[nodeAlignment]}
          />
        </svg>
      </div>
    </div>
  );
}
